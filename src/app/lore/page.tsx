'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

interface Chapter {
  number: number
  title: string
  paragraphs: string[]
}

const chapters: Chapter[] = [
  {
    number: 1,
    title: 'Le Jour Zéro',
    paragraphs: [
      "Personne ne sait exactement comment tout a commencé. Certains parlent d'une expérience scientifique qui a mal tourné, d'autres évoquent une malédiction ancienne réveillée des profondeurs de la terre. Ce qui est certain, c'est que le monde tel que nous le connaissions a cessé d'exister en l'espace de quelques jours.",
      "Les premières créatures sont apparues à l'aube, surgissant des ombres comme des cauchemars devenus réalité. Les villes sont tombées les unes après les autres. Les gouvernements se sont effondrés. L'humanité s'est retrouvée seule face à l'horreur.",
    ],
  },
  {
    number: 2,
    title: 'Les Terres Désolées',
    paragraphs: [
      "Des années ont passé depuis le Jour Zéro. Le monde est méconnaissable. Les forêts verdoyantes sont devenues des marécages toxiques. Les villes autrefois florissantes ne sont plus que des ruines hantées par des créatures indicibles.",
      "Les survivants se sont adaptés. Ils ont appris à vivre dans l'ombre, à récupérer ce qu'ils peuvent des vestiges de l'ancien monde, à se battre pour chaque jour de survie. Des communautés ont émergé, parfois alliées, souvent rivales.",
    ],
  },
  {
    number: 3,
    title: 'Utopia RPMC',
    paragraphs: [
      "Au cœur de ce chaos, un refuge a émergé. On l'appelle Utopia RPMC – un nom étrange pour un endroit étrange, donné par ses premiers habitants avec un humour noir caractéristique des survivants.",
      "Ici, les survivants de tous horizons se retrouvent. Certains cherchent la sécurité, d'autres le pouvoir. Certains veulent reconstruire, d'autres préfèrent régner sur les ruines. Mais tous partagent une chose : la volonté de survivre.",
      "C'est ici que votre histoire commence. Que ferez-vous de ce nouveau monde ? Serez-vous un bâtisseur ou un destructeur ? Un héros ou un tyran ? À Utopia RPMC, seule la survie compte.",
    ],
  },
]

// Chapter card component with scroll animation
function ChapterCard({ chapter, index }: { chapter: Chapter; index: number }) {
  const ref = useRef<HTMLElement>(null)
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
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePosition({ x, y })
  }

  return (
    <article
      ref={ref}
      className={`relative transition-all duration-1000 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : `opacity-0 translate-y-12 ${index % 2 === 0 ? '-translate-x-8' : 'translate-x-8'}`
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Timeline connector */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-red-600/50 via-red-600/20 to-transparent hidden lg:block" style={{ left: '-40px' }} />

      {/* Timeline dot */}
      <div className="absolute hidden lg:flex items-center justify-center" style={{ left: '-48px', top: '30px' }}>
        <div className={`w-4 h-4 rounded-full border-2 border-red-600 bg-[#0a0a0a] transition-all duration-300 ${isHovered ? 'scale-150 bg-red-600' : ''}`} />
        <div className={`absolute w-8 h-8 rounded-full bg-red-600/30 transition-all duration-300 ${isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
      </div>

      {/* Glow border effect */}
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

      <div className="relative bg-[#0d0d0d]/90 backdrop-blur-xl border border-red-900/30 rounded-2xl overflow-hidden">
        {/* Scan line effect */}
        <div
          className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent"
            style={{
              animation: isHovered ? 'scan-line 3s linear infinite' : undefined,
              top: '0%',
            }}
          />
        </div>

        {/* Left accent bar */}
        <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 via-red-600 to-red-900 transition-all duration-500 ${isHovered ? 'w-1.5' : ''}`} />

        {/* Content */}
        <div className="p-8 pl-10">
          {/* Chapter badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-red-600 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>
              {String(chapter.number).padStart(2, '0')}
            </span>
            <div className="h-px flex-grow bg-gradient-to-r from-red-600/50 to-transparent" />
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-400 bg-red-600/10 rounded-full border border-red-600/20">
              Chapitre {chapter.number}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span>{chapter.title}</span>
            <svg
              className={`w-6 h-6 text-red-500 transition-all duration-300 ${isHovered ? 'translate-x-2 opacity-100' : 'opacity-0'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </h2>

          {/* Paragraphs */}
          <div className="space-y-4">
            {chapter.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={`text-gray-300 leading-relaxed transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${(index * 150) + (i * 100) + 200}ms` }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-transparent via-red-500 to-transparent transition-all duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-20'
            }`}
            style={{
              animation: isHovered ? 'slide-shine 2s ease-in-out infinite' : undefined,
            }}
          />
        </div>
      </div>
    </article>
  )
}

// Quote component with animation
function AnimatedQuote({ isVisible }: { isVisible: boolean }) {
  return (
    <div className={`mt-20 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="relative inline-block">
        {/* Quote marks */}
        <svg className="absolute -top-8 -left-8 w-16 h-16 text-red-600/20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>

        <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-400 italic px-8">
          "Dans un monde où tout est perdu,
          <br />
          <span className="text-red-500" style={{ textShadow: '0 0 30px rgba(239, 68, 68, 0.3)' }}>
            seule la survie a de la valeur.
          </span>"
        </blockquote>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-red-600/50" />
          <div className="w-2 h-2 rounded-full bg-red-600/50" />
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-red-600/50" />
        </div>
      </div>
    </div>
  )
}

export default function LorePage() {
  const [isVisible, setIsVisible] = useState(false)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [ctaVisible, setCtaVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCtaVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ctaRef.current) {
      observer.observe(ctaRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-24 px-4 relative overflow-hidden">
      {/* Global CSS for animations */}
      <style jsx global>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        @keyframes scan-line {
          0% { top: -2px; }
          100% { top: 100%; }
        }

        @keyframes slide-shine {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) translateX(10px);
            opacity: 0.8;
          }
        }
      `}</style>

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-red-600/3 rounded-full blur-3xl" />

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

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 relative">
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
            <span className="text-red-400 text-sm font-medium">Lore du serveur</span>
          </div>

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-700 delay-100 relative ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-white">L'Histoire de </span>
            <span
              className="text-red-500 relative"
              style={{
                textShadow: '0 0 40px rgba(239, 68, 68, 0.5)',
              }}
            >
              l'Apocalypse
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
            Découvrez les origines du monde dévasté de Utopia RPMC
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

        {/* Timeline / Chapters */}
        <div className="space-y-12 lg:pl-12 relative">
          {/* Main timeline line (desktop) */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-red-600/50 via-red-600/20 to-transparent hidden lg:block" style={{ left: '-40px' }} />

          {chapters.map((chapter, index) => (
            <ChapterCard key={chapter.number} chapter={chapter} index={index} />
          ))}
        </div>

        {/* Quote */}
        <AnimatedQuote isVisible={isVisible} />

        {/* CTA Section */}
        <div
          ref={ctaRef}
          className={`mt-16 text-center transition-all duration-1000 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-gray-400 mb-6 text-lg">Prêt à écrire votre propre chapitre ?</p>

          <Link
            href="/download"
            className="group relative inline-flex items-center gap-3 overflow-hidden"
          >
            {/* Button glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 blur-xl opacity-50 group-hover:opacity-75 transition-opacity rounded-xl" />

            <div className="relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all group-hover:scale-105">
              {/* Shine effect */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl" />

              <span className="relative flex items-center gap-2">
                Rejoindre l'aventure
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
