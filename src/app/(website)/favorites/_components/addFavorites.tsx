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
  const [isLoadingDelete, setIsLoading] = useState<string>('');

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
      if (!response.ok) {
        throw new Error(resData.message || "Failed to remove from favorites")
      }
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
  if (myFavorites?.data?.length === 0) {

  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Button>
          </Link>
        </div>

        {(myFavorites && myFavorites?.data?.length > 0) && (
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">My Favorites</h1>
            <p className="text-gray-600">
              Here are the products you&apos;ve saved. You can remove items or contact us to learn more.
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-0">
                  <div className="flex">
                    <Skeleton className="w-32 h-32" />
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
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
            <p className="text-gray-600 mb-4">Start browsing products and add them to your favorites!</p>
            <Link href="/">
              <Button className="bg-primary text-white">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {myFavorites?.data?.map((product) => (
              <Card key={product._id} className="overflow-hidden border-none shadow-none  transition-shadow">
                <CardContent className="p-0">
                  <div className="flex ">
                    <div className="w-[296px] h-[375px] flex-shrink-0 p-4 shadow-lg rounded-lg">
                      <Image
                        src={product?.product?.thumbnail}
                        alt={product?.product?._id}
                        width={900}
                        height={900}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{product?.product?.name}</h3>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <div>
                          Product ID: <span className="text-blue-600">{product?.product?._id}</span>
                        </div>
                        <div>Quantity: {product?.product?.quantity}</div>
                        <div>Type: {product?.product?.type}</div>
                        <div className="font-semibold text-green-600">Price: ₹{product?.product?.price?.toLocaleString()}</div>
                      </div>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-3">{product?.product?.description}</p>
                      <Button
                        onClick={() => removeFromFavorites(product.product._id)}
                        disabled={isLoadingDelete === product.product._id}
                        variant="destructive"
                        className="w-full bg-transparent border border-[#FF3333] rounded-full hover:bg-[#FF3333] text-red-500 hover:text-white text-sm py-2 flex items-center justify-center gap-2"
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
