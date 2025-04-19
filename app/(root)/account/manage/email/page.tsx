import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import EmailForm from './email-form'
import { SessionProvider } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/card'
import { APP_NAME } from '@/lib/constants'
import { Metadata } from 'next'
import { auth } from '@/auth'
const PAGE_TITLE = 'Change Your Email'
export const metadata: Metadata = {
  title: PAGE_TITLE,
}
export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user) return null
  return (
    <div className='mb-24'>
      <Breadcrumbs
        crumbs={[
          { label: 'Your Account', href: '/account' },
          { label: 'Login & Security', href: '/account/manage' },
          { label: PAGE_TITLE },
        ]}
      />
      <SessionProvider session={session}>
        <h1 className='h1-bold py-4'>{PAGE_TITLE}</h1>
        <Card className='max-w-2xl'>
          <CardContent className='p-4 flex justify-between flex-wrap'>
            <p className='text-sm py-2'>
              If you want to change the email associated with your {APP_NAME}
              &apos;s account, you may do so below. Be sure to click the Save
              Changes button when you are done.
            </p>
            <EmailForm />
          </CardContent>
        </Card>
      </SessionProvider>
    </div>
  )
}
