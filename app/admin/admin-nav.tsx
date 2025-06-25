'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const links = [
  {
    title: 'Overview',
    href: '/admin/overview',
  },
  {
    title: 'Products',
    href: '/admin/products',
  },
  {
    title: 'Orders',
    href: '/admin/orders',
  },
  {
    title: 'Users',
    href: '/admin/users',
  },
  {
    title: 'Pages',
    href: '/admin/web-pages',
  },
  {
    title: 'Carousel',
    href: '/admin/carousels',
  },
  {
    title: 'Settings',
    href: '/admin/settings',
  },
]
export default function AdminNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathName = usePathname()
  return (
    <nav
      className={cn(
        'flex items-center flex-wrap overflow-hidden gap-2 md:gap-4',
        className
      )}
      {...props}
    >
      {links.map((link) => (
        <Link
          key={link.title}
          className={
            pathName.includes(link.href) ? '' : 'text-muted-foreground'
          }
          href={link.href}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  )
}
