export default function AccountLoading() {
  return (
    <div className='space-y-8'>
      <div className='flex items-center gap-4'>
        <div className='w-16 h-16 rounded-full bg-primary/10 animate-pulse'></div>
        <div className='space-y-2'>
          <div className='h-6 w-32 bg-primary/10 rounded-full'></div>
          <div className='h-4 w-24 bg-primary/5 rounded-full'></div>
        </div>
      </div>

      <div className='grid md:grid-cols-2 gap-6'>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className='p-6 border rounded-lg hover:border-primary/30 transition-all'
          >
            <div className='h-5 w-1/2 bg-primary/10 rounded-full mb-4'></div>
            <div className='h-4 w-full bg-primary/5 rounded-full mb-2'></div>
            <div className='h-4 w-3/4 bg-primary/5 rounded-full'></div>
          </div>
        ))}
      </div>
    </div>
  )
}
