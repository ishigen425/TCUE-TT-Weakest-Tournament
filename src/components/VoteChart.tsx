import React, { useState, useEffect } from 'react'
import { getVoteCounts } from '../supabase'
import { PLAYERS } from '../data'
import { PlayerId } from '../types'
import VoteChartHeader from './VoteChartHeader'
import VoteChartPie from './VoteChartPie'
import VoteChartDetails from './VoteChartDetails'
import VoteChartNotice from './VoteChartNotice'
import UserVoteStatus from './UserVoteStatus'

export interface ChartData {
  id: PlayerId
  name: string
  votes: number
  color: string
}

function VoteChart(): React.JSX.Element {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [totalVotes, setTotalVotes] = useState<number>(0)

  // 選手ごとの色を決定する関数
  const getPlayerColor = (playerId: PlayerId): string => {
    if (playerId === 'kiuchi') {
      return '#3b82f6' // blue-500 (青系)
    } else if (playerId === 'wakayama') {
      return '#10b981' // emerald-500 (緑系)
    } else if (playerId === 'austin') {
      return '#ef4444' // red-500 (赤系)
    }
    // デフォルト色（その他の選手用）
    return '#f59e0b' // amber-500 (黄系)
  }

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true)
        const voteCounts = await getVoteCounts()

        const chartData: ChartData[] = PLAYERS.map(player => ({
          id: player.id,
          name: player.name,
          votes: voteCounts[player.id] || 0,
          color: getPlayerColor(player.id)
        }))

        const total = chartData.reduce((sum, player) => sum + player.votes, 0)
        setTotalVotes(total)
        setData(chartData)
      } catch (error) {
        console.error('データ取得に失敗しました:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-gray-700 text-center">
        <div className="flex items-center justify-center space-x-2">
          <svg className="animate-spin h-8 w-8 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-lg text-gray-300">投票結果を読み込み中...</span>
        </div>
      </div>
    )
  }

  const maxVotes = Math.max(...data.map(d => d.votes))
  const winner = data.find(d => d.votes === maxVotes)

  return (
    <div className="space-y-8">
      <VoteChartHeader totalVotes={totalVotes} winnerName={winner?.name} />
      <UserVoteStatus />
      <VoteChartPie data={data} totalVotes={totalVotes} />
      <VoteChartDetails data={data} totalVotes={totalVotes} getPlayerColor={getPlayerColor} />
      <VoteChartNotice />
    </div>
  )
}

export default VoteChart
