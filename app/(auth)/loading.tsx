export default function AuthLoading() {
  return (
    <div className='flex items-center justify-center h-[80vh]'>
      <div className='space-y-8 text-center'>
        <div className='relative mx-auto w-24 h-24'>
          <div className='absolute inset-0 bg-primary/10 rounded-full animate-ping'></div>
          <div className='absolute inset-2 border-4 border-primary border-dashed rounded-full animate-spin'></div>
        </div>
        <h2 className='text-2xl font-bold tracking-tight'>
          Securing your session
        </h2>
      </div>
    </div>
  )
}
