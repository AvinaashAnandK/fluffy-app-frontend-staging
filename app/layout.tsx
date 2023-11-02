import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'

const fontMain = Lato({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Fluffy',
  description: 'Discovery platform for pretrained OS AI models',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "bg-secondary",
        fontMain.className
        )}>
          <ThemeProvider attribute='class' defaultTheme='dark'>
          {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
