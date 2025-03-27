"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageLayout } from "@/components/layout/PageLayout"

export default function NotFound() {
  const pathname = usePathname()

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname)
  }, [pathname])

  return (
    <PageLayout>
      <div className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="text-center max-w-md animate-fade-up">
          <h1 className="text-9xl font-display font-bold text-rwandan-blue">404</h1>
          <h2 className="mt-4 text-2xl font-display font-semibold text-gray-900">Page not found</h2>
          <p className="mt-2 text-gray-600">The page you're looking for doesn't exist or has been moved.</p>
          <Link href="/" className="mt-8 btn-primary inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}

