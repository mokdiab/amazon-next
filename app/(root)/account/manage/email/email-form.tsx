'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { updateEmail } from '@/lib/actions/user.actions'
import { EmailSchema } from '@/lib/validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

export default function EmailForm() {
  const router = useRouter()
  const { data: session, update } = useSession()
  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      email: session?.user?.email!,
    },
  })
  const onSubmit = async (values: z.infer<typeof EmailSchema>) => {
    const res = await updateEmail({ newEmail: values.email })
    if (!res.success) return toast.error(res.message)
    const { message } = res
    const newSession = {
      ...session,
      user: {
        ...session?.user,
        email: values.email,
      },
    }
    await update(newSession)
    toast.success(message)
    router.push('/account/manage')
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='  flex flex-col gap-5'
      >
        <div className='flex flex-col gap-5'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='font-bold'>New email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Email'
                    {...field}
                    className='input-field'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type='submit'
          size='lg'
          disabled={form.formState.isSubmitting}
          className='button col-span-2 w-full'
        >
          {form.formState.isSubmitting ? 'Submitting...' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  )
}
