import Link from 'next/link'

type Crumb = {
  label: string
  href?: string
}

type BreadcrumbsProps = {
  crumbs: Crumb[]
}

export function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  return (
    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
      {crumbs.map((crumb, i) => (
        <div key={i} className='flex items-center gap-2'>
          {crumb.href ? (
            <Link
              href={crumb.href}
              className='hover:text-foreground hover:underline transition-colors'
            >
              {crumb.label}
            </Link>
          ) : (
            <span className='text-foreground font-medium'>{crumb.label}</span>
          )}
          {i < crumbs.length - 1 && <span>›</span>}
        </div>
      ))}
    </div>
  )
}
