'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

interface Section {
  title: string
  content: string | string[]
}

const sections: Section[] = [
  {
    title: 'Introduction',
    content: 'Utopia RPMC respecte votre vie privée et s\'engage à protéger vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez nos services.',
  },
  {
    title: 'Données collectées',
    content: [
      'Identifiants de jeu : Nom d\'utilisateur Minecraft, UUID',
      'Données de connexion : Adresse IP, horodatage des connexions',
      'Données de jeu : Statistiques, progression, inventaire',
      'Communications : Messages dans le chat du serveur',
    ],
  },
  {
    title: 'Utilisation des données',
    content: [
      'Fournir et améliorer nos services de jeu',
      'Maintenir la sécurité du serveur',
      'Détecter et prévenir la triche',
      'Modérer les comportements inappropriés',
      'Générer des statistiques anonymes',
    ],
  },
  {
    title: 'Conservation des données',
    content: 'Les données de jeu sont conservées tant que votre compte est actif sur le serveur. Les logs de connexion peuvent être conservés jusqu\'à 12 mois pour des raisons de sécurité. Après une période d\'inactivité prolongée, vos données peuvent être archivées ou supprimées.',
  },
  {
    title: 'Partage des données',
    content: 'Nous ne vendons pas vos données personnelles. Vos données peuvent être partagées uniquement avec les membres du staff pour les besoins de modération, ou si la loi l\'exige.',
  },
  {
    title: 'Sécurité',
    content: 'Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre l\'accès non autorisé, la modification, la divulgation ou la destruction.',
  },
  {
    title: 'Vos droits',
    content: [
      'Droit d\'accès à vos données personnelles',
      'Droit de rectification des données inexactes',
      'Droit à l\'effacement de vos données',
      'Droit de limitation du traitement',
      'Droit à la portabilité des données',
    ],
  },
  {
    title: 'Cookies',
    content: 'Notre site web peut utiliser des cookies techniques nécessaires au bon fonctionnement du site. Nous n\'utilisons pas de cookies de tracking ou publicitaires.',
  },
  {
    title: 'Mineurs',
    content: 'Nos services s\'adressent à un public général. Si vous êtes mineur, nous vous encourageons à informer vos parents ou tuteurs de votre utilisation de nos services.',
  },
  {
    title: 'Modifications',
    content: 'Cette politique peut être mise à jour occasionnellement. Nous vous informerons de tout changement significatif via notre Discord ou notre site web.',
  },
  {
    title: 'Contact',
    content: 'Pour toute question concernant cette politique de confidentialité ou vos données personnelles, contactez-nous via notre serveur Discord.',
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

export default function PrivacyPage() {
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-red-400 text-sm font-medium">Document légal</span>
          </div>

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-700 delay-100 relative ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-white">Politique de </span>
            <span
              className="text-red-500 relative"
              style={{ textShadow: '0 0 40px rgba(239, 68, 68, 0.5)' }}
            >
              Confidentialité
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
