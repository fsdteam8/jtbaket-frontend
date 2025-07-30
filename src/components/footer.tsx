import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-primary text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 items-center justify-center  md:grid-cols-4 gap-8">

          <div>
            <Image src={'/logo1.png'} width={80} height={80} className="" alt="jtbacked" />

            <p className="text-sm mb-6">Lorem Ipsum is a dummy or placeholder text commonly used in graphic design.</p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 hover:text-gray-300 cursor-pointer" />
              <Instagram className="w-5 h-5 hover:text-gray-300 cursor-pointer" />
              <Twitter className="w-5 h-5 hover:text-gray-300 cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/about-us" className="block text-sm hover:text-gray-300">
                About Us
              </Link>
              {/* <Link href="/about-us" className="block text-sm hover:text-gray-300">
                Mission
              </Link> */}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <div className="space-y-2">
              <Link href="/faq" className="block text-sm hover:text-gray-300">
                FAQs
              </Link>
              <Link href="/contact-us" className="block text-sm hover:text-gray-300">
                Contact Us
              </Link>
              <Link href="/privacy-policy" className="block text-sm hover:text-gray-300">
                Privacy Policy
              </Link>
              <Link href="/terms&conditions" className="block text-sm hover:text-gray-300">
                Terms & Conditions
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2 text-sm">
              <div>123 Organic Way</div>
              <div>Farmville, CA 90210</div>
              <div className="mt-4">
                <div>Email: info@tablefresh.com</div>
                <div>Phone: (000) 123-0000</div>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm">© 2025. Design. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
