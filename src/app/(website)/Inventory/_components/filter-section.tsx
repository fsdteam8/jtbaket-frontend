"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface Category {
  _id: string
  name: string
}

interface FilterSectionProps {
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  priceSort: "asc" | "desc" | "none"
  onPriceSortChange: (sort: "asc" | "desc" | "none") => void
}

export function FilterSection({
  categories,
  selectedCategory,
  onCategoryChange,
  priceSort,
  onPriceSortChange,
}: FilterSectionProps) {
  return (
    <div className=" p-6 rounded-lg ">
      <h2 className="text-black text-lg font-semibold mb-4">Filter by:</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="category" className="text-black">
            Category
          </Label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="bg-white border-gray-300 text-black">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300">
              <SelectItem value="all" className="text-black hover:bg-gray-100">
                All Categories
              </SelectItem>
              {categories.map((category) => (
                <SelectItem
                  key={category._id}
                  value={category._id}
                  className="text-black hover:bg-gray-100"
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price" className="text-black">
            Price
          </Label>
          <Select
            value={priceSort}
            onValueChange={(value: "asc" | "desc" | "none") =>
              onPriceSortChange(value)
            }
          >
            <SelectTrigger className="bg-white border-gray-300 text-black">
              <SelectValue placeholder="Sort by price" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300">
              <SelectItem value="none" className="text-black hover:bg-gray-100">
                No Sorting
              </SelectItem>
              <SelectItem value="asc" className="text-black hover:bg-gray-100">
                Price: Low to High
              </SelectItem>
              <SelectItem value="desc" className="text-black hover:bg-gray-100">
                Price: High to Low
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
