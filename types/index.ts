import {
  CartSchema,
  OrderItemSchema,
  ProductInputSchema,
  UserInputSchema,
  UserSignInSchema,
  UserSignUpSchema,
  ShippingAddressSchema,
  OrderInputSchema,
  ReviewInputSchema,
  UserNameSchema,
  ProductUpdateSchema,
} from '@/lib/validator'
import { z } from 'zod'

export type IReviewInput = z.infer<typeof ReviewInputSchema>
export type IReviewDetails = IReviewInput & {
  _id: string
  createdAt: string
  user: {
    name: string
  }
}
export type IProductInput = z.infer<typeof ProductInputSchema>
export type IProductUpdate = z.infer<typeof ProductUpdateSchema>
export type Data = {
  products: IProductInput[]
  reviews: {
    title: string
    rating: number
    comment: string
  }[]
  headerMenus: {
    name: string
    href: string
  }[]

  carousels: {
    image: string
    url: string
    title: string
    buttonCaption: string
    isPublished: boolean
  }[]
  users: IUserInput[]
}
export type IOrderList = {
  _id: string
  user: {
    name: string
    email: string
  }
  createdAt: string
  totalPrice: number
  isPaid: boolean
  paidAt: Date
  isDelivered: boolean
  deliveredAt: Date
}
export type OrderItem = z.infer<typeof OrderItemSchema>
export type Cart = z.infer<typeof CartSchema>
export type ShippingAddress = z.infer<typeof ShippingAddressSchema>
export type IUserInput = z.infer<typeof UserInputSchema>
export type IUserSignIn = z.infer<typeof UserSignInSchema>
export type IUserSignUp = z.infer<typeof UserSignUpSchema>
export type IOrderInput = z.infer<typeof OrderInputSchema>
export type IUserName = z.infer<typeof UserNameSchema>
