'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { FileSearch, Home } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-background p-4'>
      <div className='p-8 rounded-lg border border-muted bg-muted/10 shadow-lg w-full max-w-md text-center space-y-6'>
        <div className='flex flex-col items-center'>
          <div className='relative mb-6'>
            <div className='absolute -inset-4 rounded-full bg-destructive/10 animate-pulse'></div>
            <FileSearch className='h-12 w-12 text-destructive relative' />
          </div>
          <h1 className='text-3xl font-bold text-foreground mb-2'>
            404 - Page Not Found
          </h1>
          <p className='text-muted-foreground'>
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <Button asChild variant='default' className='gap-2'>
            <Link href='/'>
              <Home className='h-4 w-4' />
              Back to home
            </Link>
          </Button>
          <Button asChild variant='outline' className='gap-2'>
            <Link href='/contact'>Report broken link</Link>
          </Button>
        </div>

        <p className='text-xs text-muted-foreground mt-6'>
          Or check if you typed the correct URL
        </p>
      </div>
    </div>
  )
}
