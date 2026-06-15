import { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Smart QR Learning & Assessment Platform',
  description: 'Enterprise-grade learning platform with QR codes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
