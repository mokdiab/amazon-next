import { useEffect, useState } from 'react'

export default function useDeviceType() {
  // Initialize with a function to avoid SSR issues
  const [deviceType, setDeviceType] = useState(() => {
    // Only access window if it's available (client-side)
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768 ? 'mobile' : 'desktop'
    }
    return 'unknown'
  })

  useEffect(() => {
    // Handler function
    const handleWindowSize = () => {
      const width = window.innerWidth
      setDeviceType(width <= 768 ? 'mobile' : 'desktop')
    }

    // Initial check
    handleWindowSize()

    // Add event listener
    window.addEventListener('resize', handleWindowSize)

    // Cleanup
    return () => window.removeEventListener('resize', handleWindowSize)
  }, [])

  return deviceType
}
