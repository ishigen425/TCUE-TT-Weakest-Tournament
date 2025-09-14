import React, { useState, useEffect } from 'react'
import { insertVote } from '../supabase'
import VoteSuccessModal from './VoteSuccessModal'
import type { Player, PlayerId } from '../types'

interface PlayerTheme {
  primary: string
  secondary: string
  accent: string
  gradient: string
  badge: string
  button: string
  buttonBorder: string
  sectionBg: string
}

interface PlayerProfileProps {
  player: Player | undefined
}

function PlayerProfile({ player }: PlayerProfileProps): React.JSX.Element {
  const [votedPlayer, setVotedPlayer] = useState<string>('')
  const [isVoting, setIsVoting] = useState<boolean>(false)
  const [showVoteModal, setShowVoteModal] = useState<boolean>(false)

  // 選手ごとの色テーマを決定する関数
  const getPlayerTheme = (playerId: PlayerId): PlayerTheme => {
    if (playerId === 'wakayama') {
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
    } else if (playerId === 'kiuchi') {
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
    } else if (playerId === 'austin') {
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

  const theme = getPlayerTheme(player?.id || '')
  const localstorageKey = "voted_player";

  useEffect(() => {
    if (!player) return
    // ローカルストレージで投票済みか確認
    // 各端末で1回しか投票できないようにする
    const selectedPlayerId = localStorage.getItem(localstorageKey)
    if (selectedPlayerId) {
      // setVotedPlayer(
      //   PLAYERS.find(p => p.id === selectedPlayerId)?.name || ''
      // )
    }
  }, [player?.id])

  const handleVote = async (): Promise<void> => {
    if (votedPlayer || !player) return
    
    // 投票前の確認
    const isConfirmed = confirm('1人1度しか投票できません。本当にそれで良いですか？')
    if (!isConfirmed) return
    
    setIsVoting(true)
    try {
      await insertVote(player.id)
      localStorage.setItem(localstorageKey, player.id)
      setVotedPlayer(player.name) // 投票した選手名を状態に保存
      setShowVoteModal(true) // 投票成功モーダルを表示
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
            <div className={`w-32 h-32 bg-gradient-to-br ${theme.gradient} rounded-full flex items-center justify-center text-black text-4xl font-bold shadow-lg overflow-hidden`}>
              {player.profile_image ? (
                <img 
                  src={player.profile_image} 
                  alt={`${player.name}のプロフィール画像`}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                player.name.charAt(0)
              )}
            </div>
            <div className={`absolute -bottom-2 -right-2 bg-gradient-to-r ${theme.gradient} text-black text-xs px-2 py-1 rounded-full font-medium`}>
              🏓 選手
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className={`text-3xl md:text-4xl font-bold ${theme.primary} mb-2`}>{player.name}</h1>
            <p className={`text-lg ${theme.secondary} font-medium mb-4`}>最弱決定戦 参加者</p>
            
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
                <dt className="text-sm font-medium text-gray-400">出身地</dt>
                <dd className="text-lg font-semibold text-white">{player.birthPlace}</dd>
              </div>
              <div className="bg-gray-800 bg-opacity-70 p-4 rounded-lg border border-gray-600">
                <dt className="text-sm font-medium text-gray-400">特技</dt>
                <dd className="text-lg font-semibold text-white">粘り強いプレー</dd>
              </div>
              <div className="bg-gray-800 bg-opacity-70 p-4 rounded-lg border border-gray-600">
                <dt className="text-sm font-medium text-gray-400">担当コーチ</dt>
                <dd className="text-lg font-semibold text-white">{player.coach}</dd>
              </div>
            </div>
          </div>

          {/* コメント */}
          <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
            <h2 className={`text-2xl font-bold ${theme.primary} mb-4 flex items-center`}>
              <span className="mr-2">💬</span>
              調教師コメント
            </h2>
            <div className={`bg-gradient-to-r ${theme.sectionBg} bg-opacity-50 border-l-4 ${theme.accent} p-6 rounded-r-lg`}>
              <blockquote className="text-lg text-gray-200 italic leading-relaxed">
                "{player.profile || "この大会で自分の実力を試したいと思います。最弱の座を目指して頑張ります！"}"
              </blockquote>
              <cite className="block text-right text-sm text-gray-400 mt-4">- {player.coach}</cite>
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
              {player.warRecord && Array.isArray(player.warRecord) ? (
                player.warRecord.map((record, index) => (
                  <div key={index} className={`bg-gradient-to-r ${theme.sectionBg} bg-opacity-50 p-3 rounded-lg border ${theme.accent}`}>
                    <span className="font-semibold text-white">{record}</span>
                  </div>
                ))
              ) : (
                <div className={`bg-gradient-to-r ${theme.sectionBg} bg-opacity-50 p-3 rounded-lg border ${theme.accent}`}>
                  <p className={`text-sm ${theme.secondary}`}>戦績データがありません。</p>
                </div>
              )}
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
              disabled={Boolean(votedPlayer) || isVoting}
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

      {/* 投票成功モーダル */}
      {player && (
        <VoteSuccessModal
          isOpen={showVoteModal}
          player={player}
          theme={theme}
          onClose={() => setShowVoteModal(false)}
        />
      )}
    </div>
  )
}

export default PlayerProfile
