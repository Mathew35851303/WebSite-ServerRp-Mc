'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'

// URL de l'API (proxy local pour éviter CORS)
const API_URL = '/api'

// Type pour les actualités depuis l'API
interface ApiNewsItem {
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
interface NewsItem {
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

// Fonction pour extraire l'ID YouTube d'une URL
const getYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

// Configuration des catégories
const categoryConfig = {
  update: {
    label: 'Mise à jour',
    color: 'bg-green-600',
    textColor: 'text-green-400',
    bgColor: 'bg-green-600/10',
    borderColor: 'border-green-600/30',
  },
  event: {
    label: 'Événement',
    color: 'bg-purple-600',
    textColor: 'text-purple-400',
    bgColor: 'bg-purple-600/10',
    borderColor: 'border-purple-600/30',
  },
  maintenance: {
    label: 'Maintenance',
    color: 'bg-orange-600',
    textColor: 'text-orange-400',
    bgColor: 'bg-orange-600/10',
    borderColor: 'border-orange-600/30',
  },
  announcement: {
    label: 'Annonce',
    color: 'bg-blue-600',
    textColor: 'text-blue-400',
    bgColor: 'bg-blue-600/10',
    borderColor: 'border-blue-600/30',
  },
}

// Composant pour afficher le contenu HTML
function HtmlContent({ content }: { content: string }) {
  return (
    <div
      className="prose prose-invert prose-red max-w-none
        prose-headings:text-white prose-headings:font-bold
        prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
        prose-p:text-gray-300 prose-p:leading-relaxed
        prose-li:text-gray-300
        prose-strong:text-white
        prose-a:text-red-500 prose-a:no-underline hover:prose-a:underline"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default function NewsDetailPage() {
  const params = useParams()
  const [isVisible, setIsVisible] = useState(false)
  const [news, setNews] = useState<NewsItem | null>(null)
  const [otherNews, setOtherNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)

    async function fetchNewsDetail() {
      try {
        const id = params.id as string

        // Charger l'actualité spécifique
        const response = await fetch(`${API_URL}/news/${id}`)
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Actualité introuvable')
          }
          throw new Error('Impossible de charger l\'actualité')
        }
        const data: ApiNewsItem = await response.json()
        setNews(mapApiNewsToNewsItem(data))

        // Charger les autres actualités pour les suggestions
        const allResponse = await fetch(`${API_URL}/news`)
        if (allResponse.ok) {
          const allData: ApiNewsItem[] = await allResponse.json()
          const others = allData
            .filter(n => n.id.toString() !== id)
            .map(mapApiNewsToNewsItem)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 3)
          setOtherNews(others)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      } finally {
        setLoading(false)
      }
    }

    fetchNewsDetail()
  }, [params.id])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  // État de chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] py-24 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-red-600/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-gray-400">Chargement de l'actualité...</p>
        </div>
      </div>
    )
  }

  // État d'erreur ou actualité non trouvée
  if (error || !news) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] py-24 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-600/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Actualité introuvable</h1>
          <p className="text-gray-500 mb-6">{error || 'Cette actualité n\'existe pas ou a été supprimée.'}</p>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour aux actualités
          </Link>
        </div>
      </div>
    )
  }

  const config = categoryConfig[news.category]

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

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back button */}
        <Link
          href="/news"
          className={`inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour aux actualités
        </Link>

        {/* Article */}
        <article>
          {/* Header with image or category banner */}
          <div
            className={`relative rounded-2xl overflow-hidden mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="absolute -inset-2 bg-red-600/10 rounded-2xl blur-2xl" />
            <div className={`relative ${news.headerImage ? 'h-64 md:h-80' : 'h-40'} ${!news.headerImage ? config.bgColor : ''}`}>
              {news.headerImage ? (
                <>
                  {/* Header image */}
                  <Image
                    src={news.headerImage}
                    alt={news.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </>
              ) : (
                <>
                  {/* Decorative pattern */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  {/* Category icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-20 h-20 rounded-2xl ${config.color} flex items-center justify-center`}>
                      {news.category === 'update' && (
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      )}
                      {news.category === 'event' && (
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                      {news.category === 'maintenance' && (
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                      {news.category === 'announcement' && (
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                        </svg>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Category badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${config.color} text-white shadow-lg`}>
                  {config.label}
                </span>
              </div>

              {/* New badge */}
              {news.isNew && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 rounded-full text-sm font-bold bg-yellow-500 text-black animate-pulse shadow-lg">
                    NEW
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Meta info */}
          <div
            className={`flex flex-wrap items-center gap-4 mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Date */}
            <span className="flex items-center gap-2 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(news.date)}
            </span>
          </div>

          {/* Title */}
          <h1
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {news.title}
          </h1>

          {/* Content */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-[#0d0d0d]/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8">
              <HtmlContent content={news.content} />
            </div>
          </div>

          {/* Video section */}
          {news.videoUrl && (
            <div
              className={`mt-8 transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Vidéo
              </h2>
              <div className="relative rounded-2xl overflow-hidden border border-gray-800/50">
                <div className="absolute -inset-2 bg-red-600/5 rounded-2xl blur-xl" />
                <div className="relative aspect-video bg-black">
                  {getYouTubeId(news.videoUrl) ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeId(news.videoUrl)}`}
                      title="Vidéo YouTube"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  ) : (
                    <video
                      src={news.videoUrl}
                      controls
                      className="w-full h-full"
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Gallery section */}
          {news.galleryImages && news.galleryImages.length > 0 && (
            <div
              className={`mt-8 transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Galerie
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {news.galleryImages.map((image, index) => (
                  <a
                    key={index}
                    href={image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-video rounded-xl overflow-hidden border border-gray-800/50 hover:border-red-600/50 transition-all duration-300"
                  >
                    <Image
                      src={image}
                      alt={`Image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Share buttons */}
          <div
            className={`flex items-center gap-4 mt-8 pt-8 border-t border-gray-800/50 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-gray-500">Partager :</span>
            <button className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-[#1DA1F2]/20 flex items-center justify-center text-gray-400 hover:text-[#1DA1F2] transition-all duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-[#5865F2]/20 flex items-center justify-center text-gray-400 hover:text-[#5865F2] transition-all duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-700/50 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </article>

        {/* Other news */}
        {otherNews.length > 0 && (
          <div
            className={`mt-16 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-2xl font-bold text-white mb-8">Autres actualités</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {otherNews.map((item) => {
                const itemConfig = categoryConfig[item.category]
                return (
                  <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    className="group block"
                  >
                    <div className="relative bg-[#0d0d0d]/90 backdrop-blur-xl border border-gray-800/50 rounded-xl overflow-hidden hover:border-red-600/50 transition-all duration-300">
                      {/* Category header */}
                      <div className={`h-20 ${itemConfig.bgColor} relative`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`w-10 h-10 rounded-lg ${itemConfig.color} flex items-center justify-center`}>
                            {item.category === 'update' && (
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                            )}
                            {item.category === 'event' && (
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            )}
                            {item.category === 'maintenance' && (
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              </svg>
                            )}
                            {item.category === 'announcement' && (
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <div className="absolute top-2 left-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${itemConfig.color} text-white`}>
                            {itemConfig.label}
                          </span>
                        </div>
                        {item.isNew && (
                          <div className="absolute top-2 right-2">
                            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-yellow-500 text-black">
                              NEW
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-white group-hover:text-red-500 transition-colors duration-300 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-sm mt-2">{formatDate(item.date)}</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
