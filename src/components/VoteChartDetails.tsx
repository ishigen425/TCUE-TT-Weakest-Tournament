import React from 'react'
import { ChartData } from './VoteChart'
import { PlayerId } from '../types'

interface VoteChartDetailsProps {
  data: ChartData[]
  totalVotes: number
  getPlayerColor: (playerId: PlayerId) => string
}

function VoteChartDetails({ data, totalVotes, getPlayerColor }: VoteChartDetailsProps): React.JSX.Element {
  return (
    <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">詳細結果</h2>
      <div className="space-y-4">
        {data
          .sort((a, b) => b.votes - a.votes)
          .map((player, index) => {
            const percentage = totalVotes > 0 ? ((player.votes / totalVotes) * 100).toFixed(1) : '0'
            const playerColor = getPlayerColor(player.id || '')
            return (
              <div key={player.name} className="bg-gray-800 bg-opacity-70 p-4 rounded-lg border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-gray-500'
                    }`}>
                      {index + 1}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: playerColor }}
                      ></div>
                      <span className="text-lg font-semibold text-white">{player.name}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-white">{player.votes}票</div>
                    <div className="text-sm text-gray-300">{percentage}%</div>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: playerColor
                    }}
                  ></div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default VoteChartDetails
