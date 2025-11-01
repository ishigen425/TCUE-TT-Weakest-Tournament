import React, { useState, useEffect } from 'react'
import { PLAYERS } from '../data'
import { PlayerId } from '../types'

function UserVoteStatus(): React.JSX.Element {
  const [votedPlayerId, setVotedPlayerId] = useState<PlayerId | null>(null)
  const localStorageKey = "weaknest_voted_player"

  // 選手の画像を取得する関数
  const getPlayerImage = (playerId: PlayerId): string => {
    switch (playerId) {
      case 'austin':
        return '/aus.jpg'
      case 'kiuchi':
        return '/kiuch.jpg'
      case 'wakayama':
        return '/waka.jpg'
      default:
        return ''
    }
  }

  // 選手ごとの色を決定する関数
  const getPlayerColor = (playerId: PlayerId): string => {
    if (playerId === 'kiuchi') {
      return '#3b82f6' // blue-500 (青系)
    } else if (playerId === 'wakayama') {
      return '#10b981' // emerald-500 (緑系)
    } else if (playerId === 'austin') {
      return '#ef4444' // red-500 (赤系)
    }
    return '#f59e0b' // amber-500 (黄系)
  }

  useEffect(() => {
    const storedVote = localStorage.getItem(localStorageKey)
    if (storedVote && (storedVote === 'kiuchi' || storedVote === 'wakayama' || storedVote === 'austin')) {
      setVotedPlayerId(storedVote as PlayerId)
    }
  }, [])

  if (!votedPlayerId) {
    return (
      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-gray-700 text-center">
        <div className="text-6xl mb-4">🗳️</div>
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">投票状況</h2>
        <p className="text-lg text-gray-300 mb-4">まだ投票していません</p>
        <p className="text-sm text-gray-400">選手のプロフィールページから投票してください</p>
      </div>
    )
  }

  const votedPlayer = PLAYERS.find(player => player.id === votedPlayerId)
  if (!votedPlayer) {
    return (
      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-gray-700 text-center">
        <p className="text-gray-300">選手情報が見つかりません</p>
      </div>
    )
  }

  const playerColor = getPlayerColor(votedPlayerId)
  const playerImage = getPlayerImage(votedPlayerId)

  return (
    <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">✅</div>
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">あなたの投票</h2>
      </div>

      <div className="flex flex-col items-center justify-center text-center">
        {/* 選手画像 */}
        <div className="flex-shrink-0 mb-4">
          <div className="relative flex justify-center">
            <img
              src={playerImage}
              alt={votedPlayer.name}
              className="max-w-96 max-h-96 object-contain rounded-2xl border-4 border-white shadow-2xl transform hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                // 画像が見つからない場合のフォールバック
                e.currentTarget.style.display = 'none'
              }}
            />
            <div 
              className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white"
              style={{ backgroundColor: playerColor }}
            >
              ✓
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default UserVoteStatus
