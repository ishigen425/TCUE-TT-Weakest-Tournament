import { useState, useEffect } from 'react'
import { insertVote } from '../supabase'

function PlayerProfile({ player }) {
  const [hasVoted, setHasVoted] = useState(false)
  const [isVoting, setIsVoting] = useState(false)

  useEffect(() => {
    const voted = localStorage.getItem(`voted_${player.id}`)
    if (voted) {
      setHasVoted(true)
    }
  }, [player.id])

  const handleVote = async () => {
    if (hasVoted) return
    setIsVoting(true)
    try {
      await insertVote(player.id)
      localStorage.setItem(`voted_${player.id}`, 'true')
      setHasVoted(true)
    } catch (error) {
      console.error('投票に失敗しました:', error)
      alert('投票に失敗しました。もう一度お試しください。')
    } finally {
      setIsVoting(false)
    }
  }

  if (!player) {
    return (
      <div className="card text-center">
        <p className="text-gray-500">選手が見つかりません</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* プロフィールヘッダー */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {player.name.charAt(0)}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-secondary-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              🏓 選手
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{player.name}</h1>
            <p className="text-lg text-primary-600 font-medium mb-4">最弱決定戦 参加者</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                高崎経済大学卓球部
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
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
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">👤</span>
              プロフィール
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <dt className="text-sm font-medium text-gray-500">所属</dt>
                <dd className="text-lg font-semibold text-gray-900">高崎経済大学卓球部</dd>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <dt className="text-sm font-medium text-gray-500">ポジション</dt>
                <dd className="text-lg font-semibold text-gray-900">挑戦者</dd>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <dt className="text-sm font-medium text-gray-500">特技</dt>
                <dd className="text-lg font-semibold text-gray-900">粘り強いプレー</dd>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <dt className="text-sm font-medium text-gray-500">目標</dt>
                <dd className="text-lg font-semibold text-gray-900">最弱の座を狙う</dd>
              </div>
            </div>
          </div>

          {/* コメント */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">💬</span>
              選手コメント
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-primary-500 p-6 rounded-r-lg">
              <blockquote className="text-lg text-gray-700 italic leading-relaxed">
                "{player.profile || "この大会で自分の実力を試したいと思います。最弱の座を目指して頑張ります！"}"
              </blockquote>
              <cite className="block text-right text-sm text-gray-500 mt-4">- {player.name}</cite>
            </div>
          </div>
        </div>

        {/* サイドバー */}
        <div className="space-y-6">
          {/* 戦績 */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">🏆</span>
              戦績
            </h2>
            <div className="space-y-3">
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <p className="text-sm text-gray-600">過去の大会での成績やエピソードがここに表示されます。</p>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">勝率</span>
                <span className="font-semibold text-gray-800">データ準備中</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">参加大会</span>
                <span className="font-semibold text-gray-800">データ準備中</span>
              </div>
            </div>
          </div>

          {/* 投票セクション */}
          <div className="card bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">🗳️</span>
              投票
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              この選手が最弱だと思ったら投票してください
            </p>
            <button 
              onClick={handleVote} 
              disabled={hasVoted || isVoting}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 ${
                hasVoted 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : isVoting 
                    ? 'bg-primary-400 cursor-wait' 
                    : 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
              }`}
            >
              {hasVoted ? (
                <span className="flex items-center justify-center">
                  <span className="mr-2">✅</span>
                  投票済み
                </span>
              ) : isVoting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
            {hasVoted && (
              <p className="text-xs text-gray-500 mt-2 text-center">
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
