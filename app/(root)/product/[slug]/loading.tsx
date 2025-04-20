// app/(root)/product/[slug]/loading.tsx
export default function ProductLoading() {
  return (
    <div className='animate-fade-in'>
      {/* Breadcrumb Loading */}
      <div className='flex gap-2 mb-6 animate-pulse'>
        <div className='h-4 w-24 bg-gray-200 rounded-full'></div>
        <div className='h-4 w-4 bg-gray-200 rounded-full'></div>
        <div className='h-4 w-32 bg-gray-200 rounded-full'></div>
      </div>

      {/* Main Product Grid */}
      <div className='grid grid-cols-1 md:grid-cols-5 gap-8'>
        {/* Image Gallery Loading */}
        <div className='col-span-2 space-y-4'>
          <div className='aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl animate-pulse'></div>
          <div className='grid grid-cols-3 gap-2'>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className='aspect-square bg-gray-100 rounded-lg animate-pulse'
              ></div>
            ))}
          </div>
        </div>

        {/* Product Info Loading */}
        <div className='col-span-2 space-y-6'>
          <div className='h-6 w-32 bg-gray-200 rounded-full mb-2'></div>
          <div className='h-8 w-3/4 bg-gray-200 rounded-full'></div>

          {/* Rating Loading */}
          <div className='flex items-center gap-2'>
            <div className='h-5 w-20 bg-gray-200 rounded-full'></div>
            <div className='h-4 w-16 bg-gray-200 rounded-full'></div>
          </div>

          <div className='h-px bg-gray-200 my-4'></div>

          {/* Price Loading */}
          <div className='flex items-center gap-4'>
            <div className='h-8 w-24 bg-gray-200 rounded-full'></div>
            <div className='h-6 w-16 bg-gray-200 rounded-full'></div>
          </div>

          {/* Variants Loading */}
          <div className='space-y-3'>
            <div className='h-5 w-16 bg-gray-200 rounded-full'></div>
            <div className='flex flex-wrap gap-2'>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='h-10 w-16 bg-gray-200 rounded-lg'></div>
              ))}
            </div>
          </div>

          <div className='h-px bg-gray-200 my-4'></div>

          {/* Description Loading */}
          <div className='space-y-2'>
            <div className='h-5 w-24 bg-gray-200 rounded-full'></div>
            <div className='h-4 w-full bg-gray-200 rounded-full'></div>
            <div className='h-4 w-5/6 bg-gray-200 rounded-full'></div>
            <div className='h-4 w-2/3 bg-gray-200 rounded-full'></div>
          </div>
        </div>

        {/* Add to Cart Card Loading */}
        <div className='col-span-1'>
          <div className='border rounded-lg p-4 space-y-4'>
            <div className='h-6 w-3/4 bg-gray-200 rounded-full mx-auto'></div>
            <div className='h-5 w-20 bg-gray-200 rounded-full'></div>
            <div className='h-10 w-full bg-gray-200 rounded-lg'></div>
          </div>
        </div>
      </div>

      {/* Reviews Section Loading */}
      <div className='mt-12 space-y-6'>
        <div className='h-8 w-48 bg-gray-200 rounded-full'></div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {[...Array(2)].map((_, i) => (
            <div key={i} className='border rounded-lg p-4 space-y-3'>
              <div className='flex items-center gap-3'>
                <div className='h-10 w-10 bg-gray-200 rounded-full'></div>
                <div className='space-y-1'>
                  <div className='h-4 w-24 bg-gray-200 rounded-full'></div>
                  <div className='h-3 w-16 bg-gray-200 rounded-full'></div>
                </div>
              </div>
              <div className='h-4 w-20 bg-gray-200 rounded-full'></div>
              <div className='space-y-2'>
                <div className='h-3 w-full bg-gray-200 rounded-full'></div>
                <div className='h-3 w-5/6 bg-gray-200 rounded-full'></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products Loading */}
      <div className='mt-12 space-y-4'>
        <div className='h-8 w-64 bg-gray-200 rounded-full'></div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {[...Array(4)].map((_, i) => (
            <div key={i} className='space-y-2'>
              <div className='aspect-square bg-gray-200 rounded-lg'></div>
              <div className='h-4 w-3/4 bg-gray-200 rounded-full mx-auto'></div>
              <div className='h-4 w-16 bg-gray-200 rounded-full mx-auto'></div>
            </div>
          ))}
        </div>
      </div>

      {/* Browsing History Loading */}
      <div className='mt-12'>
        <div className='h-8 w-48 bg-gray-200 rounded-full mb-4'></div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4'>
          {[...Array(5)].map((_, i) => (
            <div key={i} className='aspect-square bg-gray-200 rounded-lg'></div>
          ))}
        </div>
      </div>
    </div>
  )
}
