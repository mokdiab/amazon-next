'use client'

import { Button } from '@/components/ui/button'
import { LoadingButton } from '@/components/shared/LoadingButton'
import { useTranslations } from 'next-intl'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useCartStore from '@/hooks/use-cart-store'
import { toast } from 'sonner'
import { OrderItem } from '@/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AddToCart({
  item,
  minimal = false,
}: {
  item: OrderItem
  minimal?: boolean
}) {
  const router = useRouter()
  const { addItem } = useCartStore()
  const [quantity, setQuantity] = useState(1)
  const t = useTranslations()
  return minimal ? (
    <LoadingButton
      className='rounded-full w-auto'
      onClick={async () => {
        try {
          await addItem(item, 1)
          toast.success(`${item.name} ${t('Product.Added to Cart')}`, {
            action: (
              <Button
                onClick={() => {
                  router.push('/cart')
                }}
              >
                {t('Product.Go to Cart')}
              </Button>
            ),
          })
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message)
          }
        }
      }}
      loadingText='Adding...'
    >
      {t('Product.Add to Cart')}
    </LoadingButton>
  ) : (
    <div className='w-full space-y-2'>
      <Select
        value={quantity.toString()}
        onValueChange={(i) => setQuantity(Number(i))}
      >
        <SelectTrigger className=''>
          <SelectValue>Quantity: {quantity}</SelectValue>
        </SelectTrigger>
        <SelectContent position='popper'>
          {Array.from({ length: item.countInStock }).map((_, i) => (
            <SelectItem key={i + 1} value={`${i + 1}`}>
              {i + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <LoadingButton
        className='rounded-full w-full'
        type='button'
        onClick={async () => {
          try {
            const itemId = await addItem(item, quantity)
            router.push(`/cart/${itemId}`)
          } catch (error) {
            if (error instanceof Error) {
              toast.error(error.message)
            }
          }
        }}
        loadingText='Adding...'
      >
        {t('Product.Add to Cart')}
      </LoadingButton>
      <LoadingButton
        variant='secondary'
        onClick={async () => {
          try {
            await addItem(item, quantity)
            router.push(`/checkout`)
          } catch (error) {
            if (error instanceof Error) {
              toast.error(error.message)
            }
          }
        }}
        className='w-full rounded-full '
        loadingText='Redirecting...'
      >
        {t('Product.Buy Now')}
      </LoadingButton>
    </div>
  )
}
