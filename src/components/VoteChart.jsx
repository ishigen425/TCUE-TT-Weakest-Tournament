import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getPlayers, getVoteCounts } from '../supabase'

function VoteChart() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalVotes, setTotalVotes] = useState(0)

  // 選手ごとの色を決定する関数
  const getPlayerColor = (playerName) => {
    if (playerName.includes('木内')) {
      return '#3b82f6' // blue-500 (青系)
    } else if (playerName.includes('若山')) {
      return '#10b981' // emerald-500 (緑系)
    } else if (playerName.includes('オースティン')) {
      return '#ef4444' // red-500 (赤系)
    }
    // デフォルト色（その他の選手用）
    return '#f59e0b' // amber-500 (黄系)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const players = await getPlayers()
        const voteCounts = await getVoteCounts()

        const chartData = players.map(player => ({
          name: player.name,
          votes: voteCounts[player.id] || 0
        }))

        const total = chartData.reduce((sum, player) => sum + player.votes, 0)
        setTotalVotes(total)
        setData(chartData)
      } catch (error) {
        console.error('データ取得に失敗しました:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-gray-700 text-center">
        <div className="flex items-center justify-center space-x-2">
          <svg className="animate-spin h-8 w-8 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-lg text-gray-300">投票結果を読み込み中...</span>
        </div>
      </div>
    )
  }

  const maxVotes = Math.max(...data.map(d => d.votes))
  const winner = data.find(d => d.votes === maxVotes)

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-gray-700 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4 flex items-center justify-center">
          <span className="mr-3">📊</span>
          投票結果
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          最弱決定戦の投票結果をリアルタイムで表示しています
        </p>
        
        {/* 統計情報 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-900 bg-opacity-50 p-4 rounded-lg border border-blue-700">
            <div className="text-2xl font-bold text-blue-400">{totalVotes}</div>
            <div className="text-sm text-blue-300">総投票数</div>
          </div>
          <div className="bg-green-900 bg-opacity-50 p-4 rounded-lg border border-green-700">
            <div className="text-2xl font-bold text-green-400">{data.length}</div>
            <div className="text-sm text-green-300">参加選手数</div>
          </div>
          <div className="bg-yellow-900 bg-opacity-50 p-4 rounded-lg border border-yellow-700">
            <div className="text-2xl font-bold text-yellow-400">{winner?.name || '-'}</div>
            <div className="text-sm text-yellow-300">現在1位</div>
          </div>
        </div>
      </div>

      {/* チャート */}
      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="votes"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getPlayerColor(entry.name)} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}票`, '投票数']}
                labelFormatter={(label) => `選手: ${label}`}
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
                  color: '#ffffff'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => `${value}`}
                wrapperStyle={{ paddingTop: '20px', color: '#ffffff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {totalVotes === 0 && (
          <div className="text-center mt-4 p-8">
            <div className="text-6xl mb-4">🗳️</div>
            <p className="text-xl text-gray-300 mb-2">まだ投票がありません</p>
            <p className="text-sm text-gray-400">選手のプロフィールページから投票してください</p>
          </div>
        )}
      </div>

      {/* 詳細結果 */}
      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">詳細結果</h2>
        <div className="space-y-4">
          {data
            .sort((a, b) => b.votes - a.votes)
            .map((player, index) => {
              const percentage = totalVotes > 0 ? ((player.votes / totalVotes) * 100).toFixed(1) : 0
              const playerColor = getPlayerColor(player.name)
              return (
                <div key={player.name} className="bg-gray-800 bg-opacity-70 p-4 rounded-lg border border-gray-600">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-gray-500'
                      }`}>
                        {index + 1}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: playerColor }}
                        ></div>
                        <span className="text-lg font-semibold text-white">{player.name}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">{player.votes}票</div>
                      <div className="text-sm text-gray-300">{percentage}%</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: playerColor
                      }}
                    ></div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>

      {/* 注意事項 */}
      <div className="bg-blue-900 bg-opacity-50 border border-blue-700 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-blue-400 text-xl">ℹ️</span>
          <div>
            <h3 className="text-blue-300 font-semibold mb-1">投票について</h3>
            <p className="text-blue-200 text-sm">
              投票結果はリアルタイムで更新されます。各選手には一度だけ投票することができます。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoteChart
