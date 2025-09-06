import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
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

  const totalVotes = data.reduce((sum, item) => sum + item.votes, 0)

  const COLORS = ['#1E90FF', '#32CD32', '#FF4500']

  return (
    <div className="vote-chart">
      <h2>投票結果</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="votes"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} (${((value / totalVotes) * 100).toFixed(1)}%)`, '投票数']} />
        <Legend />
      </PieChart>
    </div>
  )
}

export default VoteChart
