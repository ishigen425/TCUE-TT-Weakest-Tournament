import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { getPlayers, getVoteCounts } from '../supabase'

function VoteChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const players = await getPlayers()
        const voteCounts = await getVoteCounts()

        const chartData = players.map(player => ({
          name: player.name,
          votes: voteCounts[player.id] || 0
        }))

        setData(chartData)
      } catch (error) {
        console.error('データ取得に失敗しました:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="vote-chart">
      <h2>投票結果</h2>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="votes" fill="#8884d8" />
      </BarChart>
    </div>
  )
}

export default VoteChart
