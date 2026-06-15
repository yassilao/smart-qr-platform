'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useLogin } from '@/hooks/useApi'
import { useAuthStore } from '@/lib/store'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const setAuthToken = useAuthStore((state) => state.setToken)
  const setUser = useAuthStore((state) => state.setUser)
  const loginMutation = useLogin()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
      } else if (result?.ok) {
        // Get user data from API
        const response = await loginMutation.mutateAsync({ email, password })
        setAuthToken(response.data.data.token)
        setUser(response.data.data.user)
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 space-y-3">
            <Button
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              variant="outline"
              className="w-full"
            >
              Sign in with Google
            </Button>
            <Button
              onClick={() => signIn('azure-ad', { callbackUrl: '/dashboard' })}
              variant="outline"
              className="w-full"
            >
              Sign in with Microsoft
            </Button>
            <Button
              onClick={() => signIn('facebook', { callbackUrl: '/dashboard' })}
              variant="outline"
              className="w-full"
            >
              Sign in with Facebook
            </Button>
          </div>

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-blue-600 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
