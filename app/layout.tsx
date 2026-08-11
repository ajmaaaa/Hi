import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Meyky Ajmariadi - Digital Product Builder',
  description:
    'Portfolio of Meyky Ajmariadi, a Computer Science undergraduate building mobile applications, interactive web experiences, and automation workflows.',
  keywords: ['portfolio', 'Meyky Ajmariadi', 'digital product builder', 'mobile development', 'web development', 'product prototyping', 'automation'],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Meyky Ajmariadi - Digital Product Builder',
    description: 'Mobile applications, interactive web experiences, and automation workflows built from original ideas.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
