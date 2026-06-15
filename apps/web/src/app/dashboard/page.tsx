'use client'

import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import { useCourses } from '@/hooks/useApi'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function StudentDashboard() {
  const { session, isLoading } = useProtectedRoute()
  const { data: courses, isLoading: coursesLoading } = useCourses()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {session?.user?.name}
          </h1>
          <p className="text-gray-600 mt-2">Continue your learning journey</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="text-3xl font-bold text-blue-600">5</div>
            <p className="text-gray-600 mt-2">Enrolled Courses</p>
          </Card>
          <Card className="p-6">
            <div className="text-3xl font-bold text-green-600">3</div>
            <p className="text-gray-600 mt-2">Completed</p>
          </Card>
          <Card className="p-6">
            <div className="text-3xl font-bold text-yellow-600">2</div>
            <p className="text-gray-600 mt-2">In Progress</p>
          </Card>
          <Card className="p-6">
            <div className="text-3xl font-bold text-purple-600">1</div>
            <p className="text-gray-600 mt-2">Certificates</p>
          </Card>
        </div>

        {/* Courses */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Courses</h2>
            <Link href="/courses">
              <Button variant="outline">Browse More</Button>
            </Link>
          </div>

          {coursesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          ) : courses?.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
              <Link href="/courses">
                <Button>Browse Courses</Button>
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses?.map((course: any) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition">
                  <div className="h-40 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <Link href={`/courses/${course.id}`}>
                      <Button className="w-full">Continue</Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
