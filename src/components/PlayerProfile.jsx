import { useState, useEffect } from 'react'
import { insertVote } from '../supabase'
import { PLAYERS } from '../data'

function PlayerProfile({ player }) {
  const [votedPlayer, setVotedPlayer] = useState('')
  const [isVoting, setIsVoting] = useState(false)

  // 選手ごとの色テーマを決定する関数
  const getPlayerTheme = (playerName) => {
    if (playerName.includes('若山')) {
      return {
        primary: 'text-green-400',
        secondary: 'text-green-300',
        accent: 'border-green-500',
        gradient: 'from-green-400 to-green-600',
        badge: 'bg-green-900 bg-opacity-50 text-green-300 border-green-700',
        button: 'from-green-500 to-green-400 hover:from-green-400 hover:to-green-300',
        buttonBorder: 'border-green-500',
        sectionBg: 'from-green-900 to-green-800'
      }
    } else if (playerName.includes('木内')) {
      return {
        primary: 'text-blue-400',
        secondary: 'text-blue-300',
        accent: 'border-blue-500',
        gradient: 'from-blue-400 to-blue-600',
        badge: 'bg-blue-900 bg-opacity-50 text-blue-300 border-blue-700',
        button: 'from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300',
        buttonBorder: 'border-blue-500',
        sectionBg: 'from-blue-900 to-blue-800'
      }
    } else if (playerName.includes('オースティン')) {
      return {
        primary: 'text-red-400',
        secondary: 'text-red-300',
        accent: 'border-red-500',
        gradient: 'from-red-400 to-red-600',
        badge: 'bg-red-900 bg-opacity-50 text-red-300 border-red-700',
        button: 'from-red-500 to-red-400 hover:from-red-400 hover:to-red-300',
        buttonBorder: 'border-red-500',
        sectionBg: 'from-red-900 to-red-800'
      }
    }
    // デフォルト（ゴールド系）
    return {
      primary: 'text-yellow-400',
      secondary: 'text-yellow-300',
      accent: 'border-yellow-500',
      gradient: 'from-yellow-400 to-yellow-600',
      badge: 'bg-yellow-900 bg-opacity-50 text-yellow-300 border-yellow-700',
      button: 'from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300',
      buttonBorder: 'border-yellow-500',
      sectionBg: 'from-yellow-900 to-yellow-800'
    }
  }

  const theme = getPlayerTheme(player?.name || '')
  const localstorageKey = "voted_player";

  useEffect(() => {
    // ローカルストレージで投票済みか確認
    // 各端末で1回しか投票できないようにする
    const selectedPlayerId = localStorage.getItem(localstorageKey)
    if (selectedPlayerId) {
      setVotedPlayer(
        PLAYERS.find(p => p.id === selectedPlayerId)?.name || ''
      )
    }
  }, [player.id])

  const handleVote = async () => {
    if (votedPlayer) return
    setIsVoting(true)
    try {
      await insertVote(player.id)
      localStorage.setItem(localstorageKey, player?.id || '')
      setVotedPlayer(player?.name || '') // 投票した選手名を状態に保存
    } catch (error) {
      console.error('投票に失敗しました:', error)
      alert('投票に失敗しました。もう一度お試しください。')
    } finally {
      setIsVoting(false)
    }
  }

  if (!player) {
    return (
      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-gray-700 text-center">
        <p className="text-gray-300">選手が見つかりません</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* プロフィールヘッダー */}
      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-gray-700 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <div className={`w-32 h-32 bg-gradient-to-br ${theme.gradient} rounded-full flex items-center justify-center text-black text-4xl font-bold shadow-lg`}>
              {player.name.charAt(0)}
            </div>
            <div className={`absolute -bottom-2 -right-2 bg-gradient-to-r ${theme.gradient} text-black text-xs px-2 py-1 rounded-full font-medium`}>
              🏓 選手
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className={`text-3xl md:text-4xl font-bold ${theme.primary} mb-2`}>{player.name}</h1>
            <p className={`text-lg ${theme.secondary} font-medium mb-4`}>最弱決定戦 参加者</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
              <span className={`${theme.badge} px-3 py-1 rounded-full text-sm font-medium border`}>
                高崎経済大学卓球部
              </span>
              <span className="bg-gray-900 bg-opacity-50 text-gray-300 px-3 py-1 rounded-full text-sm font-medium border border-gray-700">
                挑戦者
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* メインコンテンツ */}
        <div className="lg:col-span-2 space-y-6">
          {/* プロフィール詳細 */}
          <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
            <h2 className={`text-2xl font-bold ${theme.primary} mb-4 flex items-center`}>
              <span className="mr-2">👤</span>
              プロフィール
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 bg-opacity-70 p-4 rounded-lg border border-gray-600">
                <dt className="text-sm font-medium text-gray-400">所属</dt>
                <dd className="text-lg font-semibold text-white">高崎経済大学卓球部</dd>
              </div>
              <div className="bg-gray-800 bg-opacity-70 p-4 rounded-lg border border-gray-600">
                <dt className="text-sm font-medium text-gray-400">ポジション</dt>
                <dd className="text-lg font-semibold text-white">挑戦者</dd>
              </div>
              <div className="bg-gray-800 bg-opacity-70 p-4 rounded-lg border border-gray-600">
                <dt className="text-sm font-medium text-gray-400">特技</dt>
                <dd className="text-lg font-semibold text-white">粘り強いプレー</dd>
              </div>
              <div className="bg-gray-800 bg-opacity-70 p-4 rounded-lg border border-gray-600">
                <dt className="text-sm font-medium text-gray-400">目標</dt>
                <dd className="text-lg font-semibold text-white">最弱の座を狙う</dd>
              </div>
            </div>
          </div>

          {/* コメント */}
          <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
            <h2 className={`text-2xl font-bold ${theme.primary} mb-4 flex items-center`}>
              <span className="mr-2">💬</span>
              選手コメント
            </h2>
            <div className={`bg-gradient-to-r ${theme.sectionBg} bg-opacity-50 border-l-4 ${theme.accent} p-6 rounded-r-lg`}>
              <blockquote className="text-lg text-gray-200 italic leading-relaxed">
                "{player.profile || "この大会で自分の実力を試したいと思います。最弱の座を目指して頑張ります！"}"
              </blockquote>
              <cite className="block text-right text-sm text-gray-400 mt-4">- {player.name}</cite>
            </div>
          </div>
        </div>

        {/* サイドバー */}
        <div className="space-y-6">
          {/* 戦績 */}
          <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
            <h2 className={`text-xl font-bold ${theme.primary} mb-4 flex items-center`}>
              <span className="mr-2">🏆</span>
              戦績
            </h2>
            <div className="space-y-3">
              <div className={`bg-gradient-to-r ${theme.sectionBg} bg-opacity-50 p-3 rounded-lg border ${theme.accent}`}>
                <p className={`text-sm ${theme.secondary}`}>過去の大会での成績やエピソードがここに表示されます。</p>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-600">
                <span className="text-sm text-gray-400">勝率</span>
                <span className="font-semibold text-white">データ準備中</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-600">
                <span className="text-sm text-gray-400">参加大会</span>
                <span className="font-semibold text-white">データ準備中</span>
              </div>
            </div>
          </div>

          {/* 投票セクション */}
          <div className={`bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border-2 ${theme.buttonBorder} bg-gradient-to-br ${theme.sectionBg} bg-opacity-20`}>
            <h2 className={`text-xl font-bold ${theme.primary} mb-4 flex items-center`}>
              <span className="mr-2">🗳️</span>
              投票
            </h2>
            <p className="text-sm text-gray-300 mb-4">
              この選手が最弱だと思ったら投票してください
            </p>
            <button 
              onClick={handleVote} 
              disabled={votedPlayer || isVoting}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                votedPlayer 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : isVoting 
                    ? `bg-gradient-to-r ${theme.button.split(' ')[0]} ${theme.button.split(' ')[1]} text-black cursor-wait` 
                    : `bg-gradient-to-r ${theme.button} text-black transform hover:scale-105 shadow-lg hover:shadow-xl`
              }`}
            >
              {votedPlayer ? (
                <span className="flex items-center justify-center">
                  <span className="mr-2">✅</span>
                  {votedPlayer}さんに投票済み
                </span>
              ) : isVoting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  投票中...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <span className="mr-2">🗳️</span>
                  この選手に投票
                </span>
              )}
            </button>
            {votedPlayer && (
              <p className="text-xs text-gray-400 mt-2 text-center">
                投票ありがとうございました！
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerProfile
