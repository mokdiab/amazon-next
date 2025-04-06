import { SearchIcon, ChevronDownIcon } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select"
import {APP_NAME } from "@/lib/constants"
import { Input } from "../../ui/input"
const categories = ['men', 'women', 'kids','accessories']

async function Search() {
  return (
    <form action="/search" method="GET" className="flex items-stretch h-10">
      <Select name="category" >
        <SelectTrigger className="flex items-center px-3 gap-2 w-auto h-full dark:border-gray-200 bg-gray-100 text-black border-r rounded-r-none rounded-l-md">
          <SelectValue placeholder="All" />
          <ChevronDownIcon width={20} height={20}/>
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="all">All</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input className="flex-1 rounded-none dark:border-gray-200 bg-gray-100 text-black text-base h-full" placeholder={`Search in ${APP_NAME}`} name="q" type="search" />
      <button type="submit" className="bg-primary text-primary-foreground rounded-s-none rounded-e-md h-full px-3 py-2" aria-label="Search">
        <SearchIcon className="w-6 h-6" />
      </button>
    </form>
  )
}

export default Search