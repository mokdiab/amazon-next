import { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'

import { auth } from '@/auth'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'

const PAGE_TITLE = 'Login & Security'
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
            { label: PAGE_TITLE },
          ]}
        />
        <h1 className='h1-bold py-4'>{PAGE_TITLE}</h1>
        <Card className='max-w-2xl '>
          <CardContent className='p-4 flex flex-col gap-4 md:flex-row md:justify-between'>
            <div>
              <h3 className='font-bold'>Name</h3>
              <p>{session?.user.name}</p>
            </div>
            <div>
              <Link href='/account/manage/name'>
                <Button className='rounded-full w-32' variant='outline'>
                  Edit
                </Button>
              </Link>
            </div>
          </CardContent>
          <Separator />
          <CardContent className='p-4 flex flex-col gap-4 md:flex-row md:justify-between'>
            <div>
              <h3 className='font-bold'>Email</h3>
              <p>{session?.user.email}</p>
            </div>
            <div>
              <Link href='/account/manage/email'>
                <Button className='rounded-full w-32' variant='outline'>
                  Edit
                </Button>
              </Link>
            </div>
          </CardContent>
          <Separator />
          <CardContent className='p-4 flex flex-col gap-4 md:flex-row md:justify-between'>
            <div>
              <h3 className='font-bold'>Password</h3>
              <p>************</p>
            </div>
            <div>
              <Link href='/account/manage/password'>
                <Button className='rounded-full w-32' variant='outline'>
                  Edit
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </SessionProvider>
    </div>
  )
}
