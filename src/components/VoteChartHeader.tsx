import React from 'react'

interface VoteChartHeaderProps {
  totalVotes: number
  winnerName: string | undefined
}

function VoteChartHeader({ totalVotes, winnerName }: VoteChartHeaderProps): React.JSX.Element {
  return (
    <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-gray-700 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4 flex items-center justify-center">
        <span className="mr-3">📊</span>
        最弱予想
      </h1>
      <p className="text-lg text-gray-300 mb-2">
        部内リーグ最終戦の<span className="font-bold text-yellow-400">最弱予想</span>の投票結果をリアルタイムで表示しています
      </p>

      {/* 統計情報 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-900 bg-opacity-50 p-4 rounded-lg border border-blue-700">
          <div className="text-2xl font-bold text-blue-400">{totalVotes}</div>
          <div className="text-sm text-blue-300">総投票数</div>
        </div>
        <div className="bg-yellow-900 bg-opacity-50 p-4 rounded-lg border border-yellow-700">
          <div className="text-2xl font-bold text-yellow-400">{winnerName || '-'}</div>
          <div className="text-sm text-yellow-300">最弱予想1位</div>
        </div>
      </div>
    </div>
  )
}

export default VoteChartHeader
