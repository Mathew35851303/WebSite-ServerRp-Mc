'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface FeatureCardProps {
  title: string
  subtitle: string
  description: string
  imageSrc: string
  imageAlt: string
  reverse?: boolean
  index: number
  icon: React.ReactNode
  tag: string
}

export default function FeatureCard({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
  index,
  icon,
  tag,
}: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Intersection Observer for scroll animation
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

  // Mouse tracking for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePosition({ x, y })
  }

  const formattedIndex = String(index + 1).padStart(2, '0')

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-1000 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : `opacity-0 ${reverse ? 'translate-x-12' : '-translate-x-12'} translate-y-8`
      }`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePosition({ x: 0, y: 0 })
      }}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`
          : undefined,
        transitionProperty: 'transform, opacity',
      }}
    >
      {/* Animated glow border */}
      <div
        className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-red-600 via-orange-500 to-red-600 opacity-0 blur-sm transition-opacity duration-500 ${
          isHovered ? 'opacity-70' : ''
        }`}
        style={{
          backgroundSize: '200% 100%',
          animation: isHovered ? 'gradient-shift 2s linear infinite' : undefined,
        }}
      />

      {/* Card container */}
      <div className="relative bg-[#0d0d0d]/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-red-900/30 hover:border-red-500/50 transition-all duration-500">
        {/* Scan line effect */}
        <div
          className={`absolute inset-0 pointer-events-none overflow-hidden ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        >
          <div
            className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
            style={{
              animation: isHovered ? 'scan-line 2s linear infinite' : undefined,
              top: '0%',
            }}
          />
        </div>

        {/* Particle effect background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-red-500/30 rounded-full transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationName: isHovered ? 'float-particle' : 'none',
                animationDuration: `${2 + i * 0.3}s`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Red ambient glow */}
        <div
          className={`absolute inset-0 bg-gradient-radial from-red-600/10 via-transparent to-transparent transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: isHovered
              ? `radial-gradient(circle at ${50 + mousePosition.x * 50}% ${50 + mousePosition.y * 50}%, rgba(220, 38, 38, 0.15) 0%, transparent 50%)`
              : undefined,
          }}
        />

        {/* Content wrapper */}
        <div className={`relative flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 p-8 lg:p-10`}>
          {/* Text content */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            {/* Number and tag row */}
            <div className={`flex items-center gap-4 ${reverse ? 'lg:justify-start' : ''} justify-center lg:justify-start`}>
              {/* Neon number */}
              <span
                className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-red-600"
                style={{
                  textShadow: isHovered ? '0 0 30px rgba(239, 68, 68, 0.5)' : undefined,
                  filter: isHovered ? 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.5))' : undefined,
                }}
              >
                {formattedIndex}
              </span>

              {/* Tag badge */}
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-red-600/20 text-red-400 rounded-full border border-red-600/30">
                {tag}
              </span>
            </div>

            {/* Icon and title */}
            <div className="space-y-3">
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-red-600/20 to-red-900/20 border border-red-600/30 text-red-500 transition-all duration-500 ${
                  isHovered ? 'scale-110 border-red-500/60 shadow-lg shadow-red-600/20' : ''
                }`}
              >
                {icon}
              </div>
              <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">
                {title}
              </p>
              <h3 className="text-2xl lg:text-3xl font-bold text-white">
                <span className="text-red-500">{subtitle}</span>
              </h3>
            </div>

            {/* Description */}
            <p className="text-gray-400 leading-relaxed text-base">
              {description}
            </p>

            {/* Decorative line */}
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <div className={`h-[2px] bg-gradient-to-r from-red-600 to-transparent transition-all duration-500 ${isHovered ? 'w-20' : 'w-12'}`} />
              <div className="w-2 h-2 rounded-full bg-red-600/50" />
            </div>
          </div>

          {/* Image container */}
          <div className="relative flex-1 w-full max-w-lg group/image">
            {/* Animated corner borders */}
            <div className="absolute -inset-2 rounded-xl pointer-events-none">
              {/* Top-left corner */}
              <div
                className={`absolute top-0 left-0 border-t-2 border-l-2 border-red-500 rounded-tl-xl transition-all duration-500 ${
                  isHovered ? 'w-16 h-16 opacity-100' : 'w-10 h-10 opacity-50'
                }`}
              />
              {/* Top-right corner */}
              <div
                className={`absolute top-0 right-0 border-t-2 border-r-2 border-red-500 rounded-tr-xl transition-all duration-500 ${
                  isHovered ? 'w-16 h-16 opacity-100' : 'w-10 h-10 opacity-50'
                }`}
              />
              {/* Bottom-left corner */}
              <div
                className={`absolute bottom-0 left-0 border-b-2 border-l-2 border-red-500 rounded-bl-xl transition-all duration-500 ${
                  isHovered ? 'w-16 h-16 opacity-100' : 'w-10 h-10 opacity-50'
                }`}
              />
              {/* Bottom-right corner */}
              <div
                className={`absolute bottom-0 right-0 border-b-2 border-r-2 border-red-500 rounded-br-xl transition-all duration-500 ${
                  isHovered ? 'w-16 h-16 opacity-100' : 'w-10 h-10 opacity-50'
                }`}
              />
            </div>

            {/* Image with parallax effect */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-[#1a1a1a]">
              <div
                className="absolute inset-0 transition-transform duration-300"
                style={{
                  transform: isHovered
                    ? `scale(1.1) translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`
                    : 'scale(1)',
                }}
              >
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-60" />

              {/* Vignette effect */}
              <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]" />

              {/* Glitch effect on hover */}
              <div
                className={`absolute inset-0 mix-blend-overlay transition-opacity duration-200 ${isHovered ? 'opacity-30' : 'opacity-0'}`}
                style={{
                  background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom accent line with animation */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-transparent via-red-500 to-transparent transition-all duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-30'
            }`}
            style={{
              transform: isHovered ? 'translateX(0)' : 'translateX(-100%)',
              animation: isHovered ? 'slide-shine 2s ease-in-out infinite' : undefined,
            }}
          />
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        @keyframes scan-line {
          0% { top: -2px; }
          100% { top: 100%; }
        }

        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 0.8; }
        }

        @keyframes slide-shine {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
