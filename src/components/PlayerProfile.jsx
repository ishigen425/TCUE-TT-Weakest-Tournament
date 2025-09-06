import { useState, useEffect } from 'react'
import { insertVote } from '../supabase'
import './PlayerProfile.css'

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

  if (!player) return <div>Player not found</div>

  return (
    <div className="player-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <span className="avatar-placeholder">{player.name.charAt(0)}</span>
        </div>
        <h2 className="player-name">{player.name}</h2>
        <p className="player-title">最弱決定戦 参加者</p>
      </div>
      
      <div className="profile-content">
        <div className="profile-section">
          <h3>プロフィール</h3>
          <ul className="profile-stats">
            <li><span className="stat-label">所属:</span> 高崎経済大学卓球部</li>
            <li><span className="stat-label">ポジション:</span> 挑戦者</li>
            <li><span className="stat-label">特技:</span> 粘り強いプレー</li>
            <li><span className="stat-label">目標:</span> 最弱の座を狙う</li>
          </ul>
        </div>
        
        <div className="profile-section">
          <h3>戦績</h3>
          <div className="achievements">
            <p>過去の大会での成績やエピソードがここに表示されます。</p>
          </div>
        </div>
        
        <div className="profile-section">
          <h3>コメント</h3>
          <blockquote className="player-comment">
            {player.profile || "「この大会で自分の実力を試したいと思います。最弱の座を目指して頑張ります！」"}
          </blockquote>
        </div>

        <div className="profile-section">
          <h3>投票</h3>
          <button 
            onClick={handleVote} 
            disabled={hasVoted || isVoting}
            className="vote-button"
          >
            {hasVoted ? '投票済み' : isVoting ? '投票中...' : 'この選手に投票'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlayerProfile
