import React from 'react'
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

interface VoteSuccessModalProps {
  isOpen: boolean
  player: Player
  theme: PlayerTheme
  onClose: () => void
}

function VoteSuccessModal({ isOpen, player, theme, onClose }: VoteSuccessModalProps): React.JSX.Element | null {
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

  if (!isOpen) return null

  return (
    <>
      <style>{`
        @keyframes bounceFinite {
          0%, 20%, 53%, 80%, 100% {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            transform: translate3d(0, -30px, 0);
          }
          70% {
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            transform: translate3d(0, -15px, 0);
          }
          90% {
            transform: translate3d(0, -4px, 0);
          }
        }
        .animate-bounce-finite {
          animation: bounceFinite 1.5s ease-in-out;
        }
      `}</style>
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm p-2">
        <div className="relative w-full h-full max-w-7xl">
          {/* 花火エフェクト */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
          </div>
          
          {/* メインモーダルコンテンツ */}
          <div className={`bg-gradient-to-br ${theme.sectionBg} bg-opacity-95 backdrop-blur-lg rounded-3xl p-3 border-4 ${theme.buttonBorder} shadow-2xl transform animate-bounce-finite w-full h-full flex flex-col`}>
            <div className="flex-1 flex flex-col items-center justify-center">
              {/* 選手画像を最大表示 */}
              <div className="flex-1 flex items-center justify-center mb-3 w-full">
                <div className="relative">
                  <img 
                    src={getPlayerImage(player.id)}
                    alt={player.name}
                    className="max-w-full max-h-full object-contain rounded-2xl border-4 border-white shadow-2xl transform hover:scale-105 transition-transform duration-300"
                    style={{ maxHeight: 'calc(100vh - 150px)', maxWidth: 'calc(100vw - 60px)' }}
                    onError={(e) => {
                      // 画像が見つからない場合のフォールバック
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <div className={`absolute -top-4 -right-4 bg-gradient-to-r ${theme.gradient} text-black text-2xl px-4 py-2 rounded-full font-bold animate-spin`}>
                    ⭐
                  </div>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className={`bg-gradient-to-r ${theme.button} text-black px-8 py-3 rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg`}
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VoteSuccessModal
