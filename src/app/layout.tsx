import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LifeOrb - Revolutionize Your Life Planning',
  description: 'Connect with others on similar paths, simulate life scenarios with AI, and achieve your goals through human collaboration.',
  keywords: 'life planning, goal setting, social network, AI simulation, life coaching, personal development',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
