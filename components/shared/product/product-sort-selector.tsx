'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getFilterUrl } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function ProductSortSelector({
  sortOrders,
  sort,
  params,
}: {
  sortOrders: { value: string; name: string }[]
  sort: string
  params: {
    q?: string
    category?: string
    price?: string
    rating?: string
    sort?: string
    page?: string
  }
}) {
  const router = useRouter()
  const selectedSort = sortOrders.find((s) => s.value === sort) || sortOrders[0]
  return (
    <Select
      value={selectedSort.value}
      onValueChange={(v) => {
        router.push(getFilterUrl({ params, sort: v }))
      }}
    >
      <SelectTrigger>
        <SelectValue>Sort By: {selectedSort.name}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {sortOrders.map((s) => (
          <SelectItem key={s.value} value={s.value}>
            {s.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
