// app/(root)/layout.tsx
import Header from '@/components/shared/header'
import Footer from '@/components/shared/Footer'
import { Toaster } from 'sonner'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1 flex flex-col p-4'>{children}</main>
      <Toaster />
      <Footer />
    </div>
  )
}
