'use client'

import { useTheme as useNextTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export default function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant='outline'
        size='icon'
        className='rounded-full h-10 w-10'
        aria-hidden
      />
    )
  }

  const resolvedTheme = theme === 'system' ? systemTheme : theme

  return (
    <Button
      variant='outline'
      size='icon'
      className='rounded-full transition-all duration-300 hover:scale-110'
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? (
        <Moon className='h-5 w-5' />
      ) : (
        <Sun className='h-5 w-5' />
      )}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
