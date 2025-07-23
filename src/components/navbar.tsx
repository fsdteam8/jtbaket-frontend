import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, User } from "lucide-react"

export function Navbar() {
  return (
    <nav className="bg-primary text-white px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold">
            logo
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-gray-200 border-b-2 border-white pb-1">
              Home
            </Link>
            <Link href="/inventory" className="hover:text-gray-200">
              Inventory
            </Link>
            <Link href="/favorites" className="hover:text-gray-200">
              All Favorites
            </Link>
            <Link href="/about" className="hover:text-gray-200">
              About Us
            </Link>
            <Link href="/faqs" className="hover:text-gray-200">
              FAQs
            </Link>
            <Link href="/contact" className="hover:text-gray-200">
              Contact
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-white hover:text-gray-200 hover:bg-white/10">
            <User className="w-4 h-4 mr-2" />
            Your Account
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:text-gray-200 hover:bg-white/10">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
