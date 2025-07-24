"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"

interface Product {
  id: string
  name: string
  productId: string
  quantity: number
  type: string
  price: number
  image: string
  description: string
}

const products: Product[] = [
  {
    id: "1",
    name: "Lemon Cherry",
    productId: "#253478",
    quantity: 1000,
    type: "Indoor",
    price: 31000,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pKGQNqWgQZwqMBAtftHqxkfXyVOGl8.png",
    description:
      "A product catalog platform where users register to browse and inquire about products. Access to full features.",
  },
  {
    id: "2",
    name: "Lemon Cherry",
    productId: "#253479",
    quantity: 1500,
    type: "Indoor",
    price: 32000,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pKGQNqWgQZwqMBAtftHqxkfXyVOGl8.png",
    description:
      "A product catalog platform where users register to browse and inquire about products. Access to full features.",
  },
  {
    id: "3",
    name: "Lemon Cherry",
    productId: "#253480",
    quantity: 800,
    type: "Indoor",
    price: 29000,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pKGQNqWgQZwqMBAtftHqxkfXyVOGl8.png",
    description:
      "A product catalog platform where users register to browse and inquire about products. Access to full features.",
  },
  {
    id: "4",
    name: "Lemon Cherry",
    productId: "#253481",
    quantity: 1200,
    type: "Indoor",
    price: 33000,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pKGQNqWgQZwqMBAtftHqxkfXyVOGl8.png",
    description:
      "A product catalog platform where users register to browse and inquire about products. Access to full features.",
  },
  {
    id: "5",
    name: "Lemon Cherry",
    productId: "#253482",
    quantity: 900,
    type: "Indoor",
    price: 30000,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pKGQNqWgQZwqMBAtftHqxkfXyVOGl8.png",
    description:
      "A product catalog platform where users register to browse and inquire about products. Access to full features.",
  },
  {
    id: "6",
    name: "Lemon Cherry",
    productId: "#253483",
    quantity: 1100,
    type: "Indoor",
    price: 31500,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pKGQNqWgQZwqMBAtftHqxkfXyVOGl8.png",
    description:
      "A product catalog platform where users register to browse and inquire about products. Access to full features.",
  },
  {
    id: "7",
    name: "Lemon Cherry",
    productId: "#253484",
    quantity: 750,
    type: "Indoor",
    price: 28000,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pKGQNqWgQZwqMBAtftHqxkfXyVOGl8.png",
    description:
      "A product catalog platform where users register to browse and inquire about products. Access to full features.",
  },
  {
    id: "8",
    name: "Lemon Cherry",
    productId: "#253485",
    quantity: 1300,
    type: "Indoor",
    price: 34000,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pKGQNqWgQZwqMBAtftHqxkfXyVOGl8.png",
    description:
      "A product catalog platform where users register to browse and inquire about products. Access to full features.",
  },
  {
    id: "9",
    name: "Lemon Cherry",
    productId: "#253486",
    quantity: 950,
    type: "Indoor",
    price: 30500,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pKGQNqWgQZwqMBAtftHqxkfXyVOGl8.png",
    description:
      "A product catalog platform where users register to browse and inquire about products. Access to full features.",
  },
  {
    id: "10",
    name: "Lemon Cherry",
    productId: "#253487",
    quantity: 1050,
    type: "Indoor",
    price: 31200,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pKGQNqWgQZwqMBAtftHqxkfXyVOGl8.png",
    description:
      "A product catalog platform where users register to browse and inquire about products. Access to full features.",
  },
  {
    id: "11",
    name: "Lemon Cherry",
    productId: "#253488",
    quantity: 850,
    type: "Indoor",
    price: 29500,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pKGQNqWgQZwqMBAtftHqxkfXyVOGl8.png",
    description:
      "A product catalog platform where users register to browse and inquire about products. Access to full features.",
  },
  {
    id: "12",
    name: "Lemon Cherry",
    productId: "#253489",
    quantity: 1150,
    type: "Indoor",
    price: 32500,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pKGQNqWgQZwqMBAtftHqxkfXyVOGl8.png",
    description:
      "A product catalog platform where users register to browse and inquire about products. Access to full features.",
  },
]

export default function ProductsPage() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const addToFavorites = (productId: string) => {
    const updatedFavorites = [...favorites, productId]
    setFavorites(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  }

  const isInFavorites = (productId: string) => {
    return favorites.includes(productId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
            <p className="text-gray-600 mt-1">Browse our collection of premium products</p>
          </div>
          <Link href="/favorites">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Heart className="w-4 h-4" />
              My Favorites ({favorites.length})
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="w-32 h-32 flex-shrink-0">
                    <Image
                      src="/placeholder.svg?height=128&width=128"
                      alt={product.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <div>
                        Product ID: <span className="text-blue-600">{product.productId}</span>
                      </div>
                      <div>Quantity: {product.quantity}</div>
                      <div>Type: {product.type}</div>
                      <div className="font-semibold text-green-600">Price: ₹{product.price.toLocaleString()}</div>
                    </div>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-3">{product.description}</p>
                    <Button
                      onClick={() => addToFavorites(product.id)}
                      disabled={isInFavorites(product.id)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2"
                    >
                      {isInFavorites(product.id) ? "Added to Favorites" : "Add to favorites"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
