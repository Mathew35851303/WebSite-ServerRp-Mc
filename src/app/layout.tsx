import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'LOS NACHOS CHIPIES - Serveur Minecraft Post-Apocalyptique',
  description: 'Rejoignez LOS NACHOS CHIPIES, un serveur Minecraft post-apocalyptique unique. Survivez, construisez et dominez dans un monde ravagé.',
  keywords: ['minecraft', 'serveur', 'post-apocalyptique', 'survival', 'los nachos chipies'],
  openGraph: {
    title: 'LOS NACHOS CHIPIES',
    description: 'Serveur Minecraft Post-Apocalyptique',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-[#0a0a0a] text-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
