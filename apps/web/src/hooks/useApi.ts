'use client'

import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query'
import { getAPI } from '@/lib/api'

const api = getAPI()

// Auth
export const useRegister = () => {
  return useMutation({
    mutationFn: (data: any) => api.post('/api/auth/register', data),
  })
}

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: any) => api.post('/api/auth/login', data),
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: () => api.post('/api/auth/logout'),
  })
}

// Courses
export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: () => api.get('/api/courses').then((res) => res.data.data),
  })
}

export const useCourse = (id: string) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => api.get(`/api/courses/${id}`).then((res) => res.data.data),
    enabled: !!id,
  })
}

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: (data: any) => api.post('/api/courses', data),
  })
}

export const useUpdateCourse = (id: string) => {
  return useMutation({
    mutationFn: (data: any) => api.put(`/api/courses/${id}`, data),
  })
}

export const useEnrollCourse = () => {
  return useMutation({
    mutationFn: (courseId: string) => api.post(`/api/courses/${courseId}/enroll`),
  })
}

// Quizzes
export const useCreateQuiz = () => {
  return useMutation({
    mutationFn: (data: any) => api.post('/api/quizzes', data),
  })
}

export const useQuiz = (id: string) => {
  return useQuery({
    queryKey: ['quiz', id],
    queryFn: () => api.get(`/api/quizzes/${id}`).then((res) => res.data.data),
    enabled: !!id,
  })
}

export const useSubmitQuiz = () => {
  return useMutation({
    mutationFn: (data: any) => api.post(`/api/quizzes/${data.id}/submit`, data),
  })
}

// QR Codes
export const useGenerateQRCode = () => {
  return useMutation({
    mutationFn: (data: any) => api.post('/api/qr-codes/generate', data),
  })
}

export const useScanQRCode = (code: string) => {
  return useQuery({
    queryKey: ['qr-code', code],
    queryFn: () => api.get(`/api/qr-codes/${code}`).then((res) => res.data.data),
    enabled: !!code,
  })
}

// Attendance
export const useCheckIn = () => {
  return useMutation({
    mutationFn: (data: any) => api.post('/api/attendance/check-in', data),
  })
}

export const useCheckOut = (attendanceId: string) => {
  return useMutation({
    mutationFn: () => api.post(`/api/attendance/check-out/${attendanceId}`),
  })
}

export const useAttendanceRecords = (sessionId: string) => {
  return useQuery({
    queryKey: ['attendance', sessionId],
    queryFn: () => api.get(`/api/attendance/session/${sessionId}`).then((res) => res.data.data),
    enabled: !!sessionId,
  })
}

// Certificates
export const useCertificates = () => {
  return useQuery({
    queryKey: ['certificates'],
    queryFn: () => api.get('/api/certificates/user/me').then((res) => res.data.data),
  })
}

export const useCertificate = (id: string) => {
  return useQuery({
    queryKey: ['certificate', id],
    queryFn: () => api.get(`/api/certificates/${id}`).then((res) => res.data.data),
    enabled: !!id,
  })
}

export const useVerifyCertificate = (certificateId: string) => {
  return useQuery({
    queryKey: ['verify-certificate', certificateId],
    queryFn: () => api.get(`/api/certificates/verify/${certificateId}`).then((res) => res.data.data),
    enabled: !!certificateId,
  })
}

// Surveys
export const useCreateSurvey = () => {
  return useMutation({
    mutationFn: (data: any) => api.post('/api/surveys', data),
  })
}

export const useSurvey = (id: string) => {
  return useQuery({
    queryKey: ['survey', id],
    queryFn: () => api.get(`/api/surveys/${id}`).then((res) => res.data.data),
    enabled: !!id,
  })
}

export const useSubmitSurvey = () => {
  return useMutation({
    mutationFn: (data: any) => api.post(`/api/surveys/${data.id}/submit`, data),
  })
}

// Analytics
export const useCourseAnalytics = (courseId: string) => {
  return useQuery({
    queryKey: ['analytics', 'course', courseId],
    queryFn: () => api.get(`/api/analytics/courses/${courseId}`).then((res) => res.data.data),
    enabled: !!courseId,
  })
}

export const useQRAnalytics = (qrCodeId: string) => {
  return useQuery({
    queryKey: ['analytics', 'qr', qrCodeId],
    queryFn: () => api.get(`/api/analytics/qr/${qrCodeId}`).then((res) => res.data.data),
    enabled: !!qrCodeId,
  })
}

export const useUserActivity = (userId: string) => {
  return useQuery({
    queryKey: ['analytics', 'user', userId],
    queryFn: () => api.get(`/api/analytics/users/${userId}`).then((res) => res.data.data),
    enabled: !!userId,
  })
}

// Notifications
export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => api.get('/api/notifications').then((res) => res.data.data),
  })
}

export const useMarkNotificationAsRead = () => {
  return useMutation({
    mutationFn: (notificationId: string) => api.put(`/api/notifications/${notificationId}/read`),
  })
}
