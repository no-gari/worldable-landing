import type { Metadata } from 'next'
import { Manrope, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

export const metadata: Metadata = {
  title: 'Worldable — Build World Mini Apps from a sentence',
  description: 'Worldable turns plain English into a production-ready World Mini App — with World ID, Wallet Auth, and Pay wired in.',
  openGraph: {
    title: 'Worldable — Build World Mini Apps from a sentence',
    description: 'Worldable turns plain English into a production-ready World Mini App — with World ID, Wallet Auth, and Pay wired in.',
    url: 'https://worldable.app',
    siteName: 'Worldable',

    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${jetbrains.variable}`}>
        {children}
      </body>
    </html>
  )
}
