import React, { useMemo } from 'react'
import { MATCHES, PLAYERS } from '../data'
import { Ranking, PlayerId } from '../types'

function MatchResultsPage(): React.JSX.Element {
  // 選手ごとの色を決定する関数
  const getPlayerColor = (playerId: PlayerId): string => {
    if (playerId === 'kiuchi') {
      return '#3b82f6' // blue-500
    } else if (playerId === 'wakayama') {
      return '#10b981' // emerald-500
    } else if (playerId === 'austin') {
      return '#ef4444' // red-500
    }
    return '#f59e0b' // amber-500
  }

  // 順位表を計算
  const rankings: Ranking[] = useMemo(() => {
    const stats: Record<string, { wins: number; losses: number }> = {}
    
    // 初期化
    PLAYERS.forEach(player => {
      stats[player.id] = { wins: 0, losses: 0 }
    })

    // 試合結果から集計
    MATCHES.forEach(match => {
      if (match.winnerId === match.player1Id) {
        stats[match.player1Id].wins++
        stats[match.player2Id].losses++
      } else {
        stats[match.player2Id].wins++
        stats[match.player1Id].losses++
      }
    })

    // ランキング作成
    const rankingList = PLAYERS.map(player => ({
      playerId: player.id,
      playerName: player.name,
      wins: stats[player.id].wins,
      losses: stats[player.id].losses,
      winRate: stats[player.id].wins / (stats[player.id].wins + stats[player.id].losses) * 100
    }))

    // 勝率でソート
    rankingList.sort((a, b) => b.winRate - a.winRate || b.wins - a.wins)

    // 順位を付与
    return rankingList.map((item, index) => ({
      ...item,
      rank: index + 1
    }))
  }, [])

  const weakest = rankings[rankings.length - 1]

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-gray-700 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4 flex items-center justify-center">
          <span className="mr-3">🏆</span>
          試合結果
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          高崎経済大学卓球部 部内リーグ最終戦 2025.11.8
        </p>

        {/* チャンピオンと最弱 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div 
            className="p-6 rounded-lg border-4"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              borderColor: getPlayerColor(weakest.playerId)
            }}
          >
            <img src={PLAYERS.find(p => p.id === weakest.playerId)?.profile_image} alt={weakest.playerName} className="w-24 h-24 object-cover rounded-lg mx-auto mb-4 border-2" style={{ borderColor: getPlayerColor(weakest.playerId) }} />
            <div className="text-sm text-gray-400 mb-1">最弱</div>
            <div 
              className="text-2xl font-bold mb-2"
              style={{ color: getPlayerColor(weakest.playerId) }}
            >
              {weakest.playerName}
            </div>
          </div>
        </div>
      </div>

      {/* 最終順位表 */}
      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
          <span className="mr-2">📊</span>
          最終順位
        </h2>
        <div className="space-y-4">
          {rankings.map((ranking) => {
            const playerColor = getPlayerColor(ranking.playerId)
            const playerImage = PLAYERS.find(player => player.id === ranking.playerId)?.profile_image
            return (
              <div 
                key={ranking.playerId}
                className="bg-gray-800 bg-opacity-70 p-6 rounded-lg border-2 hover:scale-102 transition-transform duration-300"
                style={{ borderColor: playerColor }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* 順位 */}
                    <div 
                      className={`flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-xl ${
                        ranking.rank === 1 ? 'bg-yellow-500' : 
                        ranking.rank === 2 ? 'bg-gray-400' : 
                        'bg-orange-600'
                      }`}
                    >
                      {ranking.rank}
                    </div>
                    
                    {/* 選手画像 */}
                    <img
                      src={playerImage}
                      alt={ranking.playerName}
                      className="w-16 h-16 object-cover rounded-lg border-2"
                      style={{ borderColor: playerColor }}
                    />
                  </div>

                  {/* 勝敗 */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {ranking.wins}勝{ranking.losses}敗
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 対戦結果 */}
      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
          <span className="mr-2">🏓</span>
          対戦結果
        </h2>
        <div className="space-y-6">
          {MATCHES.map((match, index) => {
            const player1Color = getPlayerColor(match.player1Id)
            const player2Color = getPlayerColor(match.player2Id)
            const player1Image = PLAYERS.find(player => player.id === match.player1Id)?.profile_image
            const player2Image = PLAYERS.find(player => player.id === match.player2Id)?.profile_image
            const isPlayer1Winner = match.winnerId === match.player1Id

            return (
              <div 
                key={index}
                className="bg-gray-800 bg-opacity-70 p-6 rounded-lg border border-gray-600"
              >
                <div className="flex items-center justify-between">
                  {/* プレイヤー1 */}
                  <div className={`flex items-center space-x-4 flex-1 ${isPlayer1Winner ? 'opacity-100' : 'opacity-60'}`}>
                    <img
                      src={player1Image}
                      alt={match.player1Name}
                      className="w-16 h-16 object-cover rounded-lg border-2"
                      style={{ borderColor: player1Color }}
                    />
                    <div className="text-left">
                      <div 
                        className="text-lg font-bold flex items-center"
                        style={{ color: player1Color }}
                      >
                      </div>
                    </div>
                  </div>

                  {/* スコア */}
                  <div className="px-8">
                    <div className="text-3xl font-bold text-white text-center">
                      <span style={{ color: player1Color }}>{match.player1Score}</span>
                      <span className="mx-2 text-gray-500">-</span>
                      <span style={{ color: player2Color }}>{match.player2Score}</span>
                    </div>
                  </div>

                  {/* プレイヤー2 */}
                  <div className={`flex items-center space-x-4 flex-1 justify-end ${!isPlayer1Winner ? 'opacity-100' : 'opacity-60'}`}>
                    <div className="text-right">
                      <div 
                        className="text-lg font-bold flex items-center justify-end"
                        style={{ color: player2Color }}
                      >
                      </div>
                    </div>
                    <img
                      src={player2Image}
                      alt={match.player2Name}
                      className="w-16 h-16 object-cover rounded-lg border-2"
                      style={{ borderColor: player2Color }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 注意事項 */}
      <div className="bg-blue-900 bg-opacity-50 border border-blue-700 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-blue-400 text-xl">ℹ️</span>
          <div>
            <h3 className="text-blue-300 font-semibold mb-1">総当たり戦</h3>
            <p className="text-blue-200 text-sm">
              3名による総当たり戦（リーグ戦）を実施しました。各試合は5ゲームマッチで行われました。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatchResultsPage
