import { useEffect, useState } from 'react'

function Home() {
  const [popular, setPopular] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://127.0.0.1:8000/popular')
        
        if (!response.ok) {
          throw new Error('Failed to fetch popular books')
        }
        
        const data = await response.json()
        setPopular(data.books || [])
      } catch (err) {
        setError('Failed to load popular books. Please try again later.')
        console.error('Error fetching popular books:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPopularBooks()
  }, [])

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&q=80'
  }

  if (loading) {
    return (
      <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-3 mb-4">
              <span className="text-4xl">📚</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Popular Books
              </h1>
            </div>
            <p className="text-gray-300 text-lg">Loading the most loved books...</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(20)].map((_, idx) => (
              <div key={idx} className="animate-pulse">
                <div className="bg-gray-700 rounded-2xl p-4">
                  <div className="bg-gray-600 w-full h-48 sm:h-56 rounded-xl mb-4"></div>
                  <div className="space-y-2">
                    <div className="bg-gray-600 h-4 rounded w-3/4"></div>
                    <div className="bg-gray-600 h-3 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">😕</span>
            <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 lg:p-8">
      <div className=" mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <span className="text-4xl sm:text-5xl">🏆</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Top 50 Books
            </h1>
          </div>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto">
            Discover the most popular and highly-rated books loved by readers worldwide
          </p>
        </div>

        {/* Stats Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📖</span>
              <div>
                <div className="text-2xl font-bold text-white">{popular.length}</div>
                <div className="text-gray-300 text-sm">Books Available</div>
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-600"></div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">⭐</span>
              <div>
                <div className="text-2xl font-bold text-white">Top Rated</div>
                <div className="text-gray-300 text-sm">Curated Collection</div>
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-600"></div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔥</span>
              <div>
                <div className="text-2xl font-bold text-white">Trending</div>
                <div className="text-gray-300 text-sm">Most Popular</div>
              </div>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {popular.map((book, idx) => (
            <div
              key={idx}
              className="group bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:border-yellow-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              {/* Rank Badge */}
              <div className="relative">
                <div className="absolute -top-2 -left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-lg">
                  #{idx + 1}
                </div>
                
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                    src={book['Image-URL-M']}
                    alt={book['Book-Title']}
                    className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Favorite Icon */}
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white hover:text-red-400 transition-colors cursor-pointer text-lg">❤️</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-bold text-white line-clamp-2 group-hover:text-yellow-400 transition-colors leading-tight">
                  {book['Book-Title']}
                </h3>
                
                <p className="text-gray-300 text-sm line-clamp-1">
                  by {book['Book-Author']}
                </p>
                
                {/* Quick Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 px-3 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-1">
                    <span>📖</span>
                    <span className="hidden sm:inline">Read</span>
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-2 px-3 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-1">
                    <span>ℹ️</span>
                    <span className="hidden sm:inline">Info</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Section */}
        {popular.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mx-auto">
              <span>📚</span>
              Explore More Books
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home