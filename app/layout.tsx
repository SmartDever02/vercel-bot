import { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import '@/app/globals.css'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import AuthContext from '@/app/context/AuthContext'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import Script from 'next/script'
import { getSession } from './actions'

export const metadata: Metadata = {
  title: {
    default: 'Next.js AI Chatbot',
    template: `%s - Next.js AI Chatbot`
  },
  description: 'An AI-powered chatbot template built with Next.js and Vercel.',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getSession()
  return (
    <html lang="en" suppressHydrationWarning>
      <head />

      <body
        className={cn(
          'font-sans antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <AuthContext session={session}>
          <Toaster />
          <Providers attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col min-h-screen">
              {/* @ts-ignore */}
              <Header />
              <main className="flex flex-col flex-1 bg-muted/50">
                {children}
              </main>
              <Script
                src="https://accounts.google.com/gsi/client"
                strategy="beforeInteractive"
              />
            </div>
            <TailwindIndicator />
          </Providers>
        </AuthContext>
      </body>
    </html>
  )
}
