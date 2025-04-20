export default function CheckoutLoading() {
  return (
    <div className='max-w-4xl mx-auto pt-12'>
      <div className='flex items-center gap-4 mb-8'>
        <div className='w-8 h-8 bg-primary rounded-full animate-bounce'></div>
        <div
          className='w-8 h-8 bg-primary rounded-full animate-bounce'
          style={{ animationDelay: '0.2s' }}
        ></div>
        <div
          className='w-8 h-8 bg-primary rounded-full animate-bounce'
          style={{ animationDelay: '0.4s' }}
        ></div>
      </div>

      <div className='grid md:grid-cols-2 gap-8'>
        <div className='space-y-6'>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className='h-4 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 rounded-full animate-pulse'
            ></div>
          ))}
        </div>

        <div className='bg-secondary/50 p-6 rounded-xl border animate-pulse'>
          <div className='h-8 w-1/2 mb-6 bg-primary/20 rounded'></div>
          <div className='h-4 w-full bg-primary/10 rounded mb-2'></div>
          <div className='h-4 w-3/4 bg-primary/10 rounded'></div>
        </div>
      </div>
    </div>
  )
}
