'use client'

import { useEffect, useState } from 'react'

export function ProgressLoading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='w-full h-1.5 bg-gray-200 rounded-full'>
      <div
        className='h-full bg-primary rounded-full transition-all duration-300'
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}
