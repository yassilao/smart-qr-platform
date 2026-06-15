import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
          <span className="text-xl font-bold text-gray-900">Smart QR</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/auth/register">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Smart QR Learning & Assessment Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Enterprise-grade SaaS platform for educational institutions, training centers, and corporate organizations.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg" className="text-base">Get Started Free</Button>
            </Link>
            <Button variant="outline" size="lg" className="text-base">Learn More</Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold mb-2">Course Management</h3>
              <p className="text-gray-600">Create and manage comprehensive course hierarchies with modules, chapters, and lessons.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2">QR Code Engine</h3>
              <p className="text-gray-600">Dynamic QR codes with advanced analytics and scanning capabilities.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">Quiz & Assessment</h3>
              <p className="text-gray-600">Multiple question types with auto-grading and comprehensive analytics.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600">Real-time engagement tracking and comprehensive reporting.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold mb-2">Multi-tenant</h3>
              <p className="text-gray-600">Complete tenant isolation with organization-level customization.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">📜</div>
              <h3 className="text-xl font-bold mb-2">Certificates</h3>
              <p className="text-gray-600">Automated certificate generation with QR verification.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
