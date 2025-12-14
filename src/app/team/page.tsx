'use client'

import { useEffect, useState, useRef } from 'react'

// Team member type
interface TeamMember {
  name: string
  role: string
  description: string
  avatar: string
  socials?: {
    discord?: string
    twitter?: string
    youtube?: string
  }
  color: string
}

// Team data
const teamMembers: TeamMember[] = [
  {
    name: 'NachosLeader',
    role: 'Fondateur & Admin',
    description: 'Créateur du serveur et visionnaire du projet Los Nachos Chipies. Passionné par les univers post-apocalyptiques.',
    avatar: '/image/team/founder.png',
    socials: {
      discord: 'nachosleader',
      twitter: '@nachosleader',
    },
    color: '#ef4444', // red
  },
  {
    name: 'ChipieBuilder',
    role: 'Lead Builder',
    description: 'Architecte en chef de toutes les structures du serveur. Expert en construction post-apo et ambiances immersives.',
    avatar: '/image/team/builder.png',
    socials: {
      discord: 'chipiebuilder',
    },
    color: '#f97316', // orange
  },
  {
    name: 'DevMaster',
    role: 'Développeur',
    description: 'Responsable des plugins et du launcher. Transforme les idées en fonctionnalités jouables.',
    avatar: '/image/team/dev.png',
    socials: {
      discord: 'devmaster',
    },
    color: '#22c55e', // green
  },
  {
    name: 'ModeratorX',
    role: 'Head Modérateur',
    description: 'Gardien de la paix sur le serveur. S\'assure que tout le monde respecte les règles et profite du jeu.',
    avatar: '/image/team/mod.png',
    socials: {
      discord: 'moderatorx',
    },
    color: '#3b82f6', // blue
  },
  {
    name: 'LoreKeeper',
    role: 'Scénariste',
    description: 'Auteur du lore et des quêtes. Crée les histoires qui donnent vie à l\'univers post-apocalyptique.',
    avatar: '/image/team/lore.png',
    socials: {
      discord: 'lorekeeper',
    },
    color: '#a855f7', // purple
  },
  {
    name: 'CommunityHero',
    role: 'Community Manager',
    description: 'Anime la communauté sur Discord et les réseaux sociaux. Organise les events et écoute vos retours.',
    avatar: '/image/team/cm.png',
    socials: {
      discord: 'communityhero',
      youtube: '@losnachoschipies',
    },
    color: '#ec4899', // pink
  },
]

// Floating particles component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-red-500/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationName: 'float-up',
            animationDuration: `${10 + Math.random() * 15}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.3 + Math.random() * 0.3,
          }}
        />
      ))}
    </div>
  )
}

// Team member card component
function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePosition({ x, y })
  }

  // Calculate 3D transform based on mouse position
  const rotateX = isHovered ? (mousePosition.y - 0.5) * -20 : 0
  const rotateY = isHovered ? (mousePosition.x - 0.5) * 20 : 0

  return (
    <div
      ref={cardRef}
      className={`relative group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
        perspective: '1000px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Card container with 3D transform */}
      <div
        className="relative bg-gradient-to-br from-gray-900/80 to-gray-950/90 rounded-2xl border border-gray-800/50 overflow-hidden transition-all duration-300"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.02 : 1})`,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? `0 25px 50px -12px ${member.color}30, 0 0 30px ${member.color}20`
            : '0 10px 30px -10px rgba(0,0,0,0.5)',
        }}
      >
        {/* Animated glow border */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${member.color}40, transparent 50%, ${member.color}40)`,
            backgroundSize: '200% 200%',
            animation: isHovered ? 'gradient-shift 3s ease infinite' : 'none',
          }}
        />

        {/* Inner card content */}
        <div className="relative p-6 backdrop-blur-sm">
          {/* Top glow effect */}
          <div
            className="absolute top-0 left-0 right-0 h-32 opacity-30 transition-opacity duration-300 group-hover:opacity-50"
            style={{
              background: `radial-gradient(ellipse at center top, ${member.color}40, transparent 70%)`,
            }}
          />

          {/* Avatar container */}
          <div className="relative flex justify-center mb-6">
            {/* Avatar glow ring */}
            <div
              className="absolute w-28 h-28 rounded-full transition-all duration-500"
              style={{
                background: `conic-gradient(from 0deg, ${member.color}, transparent, ${member.color})`,
                opacity: isHovered ? 0.8 : 0.3,
                animation: isHovered ? 'spin 3s linear infinite' : 'none',
              }}
            />

            {/* Avatar ring */}
            <div
              className="relative w-24 h-24 rounded-full p-1 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${member.color}, ${member.color}60)`,
              }}
            >
              {/* Avatar placeholder/image */}
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-gray-900">
                {/* Placeholder icon - can be replaced with actual image */}
                <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>

            {/* Floating particles around avatar */}
            {isHovered && (
              <>
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                      background: member.color,
                      left: `${50 + Math.cos((i / 6) * Math.PI * 2) * 60}%`,
                      top: `${50 + Math.sin((i / 6) * Math.PI * 2) * 60}%`,
                      transform: 'translate(-50%, -50%)',
                      animationName: 'pulse',
                      animationDuration: '1.5s',
                      animationTimingFunction: 'ease-in-out',
                      animationIterationCount: 'infinite',
                      animationDelay: `${i * 0.2}s`,
                      opacity: 0.7,
                    }}
                  />
                ))}
              </>
            )}
          </div>

          {/* Role badge */}
          <div className="flex justify-center mb-3">
            <span
              className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300"
              style={{
                background: `${member.color}20`,
                color: member.color,
                border: `1px solid ${member.color}40`,
                boxShadow: isHovered ? `0 0 15px ${member.color}30` : 'none',
              }}
            >
              {member.role}
            </span>
          </div>

          {/* Name */}
          <h3
            className="text-xl font-bold text-center mb-3 transition-all duration-300"
            style={{
              color: isHovered ? member.color : 'white',
              textShadow: isHovered ? `0 0 20px ${member.color}50` : 'none',
            }}
          >
            {member.name}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm text-center leading-relaxed mb-5">
            {member.description}
          </p>

          {/* Socials */}
          {member.socials && (
            <div className="flex justify-center gap-3">
              {member.socials.discord && (
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110"
                  style={{
                    background: isHovered ? `${member.color}20` : 'rgba(88, 101, 242, 0.1)',
                    border: `1px solid ${isHovered ? member.color + '40' : 'rgba(88, 101, 242, 0.3)'}`,
                  }}
                  title={member.socials.discord}
                >
                  <svg className="w-4 h-4" fill={isHovered ? member.color : '#5865F2'} viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                  </svg>
                </div>
              )}
              {member.socials.twitter && (
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110"
                  style={{
                    background: isHovered ? `${member.color}20` : 'rgba(29, 161, 242, 0.1)',
                    border: `1px solid ${isHovered ? member.color + '40' : 'rgba(29, 161, 242, 0.3)'}`,
                  }}
                  title={member.socials.twitter}
                >
                  <svg className="w-4 h-4" fill={isHovered ? member.color : '#1DA1F2'} viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
              )}
              {member.socials.youtube && (
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110"
                  style={{
                    background: isHovered ? `${member.color}20` : 'rgba(255, 0, 0, 0.1)',
                    border: `1px solid ${isHovered ? member.color + '40' : 'rgba(255, 0, 0, 0.3)'}`,
                  }}
                  title={member.socials.youtube}
                >
                  <svg className="w-4 h-4" fill={isHovered ? member.color : '#FF0000'} viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
              )}
            </div>
          )}

          {/* Decorative corner accents */}
          <div
            className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 transition-all duration-300"
            style={{
              borderColor: isHovered ? member.color : 'rgba(239, 68, 68, 0.3)',
            }}
          />
          <div
            className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 transition-all duration-300"
            style={{
              borderColor: isHovered ? member.color : 'rgba(239, 68, 68, 0.3)',
            }}
          />
          <div
            className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 transition-all duration-300"
            style={{
              borderColor: isHovered ? member.color : 'rgba(239, 68, 68, 0.3)',
            }}
          />
          <div
            className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 transition-all duration-300"
            style={{
              borderColor: isHovered ? member.color : 'rgba(239, 68, 68, 0.3)',
            }}
          />
        </div>

        {/* Scan line effect on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{
              background: `linear-gradient(to bottom, transparent, ${member.color}10, transparent)`,
              backgroundSize: '100% 10px',
              animation: 'scan-line 2s linear infinite',
            }}
          />
        )}
      </div>
    </div>
  )
}

// Page header component
function PageHeader() {
  const [isVisible, setIsVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div ref={headerRef} className="relative pt-32 pb-20 text-center overflow-hidden">
      {/* Background glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-600/10 rounded-full blur-3xl transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
      />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Pre-title badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/20 mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-red-400 text-sm font-medium">Notre Famille</span>
        </div>

        {/* Title */}
        <h1
          className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          L'équipe des{' '}
          <span
            className="text-red-500 relative"
            style={{
              textShadow: '0 0 40px rgba(239, 68, 68, 0.5)',
            }}
          >
            Nachos
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

        {/* Description */}
        <p
          className={`text-gray-400 text-lg md:text-xl max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Découvrez les passionnés qui travaillent chaque jour pour vous offrir
          la meilleure expérience post-apocalyptique.
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
    </div>
  )
}

// Join team CTA section
function JoinTeamSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/10 to-transparent" />

      <div className="max-w-4xl mx-auto relative">
        {/* Card */}
        <div
          className={`relative bg-gradient-to-br from-gray-900/80 to-gray-950/90 rounded-2xl border border-red-600/20 overflow-hidden transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          {/* Animated border glow */}
          <div
            className="absolute inset-0 rounded-2xl opacity-30"
            style={{
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.4), transparent 50%, rgba(239, 68, 68, 0.4))',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 4s ease infinite',
            }}
          />

          {/* Content */}
          <div className="relative p-8 md:p-12 text-center">
            {/* Icon */}
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600/10 border border-red-600/30 mb-6 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
            >
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>

            {/* Title */}
            <h2
              className={`text-2xl md:text-3xl font-bold mb-4 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Envie de <span className="text-red-500">rejoindre l'équipe</span> ?
            </h2>

            {/* Description */}
            <p
              className={`text-gray-400 mb-8 max-w-lg mx-auto transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Nous sommes toujours à la recherche de personnes motivées pour enrichir notre équipe.
              Builders, modérateurs, développeurs... Si tu as du talent et de la passion, contacte-nous !
            </p>

            {/* CTA Button */}
            <a
              href="https://discord.gg/VPqdAzKhVv"
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/30 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: isVisible ? '400ms' : '0ms',
              }}
            >
              {/* Discord icon */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
              <span>Candidater sur Discord</span>
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-red-600/30" />
          <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-red-600/30" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-red-600/30" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-red-600/30" />
        </div>
      </div>
    </section>
  )
}

export default function TeamPage() {
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

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes scan-line {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0.3;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-red-600/3 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Page header */}
      <PageHeader />

      {/* Team grid */}
      <section className="py-12 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Join team CTA */}
      <JoinTeamSection />
    </div>
  )
}
