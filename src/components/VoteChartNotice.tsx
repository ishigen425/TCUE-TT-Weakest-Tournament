import React from 'react'

function VoteChartNotice(): React.JSX.Element {
  return (
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
  )
}

export default VoteChartNotice
