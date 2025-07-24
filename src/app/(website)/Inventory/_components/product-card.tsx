"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Product {
  _id: string
  name: string
  type: string
  quantity: number
  price: number
  description: string
  thumbnail: string
  category: {
    _id: string
    name: string
  }
  stockStatus: string
  productId: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite)
    // Add your favorite logic here
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Image Section */}
      <div className="relative hover:shadow-md transition-all duration-300 p-5 bg-[#FFFFFF] rounded-xl w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
  {!imageError ? (
    <Image
      src={product.thumbnail || "/placeholder.svg"}
      alt={product.name}
      fill
      className="p-2 rounded-xl"
      onError={() => setImageError(true)}
    />
  ) : (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-l-lg">
      <div className="text-gray-400 text-sm">No Image</div>
    </div>
  )}
</div>


          {/* Content Section */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>

              <div className="space-y-1 text-sm text-gray-600">
                <p>Product ID: #{product.productId}</p>
                <p>Quantity: {product.stockStatus === "inStock" ? "Available" : "Out of Stock"}</p>
                <p>Type: {product.type}</p>
              </div>

              <div className="text-xl font-bold text-primary">Prices: ${product.price}</div>

              <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{product.description}</p>
            </div>

            <div className="mt-4">
              <Button
                onClick={handleAddToFavorites}
                variant="outline"
                className={`transition-all duration-200 border-2 ${
                  isFavorite
                    ? "border-red-500 text-red-500 bg-red-50 hover:bg-red-100"
                    : "border-primary text-primary bg-primary/50 hover:bg-primary/70"
                }`}
              >
               
                Add to favorites  <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
