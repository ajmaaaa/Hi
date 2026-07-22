import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Meyky Ajmariadi - Portfolio',
  description:
    'Portfolio personal Meyky Ajmariadi, Mahasiswa teknik informatika yang ingin mencapai tujuan nya.',
  keywords: ['portfolio', 'meyky ajmariadi', 'teknik informatika', 'design', 'automation'],
  openGraph: {
    title: 'Meyky Ajmariadi - Portfolio',
    description: 'Mahasiswa teknik informatika yang ingin mencapai tujuan nya.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        {/* Google Fonts — loaded at runtime, no build-time network call */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredericka+the+Great&family=IM+Fell+Great+Primer:ital@0;1&family=Cormorant+Garamond:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-black antialiased">{children}</body>
    </html>
  )
}
