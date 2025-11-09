import React from 'react'
import { PlayerId } from '../types'
import VoteChartHeader from './VoteChartHeader'
import VoteChartPie from './VoteChartPie'
import VoteChartDetails from './VoteChartDetails'
import VoteChartNotice from './VoteChartNotice'
import UserVoteStatus from './UserVoteStatus'
import { PLAYERS } from '../data'

export interface ChartData {
  id: PlayerId
  name: string
  votes: number
  color: string
}

// 最終投票結果（固定値）
const FINAL_VOTE_RESULTS: Record<PlayerId, number> = {
  kiuchi: 10,
  austin: 6,
  wakayama: 4,
  '': 0
}

function VoteChart(): React.JSX.Element {
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

  // 固定データを作成
  const data: ChartData[] = 
  PLAYERS.map(player => {
    return {
      id: player.id,
      name: player.name,
      votes: FINAL_VOTE_RESULTS[player.id],
      color: getPlayerColor(player.id)
    }
  })

  const totalVotes = data.reduce((sum, player) => sum + player.votes, 0)
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
