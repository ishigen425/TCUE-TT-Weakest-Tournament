import React from 'react'

interface ComingSoonProps {
  title?: string
  message?: string
  icon?: string
}

function ComingSoon({ 
  title = 'Coming Soon...', 
  message = 'もうしばらくお待ちください 🙇',
  icon = '🏓'
}: ComingSoonProps): React.JSX.Element {
  return (
    <div className="max-w-4xl mx-auto min-h-[60vh] flex items-center justify-center">
      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-12 border border-gray-700 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-5xl">{icon}</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-xl">✨</span>
            </div>
          </div>
        </div>
        
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 mb-4 animate-pulse">
          {title}
        </h2>
        
        <p className="text-gray-300 text-lg mb-2">
          {message}
        </p>
        
        <div className="mt-8 flex justify-center space-x-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon
