export default function GlobalLoading() {
  return (
    <div className='fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <div className='relative'>
          <div className='w-16 h-16 border-4 border-primary/30 rounded-full'></div>
          <div className='absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
        </div>
        <p className='text-primary animate-pulse'>Loading experience...</p>
      </div>
    </div>
  )
}
