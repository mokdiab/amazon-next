import useDeviceType from './use-device-type'
import useCartStore from './use-cart-store'
import { usePathname } from 'next/navigation'

const isNotInPaths = (s: string) =>
  !/^\/$|^\/cart$|^\/checkout$|^\/sign-in$|^\/sign-up$|^\/order(\/.*)?$|^\/account(\/.*)?$|^\/admin(\/.*)?$/.test(
    s
  )
export default function useCartSidebar() {
  const {
    cart: { items },
  } = useCartStore()
  const deviceType = useDeviceType()
  const currentPath = usePathname()
  return (
    items.length !== 0 && deviceType === 'desktop' && isNotInPaths(currentPath)
  )
}
