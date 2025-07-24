"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { ProductCard } from "./product-card"
import { LoadingGrid } from "./loading-grid"
import { ErrorMessage } from "./error-message"
import { FilterSection } from "./filter-section"
// import { FilterSection } from "./filter-section"
// import { LoadingGrid } from "./loading-grid"
// import { ErrorMessage } from "./error-message"

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
  createdAt: string
  updatedAt: string
}

interface Category {
  _id: string
  name: string
  createdAt: string
  updatedAt: string
}

interface ProductsResponse {
  status: boolean
  message: string
  data: {
    products: Product[]
    pagination: {
      currentPage: number
      totalPages: number
      totalData: number
      hasNextPage: boolean
      hasPrevPage: boolean
    }
  }
}

interface CategoriesResponse {
  status: boolean
  message: string
  data: {
    categories: Category[]
    pagination: {
      currentPage: number
      totalPages: number
      totalData: number
      hasNextPage: boolean
      hasPrevPage: boolean
    }
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

async function fetchProducts(): Promise<ProductsResponse> {
  const response = await fetch(`${BASE_URL}/product`)
  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }
  return response.json()
}

async function fetchCategories(): Promise<CategoriesResponse> {
  const response = await fetch(`${BASE_URL}/category`)
  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }
  return response.json()
}

export function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [priceSort, setPriceSort] = useState<"asc" | "desc" | "none">("none")

  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  })

  if (productsLoading || categoriesLoading) {
    return <LoadingGrid />
  }

  if (productsError) {
    return <ErrorMessage message="Failed to load products. Please try again." />
  }

  const products = productsData?.data.products || []
  const categories = categoriesData?.data.categories || []

  // Filter and sort products
  let filteredProducts = products

  // Filter by category
  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter((product) => product.category?._id === selectedCategory)
  }

  // Sort by price
  if (priceSort !== "none") {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      return priceSort === "asc" ? a.price - b.price : b.price - a.price
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        {/* <h1 className="text-3xl font-bold text-white mb-6">Product Catalog</h1> */}
        <FilterSection
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceSort={priceSort}
          onPriceSortChange={setPriceSort}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
