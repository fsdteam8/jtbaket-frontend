import { Phone, Mail, MapPin } from "lucide-react"

export function ContactSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact us to purchase your favorite products.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img
              src="/placeholder.svg?height=400&width=400"
              alt="Person working at desk"
              className="max-w-full h-auto"
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-primary" />
              <span className="text-gray-700">+1 (888) 000-0000</span>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-primary" />
              <span className="text-gray-700">info@abc223.com</span>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-primary mt-1" />
              <div className="text-gray-700">
                <div>00000 Artesia Blvd., Suite A-000,</div>
                <div>Cerritos, CA 00000-0000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
