import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'UTOPIA RPMC - Serveur Minecraft Post-Apocalyptique',
  description: 'Rejoignez UTOPIA RPMC, un serveur Minecraft post-apocalyptique unique. Survivez, construisez et dominez dans un monde ravagé.',
  keywords: ['minecraft', 'serveur', 'post-apocalyptique', 'survival', 'utopia rpmc'],
  icons: {
    icon: '/image/logo.png',
    apple: '/image/logo.png',
  },
  openGraph: {
    title: 'UTOPIA RPMC',
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
