'use client'
import React, { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface RatingInputProps {
  value: number
  onChange: (value: number) => void
  size?: number
  disabled?: boolean
  'aria-labelledby'?: string
}

export default function RatingInput({
  value = 0,
  onChange,
  size = 6,
  disabled = false,
  'aria-labelledby': ariaLabelledBy,
}: RatingInputProps) {
  const [hoverRating, setHoverRating] = useState(0)
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  const displayValue = hoverRating || value

  const handleClick = (val: number) => {
    if (!disabled) {
      onChange(val)
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (disabled) return

    if (e.key === 'ArrowRight' && index < 4) {
      e.preventDefault()
      setFocusedIndex(index + 1)
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault()
      setFocusedIndex(index - 1)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick(index + 1)
    }
  }

  return (
    <div
      className={`flex items-center gap-1`}
      onMouseLeave={() => setHoverRating(0)}
      role='radiogroup'
      aria-labelledby={ariaLabelledBy}
      aria-label={!ariaLabelledBy ? 'Product rating' : undefined}
    >
      {[1, 2, 3, 4, 5].map((starValue, index) => {
        const isActive = starValue <= displayValue
        return (
          <Button
            key={`star-${starValue}`}
            variant={'ghost'}
            type='button'
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => setHoverRating(starValue)}
            onFocus={() => setFocusedIndex(index)}
            className={`p-1 focus:outline-none focus:ring-2 focus:ring-primary rounded-full ${
              disabled ? 'cursor-not-allowed' : 'cursor-pointer'
            } `}
            role='radio'
            aria-checked={starValue === value ? 'true' : 'false'}
            aria-label={`Rate ${starValue} out of 5`}
            disabled={disabled}
            tabIndex={
              focusedIndex === null
                ? starValue === value
                  ? 0
                  : -1
                : focusedIndex === index
                  ? 0
                  : -1
            }
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            <Star
              className={`w-${size} h-${size} transition-colors duration-200 ${
                isActive ? 'text-yellow-500' : 'text-gray-300'
              }`}
              fill={isActive ? 'currentColor' : 'none'}
            />
          </Button>
        )
      })}
    </div>
  )
}
