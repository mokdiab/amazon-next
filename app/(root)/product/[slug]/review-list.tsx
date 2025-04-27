'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar, Check, User } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useInView } from 'react-intersection-observer'
import { z } from 'zod'
import Rating from '@/components/shared/product/rating'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import {
  createUpdateReview,
  getReviewByProductId,
  getReviews,
  deleteReview,
} from '@/lib/actions/review.actions'
import { ReviewInputSchema } from '@/lib/validator'
import RatingSummary from '@/components/shared/product/rating-summary'
import { IProduct } from '@/lib/db/models/product.model'
import { Separator } from '@/components/ui/separator'
import { IReviewDetails } from '@/types'
import RatingInput from '@/components/shared/product/rating-input'
import { LoadingButton } from '@/components/shared/LoadingButton'

const reviewFormDefaultValues = {
  title: '',
  comment: '',
  rating: 0,
}

export default function ReviewList({
  userId,
  product,
}: {
  userId: string | undefined
  product: IProduct
}) {
  const [page, setPage] = useState(2)
  const [totalPages, setTotalPages] = useState(0)
  const [userReview, setUserReview] = useState<CustomerReview | null>(null)
  const [reviews, setReviews] = useState<IReviewDetails[]>([])
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const { ref, inView } = useInView({ triggerOnce: true })
  const [loadingReviews, setLoadingReviews] = useState(false)
  const [open, setOpen] = useState(false)
  const reload = useCallback(async () => {
    try {
      const res = await getReviews({
        productId: product._id,
        page: 1,
        limit: 5,
      })
      console.log(res)
      setReviews([...res.data])
      setTotalPages(res.totalPages)
      if (userId) {
        try {
          const currentReview = await getReviewByProductId({
            productId: product._id,
          })
          setUserReview(currentReview || null) // Explicitly set null if undefined
        } catch (reviewErr) {
          console.error('Failed to fetch user review:', reviewErr)
          setUserReview(null)
        }
      } else {
        setUserReview(null)
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error('Failed to load reviews')
    }
  }, [product._id, userId]) // Add userId as dependency
  const loadMoreReviews = async () => {
    if (totalPages !== 0 && page > totalPages) return
    setLoadingReviews(true)
    const res = await getReviews({ productId: product._id, page, limit: 5 })
    console.log(res)
    setLoadingReviews(false)
    setReviews([...reviews, ...res.data])
    setTotalPages(res.totalPages)
    setPage(page + 1)
  }

  useEffect(() => {
    if (inView) reload()
  }, [inView])

  type CustomerReview = z.infer<typeof ReviewInputSchema>
  const form = useForm<CustomerReview>({
    resolver: zodResolver(ReviewInputSchema),
    defaultValues: userReview ?? reviewFormDefaultValues,
  })

  const onSubmit: SubmitHandler<CustomerReview> = async (values) => {
    const res = await createUpdateReview({
      data: { ...values, product: product._id },
      path: `/product/${product.slug}`,
    })
    if (!res.success) return toast.error(res.message)
    setOpen(false)
    reload()
    toast.success(res.message)
  }
  const handleDelete = async () => {
    const res = await deleteReview({
      productId: product._id,
      path: `/product/${product.slug}`,
    })
    if (!res.success) {
      toast.error(res.message)
      return
    }
    form.reset()
    setUserReview(null)
    setOpen(false)
    setDeleteConfirmOpen(false)
    reload()
    toast.success(res.message)
  }
  const handleOpenForm = async () => {
    form.setValue('product', product._id)
    form.setValue('user', userId!)
    form.setValue('isVerifiedPurchase', true)
    const review = await getReviewByProductId({ productId: product._id })
    if (review) {
      form.setValue('title', review.title)
      form.setValue('comment', review.comment)
      form.setValue('rating', review.rating)
    }
    setOpen(true)
  }
  return (
    <div className='space-y-2'>
      {reviews.length === 0 && <div>No reviews yet</div>}

      <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
        <div className='flex flex-col gap-2'>
          {reviews.length !== 0 && (
            <RatingSummary
              avgRating={product.avgRating}
              numReviews={product.numReviews}
              ratingDistribution={product.ratingDistribution}
            />
          )}
          <Separator className='my-3' />
          <div className='space-y-3'>
            <h3 className='font-bold text-lg lg:text-xl'>
              Review this product
            </h3>
            <p className='text-sm'>Share your thoughts with other customers</p>
            {userId ? (
              <>
                {userReview && (
                  <div className='mt-3 space-y-4'>
                    <p className='font-bold'>Your review:</p>
                    <div className='px-4 py-2 w-full flex flex-col gap-2 rounded-lg border border-primary break-words'>
                      <p className='text-sm break-words whitespace-pre-wrap overflow-hidden'>
                        <span className='font-bold'>Title:</span>{' '}
                        {userReview.title}
                      </p>
                      <p className='text-sm break-words whitespace-pre-wrap overflow-hidden'>
                        <span className='font-bold'>Comment:</span>{' '}
                        {userReview.comment}
                      </p>
                      <Rating rating={userReview.rating} size={5} />
                    </div>
                  </div>
                )}
                <Dialog open={open} onOpenChange={setOpen}>
                  <LoadingButton
                    loadingText='Loading...'
                    onClick={handleOpenForm}
                    variant='outline'
                    className=' rounded-full w-full'
                  >
                    {userReview ? 'Edit review' : 'Write a customer review'}
                  </LoadingButton>
                  {userReview && (
                    <LoadingButton
                      loadingText='Deleting...'
                      onClick={() => setDeleteConfirmOpen(true)}
                      variant='destructive'
                      className='rounded-full w-full'
                    >
                      Delete review
                    </LoadingButton>
                  )}

                  <DialogContent className='sm:max-w-[425px]'>
                    <Form {...form}>
                      <form
                        method='post'
                        onSubmit={form.handleSubmit(onSubmit)}
                      >
                        <DialogHeader>
                          <DialogTitle>Write a customer review</DialogTitle>
                          <DialogDescription>
                            Share your thoughts with other customers
                          </DialogDescription>
                        </DialogHeader>
                        <div className='grid gap-4 py-4'>
                          <div>
                            <FormField
                              control={form.control}
                              name='rating'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Rating</FormLabel>
                                  <RatingInput {...field} />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className='flex flex-col gap-5  '>
                            <FormField
                              control={form.control}
                              name='title'
                              render={({ field }) => (
                                <FormItem className='w-full'>
                                  <FormLabel>Title</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder='Enter title'
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name='comment'
                              render={({ field }) => (
                                <FormItem className='w-full'>
                                  <FormLabel>Comment</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder='Enter comment'
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          {userReview && (
                            <LoadingButton
                              loadingText='Deleting...'
                              type='button'
                              variant={'destructive'}
                              size='lg'
                              onClick={() => {
                                setOpen(false)
                                setDeleteConfirmOpen(true)
                              }}
                            >
                              Delete
                            </LoadingButton>
                          )}
                          <Button
                            type='submit'
                            size='lg'
                            disabled={form.formState.isSubmitting}
                          >
                            {form.formState.isSubmitting
                              ? 'Submitting...'
                              : 'Submit'}
                          </Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
                <Dialog
                  open={deleteConfirmOpen}
                  onOpenChange={setDeleteConfirmOpen}
                >
                  <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                      <DialogTitle>Confirm Deletion</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete your review? This action
                        cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <LoadingButton
                        loadingText='Cancelling...'
                        variant='outline'
                        onClick={() => setDeleteConfirmOpen(false)}
                      >
                        Cancel
                      </LoadingButton>
                      <LoadingButton
                        loadingText='Deleting...'
                        variant='destructive'
                        onClick={handleDelete}
                      >
                        Delete
                      </LoadingButton>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <div>
                Please{' '}
                <Link
                  href={`/sign-in?callbackUrl=/product/${product.slug}`}
                  className='highlight-link'
                >
                  sign in
                </Link>{' '}
                to write a review
              </div>
            )}
          </div>
        </div>
        <div className='md:col-span-3 flex flex-col gap-3'>
          {reviews.map((review: IReviewDetails, i) => (
            <Card key={`${i}-${review._id}`}>
              <CardHeader>
                <div className='flex-between'>
                  <CardTitle>{review.title}</CardTitle>
                  <div className='italic text-sm flex'>
                    <Check className='h-4 w-4' /> Verified Purchase
                  </div>
                </div>
                <CardDescription>{review.comment}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex space-x-4 text-sm text-muted-foreground'>
                  <Rating rating={review.rating} />
                  <div className='flex items-center'>
                    <User className='mr-1 h-3 w-3' />
                    {review.user ? review.user.name : 'Deleted User'}
                  </div>
                  <div className='flex items-center'>
                    <Calendar className='mr-1 h-3 w-3' />
                    {review.createdAt.toString().substring(0, 10)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <div ref={ref}>
            {page <= totalPages && (
              <Button
                variant={'link'}
                onClick={loadMoreReviews}
                disabled={loadingReviews}
              >
                {loadingReviews ? 'Loading...' : 'See more reviews'}
              </Button>
            )}

            {page < totalPages && loadingReviews && 'Loading'}
          </div>
        </div>
      </div>
    </div>
  )
}
