import { useState } from 'react'
import './App.css'
import KiuchiProfile from './components/KiuchiProfile'
import WakayamaProfile from './components/WakayamaProfile'
import AustinProfile from './components/AustinProfile'

function App() {
  const [currentView, setCurrentView] = useState('home')

  const renderContent = () => {
    switch(currentView) {
      case 'kiuchi':
        return <KiuchiProfile />
      case 'wakayama':
        return <WakayamaProfile />
      case 'austin':
        return <AustinProfile />
      default:
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
        <button 
          className={`nav-button ${currentView === 'kiuchi' ? 'active' : ''}`}
          onClick={() => setCurrentView('kiuchi')}
        >
          木内
        </button>
        <button 
          className={`nav-button ${currentView === 'wakayama' ? 'active' : ''}`}
          onClick={() => setCurrentView('wakayama')}
        >
          若山
        </button>
        <button 
          className={`nav-button ${currentView === 'austin' ? 'active' : ''}`}
          onClick={() => setCurrentView('austin')}
        >
          オースティン
        </button>
      </nav>
      
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  )
}

export default App
