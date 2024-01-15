import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './../globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex items-center justify-center min-h-screen w-full bg-dotted-pattern bg-cover bg-fixed bg-center bg-black'>
        {children}
    </div>
  )
}
