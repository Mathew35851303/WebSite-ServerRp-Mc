'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// URL de l'API (proxy local pour éviter CORS)
const API_URL = '/api'

// Type pour les actualités depuis l'API
export interface ApiNewsItem {
  id: number
  title: string
  description: string
  fullDescription: string
  type: 'update' | 'event' | 'reset' | 'maintenance' | 'info'
  isNew: boolean
  createdAt: string
  updatedAt: string
  headerImage: string | null
  galleryImages: string[]
  videoUrl: string | null
}

// Type interne pour l'affichage
export interface NewsItem {
  id: string
  title: string
  excerpt: string
  content: string
  category: 'update' | 'event' | 'maintenance' | 'announcement'
  date: string
  isNew: boolean
  headerImage: string | null
  galleryImages: string[]
  videoUrl: string | null
}

// Mapping des types API vers les catégories internes
const mapApiTypeToCategory = (type: ApiNewsItem['type']): NewsItem['category'] => {
  switch (type) {
    case 'update':
      return 'update'
    case 'event':
      return 'event'
    case 'maintenance':
      return 'maintenance'
    case 'reset':
      return 'maintenance'
    case 'info':
      return 'announcement'
    default:
      return 'announcement'
  }
}

// Convertir une actualité API vers le format interne
const mapApiNewsToNewsItem = (apiNews: ApiNewsItem): NewsItem => ({
  id: apiNews.id.toString(),
  title: apiNews.title,
  excerpt: apiNews.description,
  content: apiNews.fullDescription,
  category: mapApiTypeToCategory(apiNews.type),
  date: apiNews.createdAt,
  isNew: apiNews.isNew,
  headerImage: apiNews.headerImage,
  galleryImages: apiNews.galleryImages || [],
  videoUrl: apiNews.videoUrl,
})

// Configuration des catégories
const categoryConfig = {
  update: {
    label: 'Mise à jour',
    color: 'bg-green-600',
    borderColor: 'border-green-600',
    textColor: 'text-green-400',
    bgColor: 'bg-green-600/10',
  },
  event: {
    label: 'Événement',
    color: 'bg-purple-600',
    borderColor: 'border-purple-600',
    textColor: 'text-purple-400',
    bgColor: 'bg-purple-600/10',
  },
  maintenance: {
    label: 'Maintenance',
    color: 'bg-orange-600',
    borderColor: 'border-orange-600',
    textColor: 'text-orange-400',
    bgColor: 'bg-orange-600/10',
  },
  announcement: {
    label: 'Annonce',
    color: 'bg-blue-600',
    borderColor: 'border-blue-600',
    textColor: 'text-blue-400',
    bgColor: 'bg-blue-600/10',
  },
}

// Composant carte d'actualité
function NewsCard({ news, index, isVisible }: { news: NewsItem; index: number; isVisible: boolean }) {
  const [isHovered, setIsHovered] = useState(false)
  const config = categoryConfig[news.category]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <Link
      href={`/news/${news.id}`}
      className={`group block relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect on hover */}
      <div
        className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-red-600/20 to-red-900/20 blur-xl transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        className={`relative bg-[#0d0d0d]/90 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300 h-full ${
          isHovered ? 'border-red-600/50 shadow-lg shadow-red-600/10' : 'border-gray-800/50'
        }`}
      >
        {/* Header with image or fallback */}
        <div className={`relative h-40 overflow-hidden ${!news.headerImage ? config.bgColor : ''}`}>
          {news.headerImage ? (
            <>
              {/* Header image with zoom container */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={news.headerImage}
                  alt={news.title}
                  fill
                  className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
                />
              </div>
              {/* Overlay gradient - séparé pour éviter le gap */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </>
          ) : (
            <>
              {/* Decorative pattern (fallback) */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                  backgroundSize: '16px 16px',
                }}
              />
              {/* Category icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-12 h-12 rounded-xl ${config.color} flex items-center justify-center`}>
                  {news.category === 'update' && (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  )}
                  {news.category === 'event' && (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  {news.category === 'maintenance' && (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                  {news.category === 'announcement' && (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Category badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.color} text-white shadow-lg`}>
              {config.label}
            </span>
          </div>

          {/* New badge */}
          {news.isNew && (
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2 py-1 rounded-full text-xs font-bold bg-yellow-500 text-black animate-pulse shadow-lg">
                NEW
              </span>
            </div>
          )}

          {/* Video indicator */}
          {news.videoUrl && (
            <div className="absolute bottom-3 right-3 z-10">
              <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-600 text-white shadow-lg">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Vidéo
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Date */}
          <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(news.date)}
          </div>

          {/* Title */}
          <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
            isHovered ? 'text-red-500' : 'text-white'
          }`}>
            {news.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
            {news.excerpt}
          </p>

          {/* Read more link */}
          <div className="flex items-center gap-2 text-red-500 font-medium text-sm">
            <span>Lire la suite</span>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

// Composant filtre de catégorie
function CategoryFilter({
  selected,
  onSelect
}: {
  selected: string | null
  onSelect: (category: string | null) => void
}) {
  const categories = [
    { key: null, label: 'Toutes' },
    { key: 'update', label: 'Mises à jour' },
    { key: 'event', label: 'Événements' },
    { key: 'maintenance', label: 'Maintenance' },
    { key: 'announcement', label: 'Annonces' },
  ]

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {categories.map((cat) => (
        <button
          key={cat.key ?? 'all'}
          onClick={() => onSelect(cat.key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selected === cat.key
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
              : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}

export default function NewsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)

    // Charger les actualités depuis l'API
    async function fetchNews() {
      try {
        const response = await fetch(`${API_URL}/news`)
        if (!response.ok) {
          throw new Error('Impossible de charger les actualités')
        }
        const data: ApiNewsItem[] = await response.json()
        // Convertir et trier par date (plus récent en premier)
        const mappedNews = data
          .map(mapApiNewsToNewsItem)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        setNews(mappedNews)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const filteredNews = selectedCategory
    ? news.filter(n => n.category === selectedCategory)
    : news

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-24 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          {/* Glowing orb */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl transition-all duration-1000 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          />

          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/20 mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
          >
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span className="text-red-400 text-sm font-medium">Restez informés</span>
          </div>

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-700 delay-100 relative ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-white">Les </span>
            <span
              className="text-red-500 relative"
              style={{
                textShadow: '0 0 40px rgba(239, 68, 68, 0.5)',
              }}
            >
              Actualités
              <svg
                className={`absolute -bottom-2 left-0 w-full transition-all duration-700 delay-500 ${
                  isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                }`}
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 10C50 2 150 2 198 10"
                  stroke="rgba(239, 68, 68, 0.5)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p
            className={`text-gray-400 text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Toutes les dernières nouvelles du serveur Los Nachos Chipies. Mises à jour, événements et annonces importantes.
          </p>
        </div>

        {/* Category Filter */}
        <div
          className={`transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-16">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-red-600/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-gray-400">Chargement des actualités...</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-600/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Réessayer
            </button>
          </div>
        )}

        {/* News Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((newsItem, index) => (
              <NewsCard key={newsItem.id} news={newsItem} index={index} isVisible={isVisible} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredNews.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-800/50 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">Aucune actualité dans cette catégorie</p>
          </div>
        )}
      </div>
    </div>
  )
}
