import './globals.css'
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})
``
export const metadata: Metadata = {
  title: 'LifeOrb - Where Dreams Meet Reality',
  description: 'A sanctuary where human wisdom meets AI insight. Connect with kindred spirits, explore life possibilities, and nurture your dreams in a compassionate community.',
  keywords: 'life planning, goal setting, social network, AI simulation, life coaching, personal development, community, wellness, mindfulness',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${poppins.className} antialiased`}>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
