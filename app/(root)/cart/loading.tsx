export default function CartLoading() {
  return (
    <div className='max-w-7xl mx-auto px-4'>
      <div className='h-8 w-1/3 bg-primary/10 rounded-full mb-8'></div>

      <div className='grid md:grid-cols-3 gap-8'>
        {/* Cart Items */}
        <div className='md:col-span-2 space-y-6'>
          {[...Array(3)].map((_, i) => (
            <div key={i} className='flex gap-6 p-4 border rounded-lg'>
              <div className='w-24 h-24 bg-primary/5 rounded-lg'></div>
              <div className='flex-1 space-y-3'>
                <div className='h-5 w-3/4 bg-primary/10 rounded-full'></div>
                <div className='h-4 w-1/2 bg-primary/5 rounded-full'></div>
                <div className='flex gap-4'>
                  <div className='h-8 w-8 bg-primary/5 rounded'></div>
                  <div className='h-8 w-20 bg-primary/10 rounded'></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className='bg-secondary/50 p-6 rounded-xl border h-fit sticky top-4'>
          <div className='h-6 w-1/2 bg-primary/10 rounded-full mb-6'></div>
          <div className='space-y-4'>
            {[...Array(3)].map((_, i) => (
              <div key={i} className='flex justify-between'>
                <div className='h-4 w-24 bg-primary/5 rounded-full'></div>
                <div className='h-4 w-16 bg-primary/5 rounded-full'></div>
              </div>
            ))}
          </div>
          <div className='h-px bg-border my-4'></div>
          <div className='h-10 w-full bg-primary rounded-lg mt-4'></div>
        </div>
      </div>
    </div>
  )
}
