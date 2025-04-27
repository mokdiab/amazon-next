import { SearchIcon } from 'lucide-react'
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { APP_NAME } from '@/lib/constants'
import { Input } from '../../ui/input'
import { getAllCategories } from '@/lib/actions/product.actions'

async function Search() {
  const categories = await getAllCategories()
  return (
    <form action='/search' method='GET' className='flex  items-stretch h-10 '>
      <Select name='category'>
        <SelectTrigger
          style={{ height: '100%' }}
          className='w-auto h-full dark:border-gray-200 bg-gray-100 text-black border-r rounded-r-none rounded-l-md rtl:rounded-r-md rtl:rounded-l-none'
        >
          <SelectValue placeholder='All' />
        </SelectTrigger>
        <SelectContent position='popper'>
          <SelectItem value='all'>All</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        className='flex-1 rounded-none dark:border-gray-200 bg-gray-100 text-black text-base h-full'
        placeholder={`Search in ${APP_NAME}`}
        name='q'
        type='search'
      />
      <button
        type='submit'
        className='bg-primary text-primary-foreground  rounded-s-none rounded-e-md h-full px-3 py-2 '
        aria-label='Search'
      >
        <SearchIcon className='w-6 h-6' />
      </button>
    </form>
  )
}

export default Search
