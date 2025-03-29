'use client'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi, // Import the correct type for `emblaApi`
} from '@/components/ui/carousel'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HomeCarousel({
  items,
}: {
  items: {
    image: string
    url: string
    title: string
    buttonCaption: string
  }[]
}) {
  const autoplayInstance = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  )
  const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null) // Correct type

  useEffect(() => {
    if (emblaApi) {
      emblaApi?.plugins()?.autoplay?.play()
    }
  }, [emblaApi])

  return (
    <Carousel
      dir='ltr'
      plugins={[autoplayInstance.current]}
      className='w-full mx-auto'
      onMouseEnter={() => emblaApi?.plugins()?.autoplay?.stop()}
      onMouseLeave={() => emblaApi?.plugins()?.autoplay?.play()}
      setApi={setEmblaApi} // This should now work correctly
    >
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.title}>
            <Link href={item.url}>
              <div className='flex aspect-[16/6] items-center justify-center p-6 relative -m-1'>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className='object-cover'
                  priority
                />
                <div className='absolute w-1/3 left-16 md:left-32 top-1/2 transform -translate-y-1/2'>
                  <h2 className='text-xl md:text-6xl font-bold mb-4 text-primary'>
                    {item.title}
                  </h2>
                  <Button className='hidden md:block'>
                    {item.buttonCaption}
                  </Button>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='left-0 md:left-12' />
      <CarouselNext className='right-0 md:right-12' />
    </Carousel>
  )
}
