import React, { useState } from 'react'
import PlayerProfile from './components/PlayerProfile'
import VoteChart from './components/VoteChart'
import { PLAYERS } from './data'

type ViewType = 'home' | 'results' | string

interface PlayerTheme {
  border: string
  button: string
  accent: string
}

function App(): React.JSX.Element {
  const [currentView, setCurrentView] = useState<ViewType>('home')

  // 選手ごとの色テーマを決定する関数
  const getPlayerTheme = (playerName: string): PlayerTheme => {
    if (playerName.includes('若山')) {
      return {
        border: 'hover:border-green-400',
        button: 'bg-green-500 hover:bg-green-600',
        accent: 'text-green-400'
      }
    } else if (playerName.includes('木内')) {
      return {
        border: 'hover:border-blue-400',
        button: 'bg-blue-500 hover:bg-blue-600',
        accent: 'text-blue-400'
      }
    } else if (playerName.includes('オースティン')) {
      return {
        border: 'hover:border-red-400',
        button: 'bg-red-500 hover:bg-red-600',
        accent: 'text-red-400'
      }
    }
    // デフォルト（ゴールド系）
    return {
      border: 'hover:border-yellow-400',
      button: 'bg-yellow-400 hover:bg-yellow-500',
      accent: 'text-yellow-400'
    }
  }

  const renderContent = () => {
    if (currentView === 'home') {
      return (
        <div className="max-w-6xl mx-auto text-center">
          {/* メイン画像セクション */}
          <div className="mb-8">
            <img 
              src="/top.jpg" 
              alt="高崎経済大学卓球部 最弱決定戦 2025.11.8" 
              className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl"
            />
          </div>
          
          <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 mb-8 border border-gray-700">
            <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-6">
              TCUE-TT
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              最弱決定戦
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              高崎経済大学卓球部 最弱決定戦 2025.11.8
            </p>
            <div className="bg-gray-800 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <p className="text-yellow-200 font-medium">
                参加者のプロフィールを見るには、上のナビゲーションから選手を選択してください。
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLAYERS.map(player => {
              const theme = getPlayerTheme(player.name)
              return (
                <div 
                  key={player.id}
                  className={`bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform duration-300 border border-gray-700 ${theme.border}`}
                  onClick={() => setCurrentView(player.name)}
                >
                  <h3 className={`text-xl font-semibold ${theme.accent} mb-2`}>{player.name}</h3>
                  <p className="text-gray-300 text-sm overflow-hidden" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}>{player.profile}</p>
                  <button className={`${theme.button} text-black font-semibold py-2 px-4 rounded mt-4 w-full transition-colors duration-200`}>
                    プロフィールを見る
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
    if (currentView === 'results') {
      return (
        <div className="max-w-6xl mx-auto">
          <VoteChart />
        </div>
      )
    }
    const player = PLAYERS.find(p => p.name === currentView)
    return (
      <div className="max-w-4xl mx-auto">
        <PlayerProfile player={player} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Header */}
      <header className="bg-black shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-yellow-400">TCUE-TT</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-900 shadow-lg border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            <button 
              className={`nav-link whitespace-nowrap px-3 py-2 ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentView('home')}
            >
              🏠 ホーム
            </button>
            <button 
              className={`nav-link whitespace-nowrap px-3 py-2 ${currentView === 'results' ? 'active' : ''}`}
              onClick={() => setCurrentView('results')}
            >
              📊 投票結果
            </button>
            {PLAYERS.map(player => (
              <button 
                key={player.id}
                className={`nav-link whitespace-nowrap px-3 py-2 ${currentView === player.name ? 'active' : ''}`}
                onClick={() => setCurrentView(player.name)}
              >
                🏓 {player.name}
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-16 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">© 2025 高崎経済大学卓球部 最弱決定戦</p>
        </div>
      </footer>
    </div>
  )
}

export default App
