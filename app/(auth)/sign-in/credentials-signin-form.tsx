'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { redirect, useSearchParams } from 'next/navigation'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { IUserSignIn } from '@/types'
import { signInWithCredentials } from '@/lib/actions/user.actions'
import { UserSignInSchema } from '@/lib/validator'
import { APP_NAME } from '@/lib/constants'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export default function CredentialsSignInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const signInDefaultValues =
    process.env.NODE_ENV === 'development'
      ? {
          email: 'admin@example.com',
          password: 'Diab123',
        }
      : {
          email: '',
          password: '',
        }
  const form = useForm<IUserSignIn>({
    resolver: zodResolver(UserSignInSchema),
    defaultValues: signInDefaultValues,
  })

  const onSubmit = async (data: IUserSignIn) => {
    setIsLoading(true)
    try {
      await signInWithCredentials(data)
      redirect(callbackUrl)
    } catch (error) {
      if (isRedirectError(error)) throw error
      toast.error('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }
  const { control, handleSubmit } = form
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <input type='hidden' name='callbackUrl' value={callbackUrl} />

        <FormField
          control={control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter email address'
                  {...field}
                  autoComplete='username'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter password'
                    {...field}
                    autoComplete='current-password'
                  />
                  <button
                    type='button'
                    className='absolute right-2 top-1/2 -translate-y-1/2'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-center justify-between'>
          <Button type='submit' disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
          <Link href='/forgot-password' className='text-sm text-primary'>
            Forgot password?
          </Link>
        </div>

        <div className='text-sm text-muted-foreground'>
          By signing in, you agree to {APP_NAME}&apos;s{' '}
          <Link href='/page/conditions-of-use' className='hover:underline'>
            Conditions of Use
          </Link>{' '}
          and{' '}
          <Link href='/page/privacy-policy' className='hover:underline'>
            Privacy Notice
          </Link>
          .
        </div>
      </form>
    </Form>
  )
}
