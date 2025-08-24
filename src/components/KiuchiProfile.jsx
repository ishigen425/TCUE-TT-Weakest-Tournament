import './PlayerProfile.css'

function KiuchiProfile() {
  return (
    <div className="player-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <span className="avatar-placeholder">木</span>
        </div>
        <h2 className="player-name">木内</h2>
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
            「この大会で自分の実力を試したいと思います。最弱の座を目指して頑張ります！」
          </blockquote>
        </div>
      </div>
    </div>
  )
}

export default KiuchiProfile