"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart, LogIn, LogOut, Settings, User, Menu } from "lucide-react"
import { useSession } from "next-auth/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader,  SheetTrigger } from "./ui/sheet"
import LogoutModal from "./LogoutModal"
import { useState } from "react"
import Image from "next/image"

export function Navbar() {
  const session = useSession()
  const pathname = usePathname()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/Inventory", label: "Inventory" },
    { href: "/favorites", label: "All Favorites" },
    { href: "/about-us", label: "About Us" },
    { href: "/faq", label: "FAQs" },
    { href: "/contact-us", label: "Contact" },
  ]

  const isActive = (href: string) => pathname === href

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-primary text-white px-4 py-2 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo1.png"
            width={60}
            height={60}
            className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
            alt="jtbacked"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`pb-1 transition-colors text-sm xl:text-base whitespace-nowrap ${
                isActive(href) ? "border-b-2 border-white text-white" : "hover:text-gray-200"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {session.status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-gray-200 hover:bg-white/10 text-xs lg:text-sm"
                >
                  <User className="w-4 h-4 mr-1 lg:mr-2" />
                  <span className="hidden lg:inline">Your Account</span>
                  <span className="lg:hidden">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 bg-white">
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/account">
                    <Settings className="mr-2 h-4 w-4" /> My Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsModalOpen(true)} className="cursor-pointer text-red-500">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-gray-200 hover:bg-white/10 text-xs lg:text-sm"
              >
                <LogIn className="w-4 h-4 mr-1 lg:mr-2" />
                <span className="hidden lg:inline">Login</span>
                <span className="lg:hidden">Login</span>
              </Button>
            </Link>
          )}

          <Link href="/favorites">
            <Button
              variant="ghost"
              size="sm"
              className={`hover:text-gray-200 hover:bg-white/10 p-2 ${
                isActive("/favorites") ? "text-yellow-300" : "text-white"
              }`}
            >
              <Heart className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Mobile Right Side */}
        <div className="flex md:hidden items-center space-x-2 ">
          <Link href="/favorites">
            <Button
              variant="ghost"
              size="sm"
              className={`hover:text-gray-200 hover:bg-white/10 p-2 ${
                isActive("/favorites") ? "text-yellow-300" : "text-white"
              }`}
            >
              <Heart className="w-4 h-4" />
            </Button>
          </Link>

          {/* Mobile Menu Trigger */}
          <Sheet  open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:text-gray-200 hover:bg-white/10 p-2">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px] bg-white">
              <SheetHeader>
                {/* <SheetTitle className="text-left">Menu</SheetTitle> */}
              </SheetHeader>

              <div className="flex flex-col space-y-4 mt-6">
                {/* Mobile Navigation Links */}
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={handleMobileLinkClick}
                    className={`text-lg font-medium transition-colors py-2 px-3 rounded-md ${
                      isActive(href) ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {label}
                  </Link>
                ))}

                <hr className="my-4" />

                {/* Mobile Auth Section */}
                {session.status === "authenticated" ? (
                  <div className="space-y-3">
                    <Link
                      href="/account"
                      onClick={handleMobileLinkClick}
                      className="flex items-center text-lg font-medium text-gray-700 hover:bg-gray-100 py-2 px-3 rounded-md transition-colors"
                    >
                      <Settings className="mr-3 h-5 w-5" />
                      My Account
                    </Link>
                    <button
                      onClick={() => {
                        setIsModalOpen(true)
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex items-center text-lg font-medium text-red-500 hover:bg-red-50 py-2 px-3 rounded-md transition-colors w-full text-left"
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={handleMobileLinkClick}
                    className="flex items-center text-lg font-medium text-gray-700 hover:bg-gray-100 py-2 px-3 rounded-md transition-colors"
                  >
                    <LogIn className="mr-3 h-5 w-5" />
                    Login
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <LogoutModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </nav>
  )
}
