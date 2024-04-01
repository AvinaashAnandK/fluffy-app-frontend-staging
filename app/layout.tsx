import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import { ModalProvider } from '@/components/globalModals/modal-provider'
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from '@/components/ui/tooltip';
import { RepoChatHistoryProvider } from '@/lib/hooks/use-repochathistory'
import { AI } from "./action";

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
      <body className={cn("bg-black",fontMain.className)}>
      <ModalProvider/>
          <ThemeProvider attribute='class' defaultTheme='dark'>
          <RepoChatHistoryProvider>
          <TooltipProvider>
            <AI>
            {children}
            </AI>
          </TooltipProvider>
          <Toaster/>
          </RepoChatHistoryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
