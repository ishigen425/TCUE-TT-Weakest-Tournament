import { useState, useEffect } from 'react'
import { getPlayers } from './supabase'
import PlayerProfile from './components/PlayerProfile'
import VoteChart from './components/VoteChart'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [players, setPlayers] = useState([])

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await getPlayers()
        setPlayers(data)
      } catch (error) {
        console.error('Error fetching players:', error)
      }
    }
    fetchPlayers()
  }, [])

  const renderContent = () => {
    if (currentView === 'home') {
      return (
        <div className="max-w-4xl mx-auto text-center">
          <div className="card mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-700 mb-6">
              TCUE-TT
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
              最弱決定戦
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              高崎経済大学卓球部 最弱決定戦
            </p>
            <div className="bg-blue-50 border-l-4 border-primary-500 p-4 rounded-r-lg">
              <p className="text-primary-700 font-medium">
                参加者のプロフィールを見るには、上のナビゲーションから選手を選択してください。
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {players.map(player => (
              <div 
                key={player.id}
                className="card cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => setCurrentView(player.name)}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{player.name}</h3>
                <p className="text-gray-600 text-sm overflow-hidden" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical'
                }}>{player.profile}</p>
                <button className="btn-primary mt-4 w-full">
                  プロフィールを見る
                </button>
              </div>
            ))}
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
    const player = players.find(p => p.name === currentView)
    return (
      <div className="max-w-4xl mx-auto">
        <PlayerProfile player={player} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-700">TCUE-TT</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
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
            {players.map(player => (
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
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">© 2025 高崎経済大学卓球部 最弱決定戦</p>
        </div>
      </footer>
    </div>
  )
}

export default App
