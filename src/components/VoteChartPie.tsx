import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartData } from './VoteChart'

interface VoteChartPieProps {
  data: ChartData[]
  totalVotes: number
}

function VoteChartPie({ data, totalVotes }: VoteChartPieProps): React.JSX.Element {
  return (
    <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }: { name?: string; percent?: number }) =>
                `${name || ''} ${percent ? (percent * 100).toFixed(1) : '0'}%`
              }
              outerRadius={120}
              fill="#8884d8"
              dataKey="votes"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
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
  )
}

export default VoteChartPie
