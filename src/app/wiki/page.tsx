'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

interface WikiArticle {
  title: string
  href: string
}

interface WikiCategory {
  title: string
  icon: React.ReactNode
  description: string
  articles: WikiArticle[]
  color: string
}

const wikiCategories: WikiCategory[] = [
  {
    title: 'Débuter',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    description: "Tout ce qu'il faut savoir pour bien commencer",
    color: 'from-green-600/30 to-green-900/30',
    articles: [
      { title: 'Premier pas sur le serveur', href: '#' },
      { title: 'Interface du launcher', href: '#' },
      { title: 'Les commandes de base', href: '#' },
      { title: 'Créer sa première base', href: '#' },
    ],
  },
  {
    title: 'Survie',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      </svg>
    ),
    description: 'Guides et astuces pour survivre',
    color: 'from-orange-600/30 to-orange-900/30',
    articles: [
      { title: 'Trouver des ressources', href: '#' },
      { title: 'Se nourrir efficacement', href: '#' },
      { title: 'Éviter les dangers', href: '#' },
      { title: 'Crafts spéciaux', href: '#' },
    ],
  },
  {
    title: 'Combat',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    description: "Maîtrisez l'art du combat",
    color: 'from-red-600/30 to-red-900/30',
    articles: [
      { title: 'Les armes disponibles', href: '#' },
      { title: 'Armures et protections', href: '#' },
      { title: 'Techniques de combat', href: '#' },
      { title: 'Les créatures hostiles', href: '#' },
    ],
  },
  {
    title: 'Construction',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    description: 'Bâtissez votre empire',
    color: 'from-blue-600/30 to-blue-900/30',
    articles: [
      { title: 'Matériaux de construction', href: '#' },
      { title: 'Défenses et pièges', href: '#' },
      { title: 'Systèmes de redstone', href: '#' },
      { title: 'Décoration post-apo', href: '#' },
    ],
  },
  {
    title: 'Factions',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
      </svg>
    ),
    description: 'Le système de factions expliqué',
    color: 'from-purple-600/30 to-purple-900/30',
    articles: [
      { title: 'Créer une faction', href: '#' },
      { title: 'Recruter des membres', href: '#' },
      { title: 'Territoire et claims', href: '#' },
      { title: 'Guerres de factions', href: '#' },
    ],
  },
  {
    title: 'Économie',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description: 'Le système économique du serveur',
    color: 'from-yellow-600/30 to-yellow-900/30',
    articles: [
      { title: 'La monnaie du serveur', href: '#' },
      { title: 'Le marché des joueurs', href: '#' },
      { title: 'Shops et commerce', href: '#' },
      { title: 'Jobs et métiers', href: '#' },
    ],
  },
]

// Wiki category card component
function WikiCategoryCard({ category, index }: { category: WikiCategory; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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
    <div
      ref={ref}
      className={`relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Glow border */}
      <div
        className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-red-600 via-orange-500 to-red-600 opacity-0 blur-sm transition-opacity duration-500 ${
          isHovered ? 'opacity-40' : ''
        }`}
        style={{
          backgroundSize: '200% 100%',
          animation: isHovered ? 'gradient-shift 2s linear infinite' : undefined,
        }}
      />

      {/* Mouse follow glow */}
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)`,
        }}
      />

      <div className="relative bg-[#0d0d0d]/90 backdrop-blur-xl border border-red-900/30 rounded-2xl overflow-hidden h-full">
        {/* Header */}
        <div className={`relative bg-gradient-to-r ${category.color} p-6 border-b border-red-900/30`}>
          {/* Number badge */}
          <div className="absolute top-3 right-3">
            <span className="text-3xl font-black text-white/10">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white transition-all duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
              {category.icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{category.title}</h2>
              <p className="text-gray-300 text-sm">{category.description}</p>
            </div>
          </div>
        </div>

        {/* Articles */}
        <div className="p-6">
          <ul className="space-y-3">
            {category.articles.map((article, articleIndex) => (
              <li
                key={articleIndex}
                className={`transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{ transitionDelay: `${(index * 100) + (articleIndex * 50) + 200}ms` }}
              >
                <Link
                  href={article.href}
                  className="group/link flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-red-600/10 transition-colors"
                >
                  <div className="w-6 h-6 rounded-md bg-red-600/20 flex items-center justify-center flex-shrink-0 group-hover/link:bg-red-600/30 transition-colors">
                    <svg
                      className="w-3 h-3 text-red-500 transition-transform duration-300 group-hover/link:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300 group-hover/link:text-white transition-colors">
                    {article.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* View all link */}
          <div className="mt-4 pt-4 border-t border-red-900/20">
            <Link
              href="#"
              className="group/all flex items-center justify-between text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              <span>Voir tous les articles</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover/all:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-transparent via-red-500 to-transparent transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-20'
            }`}
          />
        </div>
      </div>
    </div>
  )
}

export default function WikiPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-24 px-4 relative overflow-hidden">
      {/* Global CSS */}
      <style jsx global>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
        }

        @keyframes pulse-yellow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(234, 179, 8, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(234, 179, 8, 0);
          }
        }
      `}</style>

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-red-600/3 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationName: 'float-particle',
              animationDuration: `${5 + Math.random() * 5}s`,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 relative">
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-red-400 text-sm font-medium">Documentation complète</span>
          </div>

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-700 delay-100 relative ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-white">Wiki </span>
            <span
              className="text-red-500 relative"
              style={{
                textShadow: '0 0 40px rgba(239, 68, 68, 0.5)',
              }}
            >
              Utopia RPMC
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
            Toutes les informations dont vous avez besoin pour maîtriser le serveur
          </p>
        </div>

        {/* Search */}
        <div
          className={`max-w-xl mx-auto mb-12 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative">
            {/* Glow effect when focused */}
            <div
              className={`absolute -inset-1 rounded-xl bg-red-600/30 blur-lg transition-opacity duration-300 ${
                searchFocused ? 'opacity-100' : 'opacity-0'
              }`}
            />

            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Rechercher dans le wiki..."
                className="w-full bg-[#0d0d0d]/90 backdrop-blur-xl border border-red-900/30 rounded-xl px-6 py-4 pl-14 text-white placeholder-gray-500 focus:outline-none focus:border-red-600/50 transition-colors"
              />
              <svg
                className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                  searchFocused ? 'text-red-500' : 'text-gray-500'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center text-red-500 hover:bg-red-600/30 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Work in Progress Notice */}
        <div
          className={`relative mb-12 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Pulsing border */}
          <div
            className="absolute -inset-[1px] rounded-xl bg-yellow-600/30"
            style={{ animation: 'pulse-yellow 2s ease-in-out infinite' }}
          />

          <div className="relative bg-yellow-950/30 backdrop-blur-xl border border-yellow-600/50 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-yellow-600/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-yellow-500 mb-2">Wiki en construction</h2>
                <p className="text-gray-300">
                  Notre wiki est actuellement en cours de rédaction. De nouveaux articles sont ajoutés régulièrement.
                  Rejoignez notre Discord pour être informé des mises à jour !
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wikiCategories.map((category, index) => (
            <WikiCategoryCard key={index} category={category} index={index} />
          ))}
        </div>

        {/* Contribute CTA */}
        <div
          className={`mt-16 relative transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-900/20 rounded-2xl blur-xl" />

          <div className="relative bg-[#0d0d0d]/90 backdrop-blur-xl border border-red-900/30 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-red-600/30 to-red-900/30 border border-red-600/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">Contribuer au Wiki</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Vous connaissez bien le serveur et souhaitez aider la communauté ?
              Rejoignez l'équipe de rédaction sur Discord !
            </p>

            <a
              href="https://discord.gg/VPqdAzKhVv"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 overflow-hidden"
            >
              {/* Button glow */}
              <div className="absolute inset-0 bg-[#5865F2] blur-xl opacity-50 group-hover:opacity-75 transition-opacity rounded-xl" />

              <div className="relative bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all group-hover:scale-105">
                {/* Shine effect */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl" />

                <span className="relative flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  Rejoindre l'équipe
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
