'use client'

import { useEffect, useState } from 'react'

export function PasswordStrength({ password }: { password: string }) {
  const [strength, setStrength] = useState<{
    score: number
    label: string
    color: string
  }>({ score: 0, label: 'Weak', color: 'bg-red-500' })

  useEffect(() => {
    const calculateStrength = () => {
      let score = 0

      // Length check
      if (password.length >= 8) score++
      if (password.length >= 12) score++

      // Character variety checks
      if (/[A-Z]/.test(password)) score++
      if (/[a-z]/.test(password)) score++
      if (/[0-9]/.test(password)) score++
      if (/[^A-Za-z0-9]/.test(password)) score++

      // Determine strength level
      let label = 'Weak'
      let color = 'bg-red-500'

      if (score >= 5) {
        label = 'Strong'
        color = 'bg-green-500'
      } else if (score >= 3) {
        label = 'Medium'
        color = 'bg-yellow-500'
      }

      setStrength({ score, label, color })
    }

    calculateStrength()
  }, [password])

  return (
    <div className='mt-2'>
      <div className='flex justify-between mb-1'>
        <span className='text-sm'>Password strength: {strength.label}</span>
      </div>
      <div className='w-full bg-gray-200 rounded-full h-2'>
        <div
          className={`h-2 rounded-full ${strength.color}`}
          style={{ width: `${(strength.score / 6) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}
