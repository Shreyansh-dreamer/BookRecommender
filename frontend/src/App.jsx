import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Recommend from './pages/Recommend'

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10 shadow-2xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <span className="text-3xl sm:text-4xl group-hover:animate-bounce">📚</span>
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
              </div>
              <div>
                <h1 className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  BookVerse
                </h1>
                <p className="text-xs text-gray-400 hidden sm:block">Discover Your Next Adventure</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive('/') 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-lg">🏠</span>
                <span>Home</span>
              </Link>
              
              <Link
                to="/recommend"
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive('/recommend') 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-lg">🔍</span>
                <span>Recommend</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute block w-full h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? 'top-3 rotate-45' : 'top-1'
                }`}></span>
                <span className={`absolute block w-full h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'top-2.5'
                }`}></span>
                <span className={`absolute block w-full h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? 'top-3 -rotate-45' : 'top-4'
                }`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="py-4 space-y-2">
              <Link
                to="/"
                className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 ${
                  isActive('/') 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-xl">🏠</span>
                <span>Home</span>
              </Link>
              
              <Link
                to="/recommend"
                className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 ${
                  isActive('/recommend') 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-xl">🔍</span>
                <span>Recommend</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="pt-16 sm:pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recommend" element={<Recommend />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-lg border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center gap-2">
              <span className="text-2xl">📚</span>
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                BookVerse
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Discover your next favorite book with personalized recommendations powered by advanced algorithms.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">About</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-gray-500 text-xs">
                © 2024 BookVerse. Made with ❤️ for book lovers everywhere.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}