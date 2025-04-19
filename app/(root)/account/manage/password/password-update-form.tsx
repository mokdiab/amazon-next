'use client'
import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PasswordUpdateSchema } from '@/lib/validator' // Updated import
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { updatePassword } from '@/lib/actions/user.actions'
import { PasswordStrength } from '@/components/shared/password-strength'
import { useRouter } from 'next/navigation'

export default function PasswordUpdateForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const router = useRouter()
  const form = useForm<z.infer<typeof PasswordUpdateSchema>>({
    resolver: zodResolver(PasswordUpdateSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: z.infer<typeof PasswordUpdateSchema>) {
    setIsSubmitting(true)
    try {
      const result = await updatePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      })
      if (result.success) {
        toast.success('Password updated successfully')
        form.reset()
        setNewPassword('')
        router.push('/account/manage')
      } else {
        toast.error(result.message)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='currentPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    setNewPassword(e.target.value)
                  }}
                />
              </FormControl>
              <PasswordStrength password={newPassword} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Password'}
        </Button>
      </form>
    </Form>
  )
}
