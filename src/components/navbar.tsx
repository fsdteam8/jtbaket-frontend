"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart, User } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  const linkClasses = (href: string) =>
    `hover:text-gray-200 pb-1 ${
      pathname === href ? "border-b-2 border-white" : ""
    }`

  return (
    <nav className="bg-primary text-white px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold">
            logo
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className={linkClasses("/")}>
              Home
            </Link>
            <Link href="/Inventory" className={linkClasses("/Inventory")}>
              Inventory
            </Link>
            <Link href="/favorites" className={linkClasses("/favorites")}>
              All Favorites
            </Link>
            <Link href="/about-us" className={linkClasses("/about-us")}>
              About Us
            </Link>
            <Link href="/faq" className={linkClasses("/faq")}>
              FAQs
            </Link>
            <Link href="/contact-us" className={linkClasses("/contact-us")}>
              Contact
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-gray-200 hover:bg-white/10"
          >
            <User className="w-4 h-4 mr-2" />
            Your Account
          </Button>
          <Link href="/favorites">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-gray-200 hover:bg-white/10"
            >
              <Heart className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
