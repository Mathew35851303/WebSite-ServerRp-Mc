'use client'

import { useEffect, useState, useRef } from 'react'

interface Rule {
  title: string
  description: string
}

interface RuleSection {
  category: string
  icon: React.ReactNode
  items: Rule[]
}

const rules: RuleSection[] = [
  {
    category: 'Règles de Base',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    items: [
      {
        title: 'Respect obligatoire',
        description: 'Pas d\'insultes, harcèlement, moqueries et discriminations. Le respect entre joueurs et envers le staff est primordial.',
      },
      {
        title: 'Aucun grief',
        description: 'Ne cassez pas les constructions d\'autres joueurs sans autorisation.',
      },
      {
        title: 'Pas de vol',
        description: 'Le vol est interdit sur le serveur.',
      },
      {
        title: 'Pas de cheat',
        description: 'L\'utilisation de clients modifiés, hacks, exploits ou tout autre moyen donnant un avantage injuste est strictement interdit.',
      },
      {
        title: 'Pas de spam / pub',
        description: 'Ni en jeu, ni sur le Discord. Les messages répétitifs et la publicité sont interdits.',
      },
      {
        title: 'Pas de SpawnKill',
        description: 'Il est interdit de tuer un joueur qui vient d\'apparaître ou de respawn.',
      },
      {
        title: 'Pas de NSFW',
        description: 'Toutes les personnes faisant une scène RP contenant des scènes sexuellement explicites, de la nudité, ou des propos déplacés seront sanctionnées.',
      },
    ],
  },
  {
    category: 'Roleplay',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    items: [
      {
        title: 'Restez dans votre personnage',
        description: 'Même si les rôleplay évoluent dans le temps, toujours rester dans son personnage.',
      },
      {
        title: 'Ne pas mélanger RP et HRP',
        description: 'Dans le jeu toujours rester RP, dans le chat Discord également. Utilisez le salon discussion pour les discussions HRP.',
      },
      {
        title: 'Power-Gaming interdit',
        description: 'Ne forcez pas une action sur un autre joueur sans son accord.',
      },
      {
        title: 'Meta-Gaming interdit',
        description: 'Ne pas utiliser des informations HRP (hors roleplay) dans le RP.',
      },
      {
        title: 'Fear-RP obligatoire',
        description: 'Votre personnage doit avoir peur du danger réel. Réagissez de manière réaliste face aux menaces.',
      },
      {
        title: 'Death-RP',
        description: 'La mort RP définitive doit être acceptée par le joueur et validée par un staff.',
      },
    ],
  },
  {
    category: 'Lore et Build',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    items: [
      {
        title: 'Respecter le thème',
        description: 'Respectez le style et l\'époque du serveur. Vos constructions doivent être cohérentes avec le lore post-apocalyptique.',
      },
      {
        title: 'Pas de constructions incohérentes',
        description: 'Pas de constructions flottantes ou incohérentes avec le lore sans approbation d\'un staff.',
      },
      {
        title: 'Grosses constructions',
        description: 'Toute grosse construction doit être annoncée au staff pour valider l\'emplacement.',
      },
    ],
  },
  {
    category: 'Interactions entre joueurs',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    items: [
      {
        title: 'Jouer les scènes RP',
        description: 'Respectez et jouez les scènes RP avec les autres joueurs. L\'immersion est importante pour tous.',
      },
      {
        title: 'Pas de déconnexion volontaire',
        description: 'Pas de déconnexion exprès pour éviter de jouer une scène RP. C\'est considéré comme du combat-log.',
      },
    ],
  },
  {
    category: 'Sanctions',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    items: [
      {
        title: 'Avertissement',
        description: 'Premier niveau de sanction pour les manquements légers.',
      },
      {
        title: 'Kick',
        description: 'Déconnexion immédiate du joueur du serveur. Le joueur peut revenir de suite.',
      },
      {
        title: 'Ban temporaire',
        description: 'Bannissement pour une durée déterminée selon la gravité de l\'infraction.',
      },
      {
        title: 'Ban définitif',
        description: 'Bannissement permanent du serveur pour les infractions graves ou récidives multiples.',
      },
    ],
  },
]

// Rule section card component
function RuleSectionCard({ section, index }: { section: RuleSection; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [expandedRule, setExpandedRule] = useState<number | null>(null)

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

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow border */}
      <div
        className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-red-600 via-orange-500 to-red-600 opacity-0 blur-sm transition-opacity duration-500 ${
          isHovered ? 'opacity-30' : ''
        }`}
        style={{
          backgroundSize: '200% 100%',
          animation: isHovered ? 'gradient-shift 2s linear infinite' : undefined,
        }}
      />

      <div className="relative bg-[#0d0d0d]/90 backdrop-blur-xl border border-red-900/30 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-red-900/40 to-red-950/20 p-6 border-b border-red-900/30">
          {/* Number badge */}
          <div className="absolute top-4 right-4">
            <span className="text-4xl font-black text-red-600/20">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Icon */}
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-red-600/30 to-red-900/30 border border-red-600/30 flex items-center justify-center text-red-500 transition-all duration-300 ${isHovered ? 'scale-110 border-red-500/60' : ''}`}>
              {section.icon}
            </div>

            <h2 className="text-2xl font-bold text-white">{section.category}</h2>
          </div>
        </div>

        {/* Rules */}
        <div className="p-6">
          <div className="flex flex-col gap-3">
            {section.items.map((rule, ruleIndex) => (
              <div
                key={ruleIndex}
                className={`group/rule relative p-4 rounded-xl border cursor-pointer transition-colors duration-200 ${
                  expandedRule === ruleIndex
                    ? 'bg-red-600/10 border-red-600/30'
                    : 'bg-transparent border-transparent hover:bg-red-600/5 hover:border-red-600/20'
                }`}
                onClick={() => setExpandedRule(expandedRule === ruleIndex ? null : ruleIndex)}
              >
                {/* Title row - always visible and fixed */}
                <div className="flex items-center gap-4">
                  {/* Number */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors duration-200 ${
                    expandedRule === ruleIndex
                      ? 'bg-red-600 text-white'
                      : 'bg-red-600/20 text-red-500 group-hover/rule:bg-red-600/30'
                  }`}>
                    {ruleIndex + 1}
                  </div>

                  <h3 className="flex-grow text-white font-semibold">{rule.title}</h3>

                  <svg
                    className={`w-5 h-5 text-red-500 flex-shrink-0 transition-transform duration-200 ${
                      expandedRule === ruleIndex ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Description - expands below */}
                <div
                  className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                    expandedRule === ruleIndex ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-400 leading-relaxed pt-3 pl-12">{rule.description}</p>
                </div>
              </div>
            ))}
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

export default function RulesPage() {
  const [isVisible, setIsVisible] = useState(false)
  const noticeRef = useRef<HTMLDivElement>(null)
  const [noticeVisible, setNoticeVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNoticeVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (noticeRef.current) {
      observer.observe(noticeRef.current)
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

        @keyframes pulse-warning {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
          }
        }
      `}</style>

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Floating particles */}
        {[...Array(10)].map((_, i) => (
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
        <div className="text-center mb-16 relative">
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-red-400 text-sm font-medium">À lire attentivement</span>
          </div>

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-700 delay-100 relative ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-white">Règlement du </span>
            <span
              className="text-red-500 relative"
              style={{
                textShadow: '0 0 40px rgba(239, 68, 68, 0.5)',
              }}
            >
              Serveur
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
            Pour que tout le monde puisse profiter du jeu, merci de respecter ces règles.
            Le non-respect entraînera des sanctions.
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

        {/* Important Notice */}
        <div
          ref={noticeRef}
          className={`relative mb-12 transition-all duration-700 ${
            noticeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Pulsing border */}
          <div
            className="absolute -inset-[1px] rounded-xl bg-red-600/50"
            style={{ animation: 'pulse-warning 2s ease-in-out infinite' }}
          />

          <div className="relative bg-red-950/50 backdrop-blur-xl border border-red-600/50 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-600/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-red-500 mb-2">Important</h2>
                <p className="text-gray-300">
                  En jouant sur Los Nachos Chipies, vous acceptez ce règlement dans son intégralité.
                  Le staff se réserve le droit de sanctionner tout comportement jugé nuisible à la communauté,
                  même s'il n'est pas explicitement mentionné ici.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rules */}
        <div className="space-y-8">
          {rules.map((section, index) => (
            <RuleSectionCard key={index} section={section} index={index} />
          ))}
        </div>

        {/* Contact CTA */}
        <div
          className={`mt-16 text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-gray-400 mb-6 text-lg">
            Une question sur le règlement ? Un problème à signaler ?
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
                Contacter le staff sur Discord
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
