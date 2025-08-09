"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Trash2 } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { FavoriteProductsResponse } from "../../../../../types/FavoriteProductsDataType"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"

export default function FavoritesPage() {
  const session = useSession()
  const [isLoadingDelete, setIsLoading] = useState<string>("")

  const token = (session?.data?.user as { accessToken: string })?.accessToken
  const queryClient = useQueryClient()

  const {
    data: myFavorites,
    isLoading,
  } = useQuery<FavoriteProductsResponse>({
    queryKey: ["getMyFavorites"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/favorite/my`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) throw new Error("Failed to fetch favorites")
      return res.json()
    },
  })

  const removeToFavoritesMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/favorite/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const resData = await response.json()
      if (!response.ok) throw new Error(resData.message || "Failed to remove from favorites")
      return resData
    },
    onSuccess: (success) => {
      toast.success(success.message)
      queryClient.invalidateQueries({ queryKey: ["getMyFavorites"] })
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong")
    },
  })

  const removeFromFavorites = (id: string) => {
    setIsLoading(id)
    removeToFavoritesMutation.mutate(id)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/Inventory">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              Back to Products
            </Button>
          </Link>
        </div>

        {myFavorites && myFavorites?.data?.length > 0 && (
          <div className="text-center mb-14">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
              My Favorites
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Here are the products you&apoch;ve saved. You can remove items or contact us to learn more.
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="w-full h-full">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row h-full">
                    <Skeleton className="w-full sm:w-32 h-32 sm:h-40" />
                    <div className="flex-1 p-4 space-y-3">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-3 w-2/3" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : myFavorites?.data?.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              Start browsing products and add them to your favorites!
            </p>
            <Link href="/">
              <Button className="bg-primary text-white text-sm sm:text-base px-4 sm:px-6">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {myFavorites?.data?.map((product) => (
              <Card key={product?._id} className="overflow-hidden shadow-none border-none h-full">
                <CardContent className="p-0 h-full">
                  <div className="flex flex-col lg:flex-row h-full">
                    <div className="w-full bg-white rounded-lg shadow-lg lg:w-[296px] h-[250px] lg:h-auto flex-shrink-0 p-4">
                      <div className="w-full max-h-[250px] overflow-hidden  rounded-lg shadow-lg">
                        <Image
                          src={product?.product?.thumbnail}
                          alt={product?.product?.name}
                          width={900}
                          height={900}
                          className="w-full h-full rounded-xl object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    </div>

                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1">
                          {product?.product?.name}
                        </h3>
                        <div className="space-y-1 text-xs sm:text-sm text-gray-600 mb-3">
                          <div>
                            Product ID: <span className="text-blue-600">{product?.product?._id}</span>
                          </div>
                          <div>Quantity: {product?.product?.quantity}</div>
                          <div>Type: {product?.product?.type}</div>
                          <div className="font-semibold text-green-600">
                            Price: ₹{product?.product?.price?.toLocaleString()}
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mb-3 line-clamp-3">
                          {product?.product?.description}
                        </p>
                      </div>

                      <Button
                        onClick={() => removeFromFavorites(product?.product?._id)}
                        disabled={isLoadingDelete === product?.product?._id}
                        variant="destructive"
                        className="w-full bg-transparent border border-[#FF3333] rounded-full hover:bg-[#FF3333] text-red-500 hover:text-white text-xs sm:text-sm py-2 sm:py-3 flex items-center justify-center gap-2 mt-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        {isLoadingDelete === product?.product?._id ? "Remove..." : "Remove"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
