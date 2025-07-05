import { useState } from 'react'
import { Search, BookOpen, Star, Heart, ExternalLink } from 'lucide-react'
import axios from 'axios'

function Recommend() {
  const [userInput, setUserInput] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    if (!userInput.trim()) return

    setLoading(true)
    setError('')

    try {
      const res = await axios.post('http://127.0.0.1:8000/recommend', {
        user_input: userInput,
      })
      setResults(res.data.recommendations || [])
    } catch (err) {
      console.error(err)
      setError('Failed to get recommendations. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)
    }

    return stars
  }

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 px-4 sm:px-6 lg:px-8 py-10 overflow-x-hidden">
      <div className=" mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-yellow-400" />
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Book Finder
            </h1>
          </div>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto">
            Discover your next favorite read with personalized recommendations
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 mb-12 border border-white/20 max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 items-stretch"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter a book title you love..."
                className="w-full pl-10 pr-4 py-3 bg-white/90 text-gray-900 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 placeholder-gray-500"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !userInput.trim()}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Find Books
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-center">
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="text-center space-y-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Recommended for You
              </h2>
              <p className="text-gray-300">
                Found {results.length} books you might love
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((book, idx) => (
                <div
                  key={idx}
                  className="group bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:border-yellow-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/20"
                >
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Heart className="w-5 h-5 text-white hover:text-red-400 transition-colors cursor-pointer" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-yellow-400 transition-colors">
                      {book.title}
                    </h3>

                    <p className="text-gray-300 text-sm">by {book.author}</p>

                    {book.rating && (
                      <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(book.rating)}</div>
                        <span className="text-gray-300 text-sm">
                          {book.rating}
                        </span>
                      </div>
                    )}

                    {book.description && (
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {book.description}
                      </p>
                    )}

                    <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mt-4">
                      <ExternalLink className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {!loading && results.length === 0 && userInput && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No recommendations found
            </h3>
            <p className="text-gray-400">
              Try searching for a different book title
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Recommend
