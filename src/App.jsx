import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from './supabase'
import PlayerProfile from './components/PlayerProfile'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [players, setPlayers] = useState([])

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase
        .from('players')
        .select('*')
      if (error) {
        console.error('Error fetching players:', error)
      } else {
        setPlayers(data)
      }
    }
    fetchPlayers()
  }, [])

  const renderContent = () => {
    if (currentView === 'home') {
      return (
        <div className="home-content">
          <h1>TCUE-TT-Weakest-Tournament</h1>
          <p className="tournament-description">
            高崎経済大学卓球部 最弱決定戦
          </p>
          <p className="select-instruction">
            参加者のプロフィールを見るには、上のナビゲーションから選手を選択してください。
          </p>
        </div>
      )
    }
    const player = players.find(p => p.name === currentView)
    return <PlayerProfile player={player} />
  }

  return (
    <div className="app">
      <nav className="navigation">
        <button 
          className={`nav-button ${currentView === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentView('home')}
        >
          ホーム
        </button>
        {players.map(player => (
          <button 
            key={player.id}
            className={`nav-button ${currentView === player.name ? 'active' : ''}`}
            onClick={() => setCurrentView(player.name)}
          >
            {player.name}
          </button>
        ))}
      </nav>
      
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  )
}

export default App
