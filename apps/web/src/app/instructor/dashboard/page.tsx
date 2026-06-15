'use client'

import { useProtectedRoute, useRequireRole } from '@/hooks/useProtectedRoute'
import { useCourses, useCreateCourse } from '@/hooks/useApi'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useState } from 'react'

export default function InstructorDashboard() {
  const user = useRequireRole(['INSTRUCTOR', 'ORGANIZATION_ADMIN'])
  const { data: courses, refetch } = useCourses()
  const createCourseMutation = useCreateCourse()
  const [showNewCourseForm, setShowNewCourseForm] = useState(false)
  const [courseTitle, setCourseTitle] = useState('')

  const handleCreateCourse = async () => {
    try {
      await createCourseMutation.mutateAsync({
        title: courseTitle,
        description: '',
      })
      setCourseTitle('')
      setShowNewCourseForm(false)
      refetch()
    } catch (error) {
      console.error('Failed to create course:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your courses and content</p>
            </div>
            <Button onClick={() => setShowNewCourseForm(true)} className="gap-2">
              ➕ New Course
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showNewCourseForm && (
          <Card className="p-6 mb-8">
            <h3 className="text-lg font-bold mb-4">Create New Course</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Course Title"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleCreateCourse}
                  disabled={!courseTitle}
                >
                  Create
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowNewCourseForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="text-3xl font-bold text-blue-600">{courses?.length || 0}</div>
            <p className="text-gray-600 mt-2">Total Courses</p>
          </Card>
          <Card className="p-6">
            <div className="text-3xl font-bold text-green-600">342</div>
            <p className="text-gray-600 mt-2">Total Students</p>
          </Card>
          <Card className="p-6">
            <div className="text-3xl font-bold text-yellow-600">1,240</div>
            <p className="text-gray-600 mt-2">Total Hours Taught</p>
          </Card>
          <Card className="p-6">
            <div className="text-3xl font-bold text-purple-600">4.8</div>
            <p className="text-gray-600 mt-2">Average Rating</p>
          </Card>
        </div>

        {/* Courses */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Courses</h2>
          {courses && courses.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-gray-600 mb-4">You haven't created any courses yet.</p>
              <Button onClick={() => setShowNewCourseForm(true)}>Create First Course</Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses?.map((course: any) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition">
                  <div className="h-40 bg-gradient-to-br from-purple-400 to-purple-600"></div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{course._count.enrollments} students enrolled</p>
                    <p className="text-gray-600 text-sm mb-4">{course._count.modules} modules</p>
                    <Link href={`/instructor/courses/${course.id}`}>
                      <Button className="w-full">Edit Course</Button>
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
