'use server'
import { auth, signIn, signOut } from '@/auth'
import { IUserName, IUserSignIn, IUserSignUp } from '@/types'
import { redirect } from 'next/navigation'
import { UserSignUpSchema } from '../validator'
import { formatError } from '../utils'
import { connectToDatabase } from '../db'
import User from '../db/models/user.model'
import bcrypt from 'bcryptjs'

export async function signInWithCredentials(user: IUserSignIn) {
  return await signIn('credentials', { ...user, redirect: false })
}

export const SignInWithGoogle = async () => {
  return await signIn('google')
}

export const SignOut = async () => {
  const redirectTo = await signOut({ redirect: false })
  redirect(redirectTo.redirect)
}

export async function registerUser(userSignUp: IUserSignUp) {
  try {
    const user = await UserSignUpSchema.parseAsync({
      name: userSignUp.name,
      email: userSignUp.email,
      password: userSignUp.password,
      confirmPassword: userSignUp.confirmPassword,
    })

    await connectToDatabase()
    await User.create({
      ...user,
      password: await bcrypt.hash(user.password, 5),
    })
    return { success: true, message: 'User created successfully' }
  } catch (error) {
    return { success: false, error: formatError(error) }
  }
}

// UPDATE
export async function updateUserName(user: IUserName) {
  try {
    await connectToDatabase()
    const session = await auth()
    const currentUser = await User.findById(session?.user?.id)
    if (!currentUser) throw new Error('User not found')
    currentUser.name = user.name
    const updatedUser = await currentUser.save()
    return {
      success: true,
      message: 'User updated successfully',
      data: JSON.parse(JSON.stringify(updatedUser)),
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
export async function updatePassword(values: {
  currentPassword: string
  newPassword: string
}) {
  try {
    await connectToDatabase()
    const session = await auth()

    if (!session?.user?.id) {
      throw new Error('User not authenticated')
    }

    const user = await User.findById(session.user.id)
    if (!user) {
      throw new Error('User not found')
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      values.currentPassword,
      user.password
    )
    if (!isPasswordValid) {
      throw new Error('Current password is incorrect')
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(values.newPassword, 5)

    // Update password
    user.password = hashedPassword
    await user.save()

    return { success: true, message: 'Password updated successfully' }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { success: false, message: error.message }
  }
}
export async function updateEmail(values: { newEmail: string }) {
  try {
    await connectToDatabase()
    const session = await auth()

    if (!session?.user?.id) {
      throw new Error('User not authenticated')
    }

    const existingUser = await User.findOne({ email: values.newEmail })
    if (existingUser) {
      throw new Error('This email is already taken')
    }

    const user = await User.findById(session.user.id)
    if (!user) {
      throw new Error('User not found')
    }

    user.email = values.newEmail
    await user.save()

    return { success: true, message: 'Email updated successfully' }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { success: false, message: error.message }
  }
}
