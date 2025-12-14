'use client'

import { useState, useEffect, useRef } from 'react'

interface GitHubRelease {
  tag_name: string
  name: string
  published_at: string
  assets: {
    name: string
    browser_download_url: string
    size: number
  }[]
}

// Animated section header
function PageHeader({ isVisible }: { isVisible: boolean }) {
  return (
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span className="text-red-400 text-sm font-medium">Téléchargement officiel</span>
      </div>

      <h1
        className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-700 delay-100 relative ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <span className="text-white">Télécharger le </span>
        <span
          className="text-red-500 relative"
          style={{
            textShadow: '0 0 40px rgba(239, 68, 68, 0.5)',
          }}
        >
          Launcher
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
        Notre launcher te permet de rejoindre le serveur en un clic avec tous les mods installés automatiquement.
      </p>
    </div>
  )
}

// Feature item with animation
function FeatureItem({ children, delay, isVisible }: { children: React.ReactNode; delay: number; isVisible: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 text-gray-300 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      {children}
    </div>
  )
}

// Video step data
const installationSteps = [
  {
    number: 1,
    title: "Télécharge",
    description: "Clique sur le bouton ci-dessus pour télécharger le launcher",
    videoSrc: "/Video/Download/Step1.mp4"
  },
  {
    number: 2,
    title: "Installe",
    description: "Lance le fichier .exe et suis les instructions",
    videoSrc: "/Video/Download/Step2.mp4"
  },
  {
    number: 3,
    title: "Joue !",
    description: "Connecte-toi avec ton compte et rejoins l'aventure",
    videoSrc: "/Video/Download/Step3.mp4"
  }
]

// Installation steps with chained videos
function InstallationSteps({ isVisible }: { isVisible: boolean }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const handleVideoEnd = () => {
    // Move to next video
    if (currentStep < installationSteps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      // Loop back to first video
      setCurrentStep(0)
    }
  }

  const handleStepClick = (index: number) => {
    setCurrentStep(index)
    setIsPlaying(true)
  }

  const handlePlayPause = () => {
    const video = videoRefs.current[currentStep]
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Auto-play current video when step changes
  useEffect(() => {
    const video = videoRefs.current[currentStep]
    if (video && isPlaying) {
      video.currentTime = 0
      video.play()
    }
  }, [currentStep, isPlaying])

  // Start playing on first mount with slight delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(true)
      const video = videoRefs.current[0]
      if (video) {
        video.play()
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      {/* Main video display */}
      <div
        className={`relative rounded-2xl overflow-hidden border border-gray-800/50 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '600ms' }}
      >
        {/* Video glow */}
        <div className="absolute -inset-2 bg-red-600/10 rounded-2xl blur-2xl" />

        {/* Video container */}
        <div className="relative bg-gray-900 aspect-video">
          {installationSteps.map((step, index) => (
            <video
              key={index}
              ref={el => { videoRefs.current[index] = el }}
              className={`absolute inset-0 w-full h-full object-contain bg-gray-900 transition-opacity duration-500 ${
                currentStep === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              muted
              playsInline
              onEnded={handleVideoEnd}
            >
              <source src={step.videoSrc} type="video/mp4" />
            </video>
          ))}

          {/* Play/Pause overlay button */}
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 w-full h-full z-20 flex items-center justify-center group"
          >
            <div className={`w-20 h-20 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
              isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
            }`}>
              {isPlaying ? (
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </div>
          </button>

          {/* Current step badge */}
          <div className="absolute top-4 left-4 z-20">
            <div className="flex items-center gap-3 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-sm">
                {installationSteps[currentStep].number}
              </div>
              <span className="text-white font-semibold">{installationSteps[currentStep].title}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/40 backdrop-blur-sm p-4">
            <p className="text-gray-300 text-sm mb-3 text-center">{installationSteps[currentStep].description}</p>
            <div className="flex gap-2">
              {installationSteps.map((_, index) => (
                <div
                  key={index}
                  className="flex-1 h-1 rounded-full overflow-hidden bg-gray-700 cursor-pointer"
                  onClick={() => handleStepClick(index)}
                >
                  <div
                    className={`h-full bg-red-600 transition-all duration-300 ${
                      index < currentStep ? 'w-full' : index === currentStep ? 'w-full animate-pulse' : 'w-0'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Step selector thumbnails */}
      <div
        className={`grid grid-cols-3 gap-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '700ms' }}
      >
        {installationSteps.map((step, index) => (
          <button
            key={index}
            onClick={() => handleStepClick(index)}
            className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              currentStep === index
                ? 'border-red-600 shadow-lg shadow-red-600/30 scale-105'
                : 'border-gray-800/50 hover:border-gray-700'
            }`}
          >
            {/* Thumbnail video (frozen at start) */}
            <video
              className="w-full aspect-video object-cover"
              muted
              playsInline
            >
              <source src={step.videoSrc} type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className={`absolute inset-0 transition-all duration-300 ${
              currentStep === index ? 'bg-red-600/10' : 'bg-black/50'
            }`}>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  currentStep === index ? 'bg-red-600' : 'bg-gray-800/80'
                }`}>
                  <span className="text-white font-bold">{step.number}</span>
                </div>
                <p className={`font-semibold text-sm transition-colors duration-300 ${
                  currentStep === index ? 'text-red-400' : 'text-white'
                }`}>
                  {step.title}
                </p>
              </div>
            </div>

            {/* Active indicator */}
            {currentStep === index && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function DownloadPage() {
  const [release, setRelease] = useState<GitHubRelease | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [cardHovered, setCardHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)

    async function fetchLatestRelease() {
      try {
        const response = await fetch(
          'https://api.github.com/repos/Mathew3585/los-nachos-launcher/releases/latest'
        )
        if (!response.ok) {
          throw new Error('Impossible de récupérer la dernière version')
        }
        const data = await response.json()
        setRelease(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      } finally {
        setLoading(false)
      }
    }

    fetchLatestRelease()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePosition({ x, y })
  }

  const getExeAsset = () => {
    if (!release) return null
    return release.assets.find(
      (asset) => asset.name.endsWith('.exe') || asset.name.endsWith('.msi')
    )
  }

  const exeAsset = getExeAsset()

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-24 px-4 relative overflow-hidden">
      {/* Global CSS for animations */}
      <style jsx global>{`
        @keyframes orbit {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(35px) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(35px) rotate(-360deg);
          }
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
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
      `}</style>

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
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

        {/* Floating particles - using deterministic values to avoid hydration mismatch */}
        {[
          { left: 10, top: 20, duration: 5, delay: 0.2 },
          { left: 25, top: 60, duration: 6, delay: 0.8 },
          { left: 40, top: 30, duration: 4.5, delay: 1.2 },
          { left: 55, top: 70, duration: 7, delay: 0.5 },
          { left: 70, top: 15, duration: 5.5, delay: 1.5 },
          { left: 85, top: 50, duration: 6.5, delay: 0.3 },
          { left: 15, top: 80, duration: 4, delay: 1.8 },
          { left: 45, top: 45, duration: 7.5, delay: 0.7 },
          { left: 60, top: 85, duration: 5, delay: 1.1 },
          { left: 80, top: 35, duration: 6, delay: 0.4 },
          { left: 30, top: 55, duration: 4.8, delay: 1.6 },
          { left: 50, top: 10, duration: 5.2, delay: 0.9 },
          { left: 75, top: 75, duration: 6.8, delay: 1.3 },
          { left: 20, top: 40, duration: 4.3, delay: 0.6 },
          { left: 90, top: 25, duration: 5.7, delay: 1.0 },
        ].map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-500/30 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationName: 'float-particle',
              animationDuration: `${particle.duration}s`,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <PageHeader isVisible={isVisible} />

        {/* Main Download Card */}
        <div
          ref={cardRef}
          className={`relative mb-12 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          onMouseEnter={() => setCardHovered(true)}
          onMouseLeave={() => setCardHovered(false)}
          onMouseMove={handleMouseMove}
        >
          {/* Animated glow border */}
          <div
            className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-red-600 via-orange-500 to-red-600 opacity-0 blur-sm transition-opacity duration-500 ${
              cardHovered ? 'opacity-50' : ''
            }`}
            style={{
              backgroundSize: '200% 100%',
              animation: cardHovered ? 'gradient-shift 2s linear infinite' : undefined,
            }}
          />

          {/* Mouse follow glow */}
          <div
            className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
              cardHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(239, 68, 68, 0.15) 0%, transparent 50%)`,
            }}
          />

          <div className="relative bg-[#0d0d0d]/90 backdrop-blur-xl border border-red-900/30 rounded-2xl overflow-hidden">
            {/* Scan line effect */}
            <div
              className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-300 ${
                cardHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent"
                style={{
                  animation: cardHovered ? 'scan-line 2s linear infinite' : undefined,
                  top: '0%',
                }}
              />
            </div>

            {/* Card Header */}
            <div className="relative bg-gradient-to-r from-red-900/40 to-red-950/40 px-8 py-6 border-b border-red-900/30">
              <div className="flex items-center gap-4">
                {/* Windows Logo with glow */}
                <div className="relative">
                  <div
                    className={`absolute inset-0 bg-[#0078D4] rounded-xl blur-xl transition-opacity duration-300 ${
                      cardHovered ? 'opacity-50' : 'opacity-0'
                    }`}
                  />
                  <div className="relative w-16 h-16 bg-[#0078D4] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
                    </svg>
                  </div>
                </div>

                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-white">Los Nachos Launcher</h2>
                  <p className="text-gray-400">Pour Windows 10/11</p>
                </div>

                {release && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-600 rounded-full blur-md opacity-50" />
                    <span className="relative bg-gradient-to-r from-red-600 to-red-700 text-white text-sm px-4 py-1.5 rounded-full font-medium border border-red-500/30">
                      {release.tag_name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-8">
              {loading ? (
                <div className="text-center py-12">
                  <div className="relative w-16 h-16 mx-auto mb-6">
                    <div className="absolute inset-0 border-4 border-red-600/20 rounded-full" />
                    <div className="absolute inset-0 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                  <p className="text-gray-400">Récupération de la dernière version...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-600/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-red-400 mb-4">{error}</p>
                  <a
                    href="https://github.com/Mathew3585/los-nachos-launcher/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-400 underline transition-colors"
                  >
                    Télécharger directement sur GitHub
                  </a>
                </div>
              ) : (
                <>
                  {/* Features list */}
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <FeatureItem delay={400} isVisible={isVisible}>
                      Installation automatique des mods
                    </FeatureItem>
                    <FeatureItem delay={500} isVisible={isVisible}>
                      Mises à jour automatiques
                    </FeatureItem>
                    <FeatureItem delay={600} isVisible={isVisible}>
                      Connexion en un clic
                    </FeatureItem>
                    <FeatureItem delay={700} isVisible={isVisible}>
                      Optimisé pour les performances
                    </FeatureItem>
                  </div>

                  {/* Download Button */}
                  {exeAsset ? (
                    <a
                      href={exeAsset.browser_download_url}
                      className="group relative block w-full overflow-hidden rounded-xl"
                    >
                      {/* Button glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />

                      <div className="relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-4 font-bold text-lg transition-all">
                        {/* Shine effect */}
                        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                        <span className="relative flex items-center justify-center gap-3">
                          <svg className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Télécharger pour Windows
                          <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </div>
                    </a>
                  ) : (
                    <a
                      href="https://github.com/Mathew3585/los-nachos-launcher/releases"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-4 rounded-xl font-bold text-lg transition-all text-center"
                    >
                      Voir sur GitHub
                    </a>
                  )}

                  {/* File info */}
                  {exeAsset && (
                    <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {exeAsset.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                        </svg>
                        {(exeAsset.size / 1024 / 1024).toFixed(1)} MB
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* GitHub Link */}
        <div
          className={`text-center mb-16 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a
            href="https://github.com/Mathew3585/los-nachos-launcher/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            <span className="relative">
              Voir toutes les versions sur GitHub
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </span>
          </a>
        </div>

        {/* Installation Steps */}
        <div
          className={`relative transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Card glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-900/20 rounded-2xl blur-xl" />

          <div className="relative bg-[#0d0d0d]/90 backdrop-blur-xl border border-red-900/30 rounded-2xl p-8">
            {/* Header */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600/30 to-red-900/30 border border-red-600/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Étapes d'installation</h3>
            </div>

            {/* Video Steps */}
            <InstallationSteps isVisible={isVisible} />
          </div>
        </div>
      </div>
    </div>
  )
}
