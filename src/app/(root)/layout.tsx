import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './../globals.css'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'

export const metadata: Metadata = {
  title: 'Evently',
  description: 'Create Events',
  icons: {
    icon: '/assets/images/logo.svg'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex min-h-screen flex-col items-center justify-between'>
      <Header />
      <section className='flex-1 w-full'>{children}</section>
      <Footer />
    </div>
  )
}
