import { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { Card, CardContent } from '@/components/ui/card'
import { APP_NAME } from '@/lib/constants'
import PasswordUpdateForm from './password-update-form'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'

const PAGE_TITLE = 'Change Your Password'
export const metadata: Metadata = {
  title: PAGE_TITLE,
}

export default async function ProfilePage() {
  const session = await auth()
  return (
    <div className='mb-24'>
      <SessionProvider session={session}>
        <Breadcrumbs
          crumbs={[
            { label: 'Your Account', href: '/account' },
            { label: 'Login & Security', href: '/account/manage' },
            { label: PAGE_TITLE },
          ]}
        />
        <h1 className='h1-bold py-4'>{PAGE_TITLE}</h1>
        <Card className='max-w-2xl'>
          <CardContent className='p-4 flex justify-between flex-wrap'>
            <p className='text-sm py-2'>
              If you want to change the password associated with your {APP_NAME}
              &apos;s account, you may do so below. Be sure to click the Save
              Changes button when you are done.
            </p>
            <PasswordUpdateForm />
          </CardContent>
        </Card>
      </SessionProvider>
    </div>
  )
}
