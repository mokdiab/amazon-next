import * as React from 'react'
import { Button } from '@/components/ui/button'

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void> | void
  loadingText?: string
  spinner?: React.ReactNode
}

export const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  LoadingButtonProps
>(
  (
    {
      onClick,
      disabled,
      children,
      loadingText = 'Loading...',
      spinner,
      ...props
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = React.useState(false)

    const handleClick = async (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (!onClick) return
      if (isLoading) return
      const maybePromise = onClick(e)
      if (maybePromise && typeof maybePromise.then === 'function') {
        try {
          setIsLoading(true)
          await maybePromise
        } finally {
          setIsLoading(false)
        }
      }
    }

    return (
      <Button
        ref={ref}
        disabled={disabled || isLoading}
        onClick={handleClick}
        className={['cursor-pointer', props.className].filter(Boolean).join(' ')}
        {...props}
      >
        {isLoading &&
          (spinner || <span className='animate-spin mr-2'>⏳</span>)}
        {isLoading ? loadingText : children}
      </Button>
    )
  }
)
LoadingButton.displayName = 'LoadingButton'
