'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import FeatureCard from '@/components/FeatureCard'

// Icons as React components
const ExploreIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
)

const CombatIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const BuildIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
)

const CommunityIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const features = [
  {
    title: 'EXPLORE LE MONDE ET',
    subtitle: 'RÉCOLTE DES RESSOURCES',
    description: 'Explore des villes abandonnées, des forêts denses et des montagnes hostiles pour trouver des matériaux essentiels. Mais attention, les zombies et d\'autres survivants sont toujours une menace.',
    imageSrc: '/image/image-5c888fb3-5394-47c3-872b-88ad164af5bc.png',
    imageAlt: 'Récolte de ressources',
    icon: <ExploreIcon />,
    tag: 'Exploration',
  },
  {
    title: 'AFFRONTE LES DANGERS ET',
    subtitle: 'SURVIE À TOUT PRIX',
    description: 'Dans ce monde impitoyable, chaque décision compte. Combats des créatures mutantes, évite les pièges mortels et protège tes ressources des autres survivants.',
    imageSrc: '/image/image-ce0f6192-7454-4b5a-8f0c-8070ce2cc7ea.png',
    imageAlt: 'Combat de survie',
    icon: <CombatIcon />,
    tag: 'Combat',
  },
  {
    title: 'CONSTRUIS TA BASE ET',
    subtitle: 'PROTÈGE TON TERRITOIRE',
    description: 'Établis ton camp de base, fortifie tes défenses et crée un refuge sûr dans ce monde hostile. Collabore avec d\'autres survivants ou défends-toi contre les raids.',
    imageSrc: '/image/image-f2beb541-aad4-4fa1-882d-1c81a25acdde.png',
    imageAlt: 'Construction de base',
    icon: <BuildIcon />,
    tag: 'Construction',
  },
  {
    title: 'REJOINS LA COMMUNAUTÉ ET',
    subtitle: 'FORGE DES ALLIANCES',
    description: 'Rejoins une communauté de survivants passionnés. Crée des alliances stratégiques, échange des ressources et domine ensemble dans l\'apocalypse.',
    imageSrc: '/image/image-37617a07-9858-4667-bda6-d35a30bde48b.png',
    imageAlt: 'Communauté et alliances',
    icon: <CommunityIcon />,
    tag: 'Social',
  },
]

// Floating particles component for hero
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-red-500/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationName: 'float-up',
            animationDuration: `${8 + Math.random() * 12}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.3 + Math.random() * 0.4,
          }}
        />
      ))}
    </div>
  )
}

// Animated text component
function AnimatedTitle({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <span
      className={`inline-block transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </span>
  )
}

// Animated button component
function AnimatedButton({
  children,
  href,
  variant = 'primary',
  external = false,
  delay = 0,
}: {
  children: React.ReactNode
  href: string
  variant?: 'primary' | 'secondary'
  external?: boolean
  delay?: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const baseClasses = `
    relative overflow-hidden px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300
    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
  `

  const variantClasses = variant === 'primary'
    ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white'
    : 'bg-[#5865F2] hover:bg-[#4752C4] text-white'

  const content = (
    <>
      {/* Shine effect */}
      <div
        className={`absolute inset-0 transition-transform duration-500 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        }}
      />
      {/* Glow effect */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        style={{
          boxShadow: variant === 'primary'
            ? 'inset 0 0 20px rgba(239, 68, 68, 0.3)'
            : 'inset 0 0 20px rgba(88, 101, 242, 0.3)',
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  )

  const props = {
    className: `${baseClasses} ${variantClasses} ${isHovered ? 'scale-105 shadow-2xl' : ''} ${
      variant === 'primary' ? 'shadow-red-600/30' : 'shadow-[#5865F2]/30'
    }`,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    style: {
      boxShadow: isHovered
        ? variant === 'primary'
          ? '0 20px 40px -10px rgba(220, 38, 38, 0.5)'
          : '0 20px 40px -10px rgba(88, 101, 242, 0.5)'
        : undefined,
    },
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href} {...props}>
      {content}
    </Link>
  )
}

// Section header component with animations
function SectionHeader({
  tag,
  title,
  highlight,
  description,
}: {
  tag: string
  title: string
  highlight: string
  description: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="text-center mb-20">
      {/* Tag badge */}
      <span
        className={`inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-red-400 bg-red-600/10 rounded-full border border-red-600/20 mb-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        {tag}
      </span>

      {/* Title */}
      <h2
        className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {title} <span className="text-red-500">{highlight}</span>
      </h2>

      {/* Description */}
      <p
        className={`text-gray-400 max-w-2xl mx-auto text-lg transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {description}
      </p>

      {/* Decorative line */}
      <div
        className={`flex items-center justify-center gap-3 mt-10 transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
      >
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-red-600" />
        <div className="relative">
          <div className="w-3 h-3 rounded-full bg-red-600/50 border border-red-600" />
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-red-600 animate-ping opacity-50" />
        </div>
        <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-red-600" />
      </div>
    </div>
  )
}

// URL de l'API pour les actualités (proxy local pour éviter CORS)
const NEWS_API_URL = '/api'

// Types pour les actualités
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

interface HomeNewsItem {
  id: string
  title: string
  excerpt: string
  category: 'update' | 'event' | 'maintenance' | 'announcement'
  date: string
  isNew: boolean
  headerImage: string | null
}

// Mapping des types API vers les catégories internes
const mapApiTypeToCategory = (type: ApiNewsItem['type']): HomeNewsItem['category'] => {
  switch (type) {
    case 'update': return 'update'
    case 'event': return 'event'
    case 'maintenance': return 'maintenance'
    case 'reset': return 'maintenance'
    case 'info': return 'announcement'
    default: return 'announcement'
  }
}

const categoryConfig = {
  update: { label: 'Mise à jour', color: 'bg-green-600', bgColor: 'bg-green-600/10' },
  event: { label: 'Événement', color: 'bg-purple-600', bgColor: 'bg-purple-600/10' },
  maintenance: { label: 'Maintenance', color: 'bg-orange-600', bgColor: 'bg-orange-600/10' },
  announcement: { label: 'Annonce', color: 'bg-blue-600', bgColor: 'bg-blue-600/10' },
}

// News card for homepage
function NewsCardHome({ news, index, isVisible }: {
  news: HomeNewsItem
  index: number
  isVisible: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const config = categoryConfig[news.category]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
    })
  }

  return (
    <Link
      href={`/news/${news.id}`}
      className={`group block relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100 + 200}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
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
        {/* Category header with image or fallback */}
        <div className={`relative h-32 ${!news.headerImage ? config.bgColor : ''}`}>
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
                  backgroundSize: '12px 12px',
                }}
              />
              {/* Category icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-10 h-10 rounded-xl ${config.color} flex items-center justify-center`}>
                  {news.category === 'update' && (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  )}
                  {news.category === 'event' && (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  {news.category === 'maintenance' && (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    </svg>
                  )}
                  {news.category === 'announcement' && (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Category badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${config.color} text-white shadow-lg`}>
              {config.label}
            </span>
          </div>

          {/* Date badge */}
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-xs text-gray-300 shadow-lg">
              {formatDate(news.date)}
            </span>
          </div>

          {/* New badge */}
          {news.isNew && (
            <div className="absolute bottom-3 right-3 z-10">
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-yellow-500 text-black animate-pulse shadow-lg">
                NEW
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className={`font-bold mb-2 line-clamp-2 transition-colors duration-300 ${
            isHovered ? 'text-red-500' : 'text-white'
          }`}>
            {news.title}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2">
            {news.excerpt}
          </p>
        </div>
      </div>
    </Link>
  )
}

// News section for homepage
function NewsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [news, setNews] = useState<HomeNewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    // Charger les actualités depuis l'API
    async function fetchNews() {
      try {
        const response = await fetch(`${NEWS_API_URL}/news`)
        if (response.ok) {
          const data: ApiNewsItem[] = await response.json()
          const mappedNews = data
            .map(item => ({
              id: item.id.toString(),
              title: item.title,
              excerpt: item.description,
              category: mapApiTypeToCategory(item.type),
              date: item.createdAt,
              isNew: item.isNew,
              headerImage: item.headerImage,
            }))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 3)
          setNews(mappedNews)
        }
      } catch (error) {
        console.error('Erreur lors du chargement des actualités:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()

    return () => observer.disconnect()
  }, [])

  // Ne pas afficher la section s'il n'y a pas d'actualités
  if (!loading && news.length === 0) {
    return null
  }

  return (
    <section ref={ref} className="py-24 px-4 bg-[#0a0a0a] relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-red-600/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span
              className={`inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-red-400 bg-red-600/10 rounded-full border border-red-600/20 mb-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              Actualités
            </span>
            <h2
              className={`text-3xl md:text-4xl font-bold transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Dernières <span className="text-red-500">nouvelles</span>
            </h2>
          </div>

          <Link
            href="/news"
            className={`group inline-flex items-center gap-2 text-red-500 font-medium mt-4 md:mt-0 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span>Voir toutes les actualités</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 border-4 border-red-600/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        )}

        {/* News cards */}
        {!loading && news.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((newsItem, index) => (
              <NewsCardHome key={newsItem.id} news={newsItem} index={index} isVisible={isVisible} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// CTA Section component
function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePosition({ x, y })
  }

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="py-32 px-4 relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(127, 29, 29, 0.3) 0%, transparent 50%)`,
        }}
      />

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-red-950/20 to-[#0a0a0a]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-red-500/20 rounded-full"
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + (i % 3) * 30}%`,
              animationName: 'float-up',
              animationDuration: `${6 + i * 0.5}s`,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Glowing orb behind title */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        />

        {/* Content */}
        <div className="relative">
          {/* Pre-title */}
          <span
            className={`inline-block text-red-400 text-sm font-semibold uppercase tracking-widest mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            Rejoins l'aventure
          </span>

          {/* Title */}
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Prêt à <span className="text-red-500 relative">
              survivre
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
            </span> ?
          </h2>

          {/* Description */}
          <p
            className={`text-gray-400 mb-10 text-lg md:text-xl max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Téléchargez notre launcher et plongez dans l'apocalypse.
            <span className="text-gray-300"> Des milliers de survivants vous attendent.</span>
          </p>

          {/* CTA Button */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link
              href="/download"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/30"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>

              {/* Icon */}
              <svg className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>

              <span className="relative">Commencer l'aventure</span>

              {/* Arrow icon */}
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Stats or trust indicators */}
          <div
            className={`flex flex-wrap justify-center gap-8 mt-12 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {[
              { value: '1000+', label: 'Joueurs' },
              { value: '24/7', label: 'En ligne' },
              { value: '100%', label: 'Gratuit' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-red-500">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const [heroLoaded, setHeroLoaded] = useState(false)

  useEffect(() => {
    setHeroLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Global CSS for animations */}
      <style jsx global>{`
        @keyframes float-up {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        @keyframes scroll-bounce {
          0%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          50% {
            transform: translateY(10px) translateX(-50%);
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            heroLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src="/Video/Header/HeaderVideo.mp4" type="video/mp4" />
        </video>

        {/* Animated overlay layers */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 via-transparent to-red-950/20" />

        {/* Vignette effect */}
        <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />

        {/* Floating particles */}
        <FloatingParticles />

        {/* Scan lines effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Glowing orb behind title */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-3xl transition-all duration-2000 ${
              heroLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          />

          {/* Pre-title badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/20 mb-8 transition-all duration-700 ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-red-400 text-sm font-medium">Serveur Minecraft Post-Apocalyptique</span>
          </div>

          {/* Title with staggered animation */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-12 relative">
            <span
              className={`block text-white transition-all duration-700 delay-200 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              L'apocalypse n'est que le début,
            </span>
            <span
              className={`block text-red-500 relative transition-all duration-700 delay-400 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                textShadow: '0 0 40px rgba(239, 68, 68, 0.5), 0 0 80px rgba(239, 68, 68, 0.3)',
              }}
            >
              ton aventure commence ici.
              {/* Underline decoration */}
              <svg
                className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-64 transition-all duration-700 delay-700 ${
                  heroLoaded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
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

          {/* CTA Buttons with staggered animation */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-600 ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <AnimatedButton href="/download" variant="primary" delay={800}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Télécharger le Launcher
            </AnimatedButton>

            <AnimatedButton href="https://discord.gg/VPqdAzKhVv" variant="secondary" external delay={900}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Rejoindre Discord
            </AnimatedButton>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 transition-all duration-700 delay-1000 ${
            heroLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            animation: 'scroll-bounce 2s ease-in-out infinite',
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-gray-400 text-xs uppercase tracking-widest">Découvrir</span>
            <div className="w-6 h-10 rounded-full border-2 border-red-500/50 flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-red-500 rounded-full animate-bounce" />
            </div>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-20 left-8 w-20 h-20 border-l-2 border-t-2 border-red-600/30 opacity-50" />
        <div className="absolute top-20 right-8 w-20 h-20 border-r-2 border-t-2 border-red-600/30 opacity-50" />
        <div className="absolute bottom-20 left-8 w-20 h-20 border-l-2 border-b-2 border-red-600/30 opacity-50" />
        <div className="absolute bottom-20 right-8 w-20 h-20 border-r-2 border-b-2 border-red-600/30 opacity-50" />
      </section>

      {/* Features Section with Premium Cards */}
      <section className="py-32 px-4 bg-[#0a0a0a] relative z-10">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-red-600/3 rounded-full blur-3xl" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="max-w-6xl mx-auto relative">
          {/* Section header with animations */}
          <SectionHeader
            tag="Fonctionnalités"
            title="Découvrez"
            highlight="l'expérience"
            description="Plongez dans un univers post-apocalyptique unique où chaque jour est un combat pour la survie."
          />

          {/* Feature Cards */}
          <div className="space-y-20">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                subtitle={feature.subtitle}
                description={feature.description}
                imageSrc={feature.imageSrc}
                imageAlt={feature.imageAlt}
                reverse={index % 2 === 1}
                index={index}
                icon={feature.icon}
                tag={feature.tag}
              />
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <NewsSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}
