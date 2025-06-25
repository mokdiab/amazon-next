'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import useColorStore from '@/hooks/use-color-store'

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  const { color, updateCssVariables } = useColorStore(theme)

  React.useEffect(() => {
    updateCssVariables()
  }, [theme, color, updateCssVariables])

  return <>{children}</>
}
