'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

export const useProtectedRoute = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/auth/login?callbackUrl=${pathname}`)
    }
  }, [status, router, pathname])

  return { session, status, isLoading: status === 'loading' }
}

export const useRequireRole = (requiredRoles: string[]) => {
  const { session } = useProtectedRoute()
  const router = useRouter()

  useEffect(() => {
    if (session?.user && !requiredRoles.includes(session.user.role)) {
      router.push('/unauthorized')
    }
  }, [session, requiredRoles, router])

  return session?.user
}
