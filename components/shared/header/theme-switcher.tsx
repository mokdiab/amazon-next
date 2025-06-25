'use client'

import { ChevronDownIcon, Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import useColorStore from '@/hooks/use-color-store'
import useIsMounted from '@/hooks/use-is-mounted'
import { useEffect } from 'react'

export default function ThemeSwitcher() {
  const { theme, systemTheme, setTheme } = useTheme()
  const { availableColors, color, setColor } = useColorStore(theme)
  const isMounted = useIsMounted()

  // Update color when theme changes
  useEffect(() => {
    if (isMounted) {
      setColor(color.name, false) // Update color without changing the theme
    }
  }, [theme, isMounted])

  const changeTheme = (value: string) => {
    setTheme(value)
  }

  const getCurrentThemeIcon = () => {
    if (!isMounted) return <Monitor className='h-4 w-4' />

    if (theme === 'system') {
      return systemTheme === 'dark' ? (
        <Moon className='h-4 w-4' />
      ) : (
        <Sun className='h-4 w-4' />
      )
    }
    return theme === 'dark' ? (
      <Moon className='h-4 w-4' />
    ) : (
      <Sun className='h-4 w-4' />
    )
  }

  const getCurrentThemeLabel = () => {
    if (!isMounted) return 'System'

    if (theme === 'system') {
      return `System (${systemTheme})`
    }
    return theme === 'dark' ? 'Dark' : 'Light'
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='header-button h-[41px]'>
        <div className='flex items-center gap-1'>
          {getCurrentThemeIcon()}
          {getCurrentThemeLabel()}
          <ChevronDownIcon className='h-4 w-4' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end'>
        <DropdownMenuLabel>Theme Preference</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={theme} onValueChange={changeTheme}>
          <DropdownMenuRadioItem value='system'>
            <Monitor className='h-4 w-4 mr-1' /> System
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='light'>
            <Sun className='h-4 w-4 mr-1' /> Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='dark'>
            <Moon className='h-4 w-4 mr-1' /> Dark
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Accent Color</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={color.name}
          onValueChange={(value) => setColor(value, true)}
        >
          {availableColors.map((c) => (
            <DropdownMenuRadioItem key={c.name} value={c.name}>
              <div
                style={{ backgroundColor: `hsl(${c.root['--primary']})` }}
                className='h-4 w-4 mr-1 rounded-full border border-foreground/20'
              />
              <span className='capitalize'>{c.name}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
