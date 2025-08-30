import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Levant Digital',
  description: 'Formulário de Briefing da Levant Digital',
  openGraph: {
    title: 'Levant Digital',
    description: 'Formulário de Briefing da Levant Digital',
    url: 'https://levant.digital',
    siteName: 'Levant Digital',
    images: [
      {
        url: '/placeholder-logo.png',
        width: 800,
        height: 600,
        alt: 'Levant Digital Logo',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Levant Digital',
    description: 'Formulário de Briefing da Levant Digital',
    images: ['/placeholder-logo.png'],
    site: '@levantdigital',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
