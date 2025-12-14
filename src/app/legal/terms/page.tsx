'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

interface Section {
  title: string
  content: string | string[]
}

const sections: Section[] = [
  {
    title: 'Acceptation des conditions',
    content: 'En accédant et en utilisant le serveur Minecraft Los Nachos Chipies et ses services associés (site web, Discord, launcher), vous acceptez d\'être lié par les présentes conditions d\'utilisation. Si vous n\'acceptez pas ces conditions, vous ne devez pas utiliser nos services.',
  },
  {
    title: 'Description du service',
    content: 'Los Nachos Chipies est un serveur Minecraft privé proposant une expérience de jeu post-apocalyptique. Nous fournissons un launcher personnalisé permettant de se connecter au serveur avec les mods nécessaires pré-installés.',
  },
  {
    title: 'Conditions d\'accès',
    content: [
      'Posséder un compte Minecraft valide',
      'Accepter et respecter le règlement du serveur',
      'Ne pas utiliser de logiciels de triche ou d\'exploitation',
      'Avoir l\'âge minimum requis dans votre juridiction pour utiliser ce type de service',
    ],
  },
  {
    title: 'Comportement des utilisateurs',
    content: [
      'Respecter les autres joueurs et le staff',
      'Ne pas utiliser de langage offensant, discriminatoire ou haineux',
      'Ne pas tricher ou exploiter des bugs',
      'Ne pas tenter de pirater ou perturber le serveur',
      'Ne pas faire de publicité non autorisée',
    ],
  },
  {
    title: 'Propriété intellectuelle',
    content: 'Le contenu original créé pour Los Nachos Chipies (logo, textes, configurations) reste la propriété de l\'équipe du serveur. Minecraft est une marque déposée de Mojang AB / Microsoft. Nous ne sommes pas affiliés à Mojang ou Microsoft.',
  },
  {
    title: 'Sanctions et exclusion',
    content: 'Le non-respect des conditions d\'utilisation ou du règlement peut entraîner des sanctions allant de l\'avertissement au bannissement permanent, à la discrétion du staff. Aucun remboursement ne sera accordé en cas de bannissement.',
  },
  {
    title: 'Limitation de responsabilité',
    content: 'Los Nachos Chipies est fourni "tel quel" sans garantie d\'aucune sorte. Nous ne sommes pas responsables des pertes de données, des interruptions de service ou de tout dommage résultant de l\'utilisation de nos services.',
  },
  {
    title: 'Modifications',
    content: 'Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entrent en vigueur dès leur publication sur cette page. Il est de votre responsabilité de consulter régulièrement ces conditions.',
  },
  {
    title: 'Contact',
    content: 'Pour toute question concernant ces conditions d\'utilisation, vous pouvez nous contacter via notre serveur Discord.',
  },
]

function SectionCard({ section, index }: { section: Section; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative bg-gradient-to-br from-gray-900/60 to-gray-950/80 rounded-xl border border-gray-800/50 p-6 hover:border-red-600/30 transition-colors duration-300">
        {/* Section number */}
        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-red-600/30">
          {index + 1}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-white mb-4 pl-4">{section.title}</h2>

        {/* Content */}
        {Array.isArray(section.content) ? (
          <ul className="space-y-2 pl-4">
            {section.content.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-400">
                <span className="text-red-500 mt-1.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 leading-relaxed pl-4">{section.content}</p>
        )}
      </div>
    </div>
  )
}

export default function TermsPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-24">
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-red-400 text-sm font-medium">Document légal</span>
          </div>

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-700 delay-100 relative ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-white">Conditions </span>
            <span
              className="text-red-500 relative"
              style={{ textShadow: '0 0 40px rgba(239, 68, 68, 0.5)' }}
            >
              d'Utilisation
            </span>
          </h1>

          <p
            className={`text-gray-500 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
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

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <SectionCard key={index} section={section} index={index} />
          ))}
        </div>

        {/* Back link */}
        <div
          className={`mt-16 text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
