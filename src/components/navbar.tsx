"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, LogIn, LogOut, Settings, User } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

export function Navbar() {
  const session = useSession()
  console.log(session)
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
            <Link href="/Inventory" className="hover:text-gray-200">
              Inventory
            </Link>
            <Link href="/favorites" className="hover:text-gray-200">
              All Favorites
            </Link>
            <Link href="/about-us" className="hover:text-gray-200">
              About Us
            </Link>
            <Link href="/faq" className="hover:text-gray-200">
              FAQs
            </Link>
            <Link href="/contact-us" className="hover:text-gray-200">
              Contact
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {session.status === 'authenticated' ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-gray-200 hover:bg-white/10"
                >
                  <User className="w-4 h-4 mr-2" />
                  Your Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 bg-white">
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/account"><Settings /> My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-500">
                  <LogOut /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-gray-200 hover:bg-white/10"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
          )}

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
