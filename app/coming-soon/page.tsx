'use client'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Mail,
  Check,
  Github,
  BriefcaseBusiness,
  Linkedin,
} from 'lucide-react'

export default function ComingSoon() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.floor(Math.random() * 5) + 1
        return Math.min(prev + increment, 95)
      })
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally handle the email subscription
    // For demo purposes, we just set the submitted state
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
    setEmail('')
  }

  // Features that will be available at launch
  const features = [
    'Fast worldwide shipping',
    'Secure payment processing',
    '24/7 customer support',
    'Huge product catalog',
    'Exclusive deals and offers',
    'Easy returns and exchanges',
  ]

  return (
    <div className='min-h-screen bg-background flex flex-col'>
      <Head>
        <title>Coming Soon | Amazona</title>
        <meta
          name='description'
          content='Amazona - Your one-stop e-commerce destination coming soon!'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className='container mx-auto p-4 flex justify-between items-center'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src='/icons/logo.svg'
            alt='Amazona'
            width={150}
            height={40}
            className='h-10 w-auto'
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='flex items-center gap-4'
        >
          <motion.a
            href='https://diab-portfolio.vercel.app/'
            target='_blank'
            rel='noopener noreferrer'
            whileHover={{ scale: 1.2, rotate: 5 }}
            className='text-foreground hover:text-primary transition-colors'
          >
            <BriefcaseBusiness size={20} />
          </motion.a>
          <motion.a
            href='https://www.linkedin.com/in/mokdiab'
            target='_blank'
            rel='noopener noreferrer'
            whileHover={{ scale: 1.2, rotate: 5 }}
            className='text-foreground hover:text-primary transition-colors'
          >
            <Linkedin size={20} />
          </motion.a>
          <motion.a
            href='https://github.com/mokdiab'
            target='_blank'
            rel='noopener noreferrer'
            whileHover={{ scale: 1.2, rotate: 5 }}
            className='text-foreground hover:text-primary transition-colors'
          >
            <Github size={20} />
          </motion.a>
        </motion.div>
      </header>

      <main className='flex-1 flex flex-col items-center justify-center py-12 px-4'>
        <div className='w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className='space-y-6'
          >
            <motion.h1
              className='text-4xl md:text-6xl font-bold tracking-tight'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className='text-primary'>Amazona</span> is coming soon
            </motion.h1>

            <motion.p
              className='text-lg text-muted-foreground'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              We&apos;re building the next generation e-commerce platform. Get
              ready for an amazing shopping experience with a wide range of
              products at competitive prices.
            </motion.p>

            {/* Progress tracker instead of countdown */}
            <motion.div
              className='pt-6 space-y-3'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className='flex justify-between text-sm'>
                <span>Site progress</span>
                <span className='font-medium'>{progress}%</span>
              </div>
              <div className='h-2 w-full bg-secondary rounded-full overflow-hidden'>
                <motion.div
                  className='h-full bg-primary'
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
              <p className='text-sm text-muted-foreground italic'>
                We&apos;re working hard to bring you the best shopping
                experience!
              </p>
            </motion.div>

            {/* Feature highlights */}
            <motion.div
              className='pt-6'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <h3 className='text-lg font-medium mb-3'>What to expect:</h3>
              <div className='grid grid-cols-2 gap-y-2 gap-x-4'>
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className='flex items-center gap-2'
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                  >
                    <div className='flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center'>
                      <Check size={12} className='text-primary-foreground' />
                    </div>
                    <span className='text-sm'>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className='pt-6'
            >
              <form onSubmit={handleSubmit} className='flex gap-2 max-w-md'>
                <div className='relative flex-1'>
                  <Mail
                    className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground'
                    size={18}
                  />
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email'
                    required
                    className='w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary'
                  />
                </div>
                <motion.button
                  type='submit'
                  className='bg-primary text-primary-foreground px-4 py-3 rounded-lg font-medium flex items-center gap-2'
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Notify Me <ArrowRight size={18} />
                </motion.button>
              </form>
              {isSubmitted && (
                <motion.p
                  className='text-green-600 mt-2'
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Thanks! We&apos;ll notify you when we launch.
                </motion.p>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className='relative h-80 md:h-full aspect-square'
          >
            <div className='relative h-full w-full'>
              <motion.div
                className='absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary rounded-full opacity-20'
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: 'easeInOut',
                }}
              />

              <motion.div
                className='absolute inset-0 flex items-center justify-center'
                animate={{
                  rotateY: [0, 360],
                  transition: {
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                }}
              >
                <div className='relative w-4/5 h-4/5'>
                  <Image
                    src='/icons/logo.svg'
                    alt='Amazona'
                    fill
                    className='object-contain'
                  />
                </div>
              </motion.div>

              {/* Floating product cards */}
              {[
                {
                  name: 'Electronics',
                  icon: '💻',
                  color: 'bg-blue-100 dark:bg-blue-900',
                },
                {
                  name: 'Fashion',
                  icon: '👕',
                  color: 'bg-pink-100 dark:bg-pink-900',
                },
                {
                  name: 'Home',
                  icon: '🏠',
                  color: 'bg-green-100 dark:bg-green-900',
                },
                {
                  name: 'Books',
                  icon: '📚',
                  color: 'bg-yellow-100 dark:bg-yellow-900',
                },
                {
                  name: 'Beauty',
                  icon: '✨',
                  color: 'bg-purple-100 dark:bg-purple-900',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  className={`absolute rounded-lg shadow-lg p-2 ${item.color} w-20 h-20 flex flex-col items-center justify-center`}
                  style={{
                    top: `${15 + index * 15}%`,
                    left: `${10 + index * 15}%`,
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    y: [0, -15, 0],
                  }}
                  transition={{
                    y: {
                      duration: 2 + index * 0.5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    },
                    scale: { delay: 1 + index * 0.2, duration: 0.5 },
                    opacity: { delay: 1 + index * 0.2, duration: 0.5 },
                  }}
                >
                  <span className='text-2xl'>{item.icon}</span>
                  <span className='text-xs mt-1 text-center'>{item.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <footer className='container mx-auto p-4 md:p-6 text-center text-sm text-muted-foreground'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p>
            © {new Date().getFullYear()} Amazona. All rights reserved to
            Mohamed Diab.
          </p>
        </motion.div>
      </footer>
    </div>
  )
}
