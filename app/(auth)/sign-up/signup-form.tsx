'use client'
import { redirect, useSearchParams } from 'next/navigation'

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
import { useForm } from 'react-hook-form'
import { IUserSignUp } from '@/types'
import { registerUser, signInWithCredentials } from '@/lib/actions/user.actions'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserSignUpSchema } from '@/lib/validator'
import { Separator } from '@/components/ui/separator'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { APP_NAME } from '@/lib/constants'
import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { PasswordStrength } from '@/components/shared/password-strength'
const signUpDefaultValues =
  process.env.NODE_ENV === 'development'
    ? {
        name: 'Mohamed Diab',
        email: 'mohammedkamal5@yahoo.com',
        password: 'Diab@1234',
        confirmPassword: 'Diab@1234',
      }
    : {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      }
export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  })
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const form = useForm<IUserSignUp>({
    resolver: zodResolver(UserSignUpSchema),
    defaultValues: signUpDefaultValues,
  })
  const { control, handleSubmit } = form

  const onSubmit = async (data: IUserSignUp) => {
    setIsLoading(true)
    try {
      const res = await registerUser(data)
      if (!res.success) {
        toast.error(res.error)
        return
      }
      await signInWithCredentials({
        email: data.email,
        password: data.password,
      })

      redirect(callbackUrl)
    } catch (error) {
      if (isRedirectError(error)) {
        throw error
      }
      toast.error('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='hidden' name='callbackUrl' value={callbackUrl} />
        <div className='space-y-6'>
          <FormField
            control={control}
            name='name'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter name address' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='email'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Enter email address' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='password'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showPassword.password ? 'text' : 'password'}
                      placeholder='Enter password'
                      {...field}
                    />
                    <button
                      className='absolute right-2 top-1/2 -translate-y-1/2'
                      type='button'
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          password: !prev.password,
                        }))
                      }
                    >
                      {showPassword.password ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
                <PasswordStrength password={field.value} />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showPassword.confirmPassword ? 'text' : 'password'}
                      placeholder='Confirm Password'
                      {...field}
                    />
                    <button
                      className='absolute right-2 top-1/2 -translate-y-1/2'
                      type='button'
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          confirmPassword: !prev.confirmPassword,
                        }))
                      }
                    >
                      {showPassword.confirmPassword ? (
                        <EyeOffIcon />
                      ) : (
                        <EyeIcon />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-center items-center'>
            <Button type='submit' disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </div>
          <div className='text-sm'>
            By creating an account, you agree to {APP_NAME}&apos;s{' '}
            <Link href='/page/conditions-of-use'>Conditions of Use</Link> and{' '}
            <Link href='/page/privacy-policy'> Privacy Notice. </Link>
          </div>
          <Separator className='mb-4' />
          <div className='text-sm'>
            Already have an account?{' '}
            <Link className='link' href={`/sign-in?callbackUrl=${callbackUrl}`}>
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </Form>
  )
}
