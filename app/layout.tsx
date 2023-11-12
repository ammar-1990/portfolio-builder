import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ModalProvider from '@/providers/modal-provider'
import { Toaster } from "@/components/ui/toaster"
import Refresher from '@/providers/refresher'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio Builder',
  description: 'build your portfolio with simple steps',
}

export const runtime = 'edge'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className,'myScroll ')}>
     
        <ModalProvider />
        {children}
        <Toaster />
       
        </body>
    </html>
  )
}
