import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Chocoloop | Canal de Televisión Experimental 24/7',
  description: 'Una experiencia visual continua de relevancia incuestionable. Transmitiendo 24 horas al día, porque alguien tiene que hacerlo.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/sandwich.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/sandwich.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/sandwich.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/sandwich.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
