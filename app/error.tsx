'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-background p-4'>
      <div className='p-8 rounded-lg border border-destructive/20 bg-destructive/5 shadow-lg w-full max-w-md text-center space-y-6'>
        <div className='flex flex-col items-center'>
          <AlertTriangle className='h-12 w-12 text-destructive mb-4' />
          <h1 className='text-3xl font-bold text-foreground mb-2'>
            Oops! Something went wrong
          </h1>
          <p className='text-destructive font-medium'>{error.message}</p>
          {error.digest && (
            <p className='text-muted-foreground text-xs mt-2'>
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <Button
            variant='outline'
            className='gap-2'
            onClick={() => reset()}
            aria-label='Try again'
          >
            <RefreshCw className='h-4 w-4' />
            Try again
          </Button>
          <Button
            variant='default'
            className='gap-2'
            onClick={() => (window.location.href = '/')}
            aria-label='Back to home'
          >
            <Home className='h-4 w-4' />
            Back To Home
          </Button>
        </div>
      </div>
    </div>
  )
}
