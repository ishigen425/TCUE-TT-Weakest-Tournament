import './PlayerProfile.css'

function AustinProfile() {
  return (
    <div className="player-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <span className="avatar-placeholder">A</span>
        </div>
        <h2 className="player-name">オースティン</h2>
        <p className="player-title">最弱決定戦 参加者</p>
      </div>
      
      <div className="profile-content">
        <div className="profile-section">
          <h3>プロフィール</h3>
          <ul className="profile-stats">
            <li><span className="stat-label">所属:</span> 高崎経済大学卓球部</li>
            <li><span className="stat-label">ポジション:</span> 挑戦者</li>
            <li><span className="stat-label">特技:</span> パワフルなスマッシュ</li>
            <li><span className="stat-label">目標:</span> 国際的な最弱</li>
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
            "I'm excited to participate in this tournament. Let's see who will be the weakest!"
          </blockquote>
        </div>
      </div>
    </div>
  )
}

export default AustinProfile