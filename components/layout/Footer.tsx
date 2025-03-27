import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-display text-2xl font-bold text-rwandan-blue">
                Let's<span className="text-rwandan-green">Rwanda</span>
              </span>
            </Link>
            <p className="text-gray-600 text-sm">
              Your all-in-one gateway to Rwanda's private sector services. Discover, connect, and experience the best of
              Rwanda.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-600 hover:text-rwandan-blue transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-rwandan-blue transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-rwandan-blue transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-rwandan-blue transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-base font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services/hotels"
                  className="text-gray-600 text-sm hover:text-rwandan-blue transition-colors"
                >
                  Hotels
                </Link>
              </li>
              <li>
                <Link
                  href="/services/airbnb"
                  className="text-gray-600 text-sm hover:text-rwandan-blue transition-colors"
                >
                  Airbnb
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-600 text-sm hover:text-rwandan-blue transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/for-providers" className="text-gray-600 text-sm hover:text-rwandan-blue transition-colors">
                  For Service Providers
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display text-base font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-600 text-sm hover:text-rwandan-blue transition-colors">
                  About Rwanda
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 text-sm hover:text-rwandan-blue transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-gray-600 text-sm hover:text-rwandan-blue transition-colors">
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-600 text-sm hover:text-rwandan-blue transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-base font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-600 mt-0.5" />
                <span className="text-gray-600 text-sm">Kigali, Rwanda</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-600" />
                <span className="text-gray-600 text-sm">+250 781 234 567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-600" />
                <span className="text-gray-600 text-sm">info@letsrwanda.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">© {currentYear} Let's Rwanda. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/terms" className="text-gray-600 text-sm hover:text-rwandan-blue transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-600 text-sm hover:text-rwandan-blue transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

