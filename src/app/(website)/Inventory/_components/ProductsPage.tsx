"use client";

import Image from "next/image";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ProductResponse } from "../../../../../types/ProductDataType";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ProductsPage() {
  const session = useSession();
  const [isLoadingAdd, setIsLoading] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<ProductResponse>({
    queryKey: ["Product", currentPage],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product?page=${currentPage}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  const products = data?.data.products;
  const pagination = data?.data.pagination;

  const addToFavoritesMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/favorite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: id }),
        }
      );

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || "Failed to add to favorites");
      }
      return resData;
    },
    onSuccess: (success) => {
      setIsLoading("");
      toast.success(success.message || "Added to Favorites");
      queryClient.invalidateQueries({ queryKey: ["getMyFavorites"] });
    },
    onError: (error) => {
      setIsLoading("");
      toast.error(error.message || "Something went wrong");
    },
  });

  const addToFavorites = (id: string) => {
    setIsLoading(id);
    if (!token) return router.push("/login");
    addToFavoritesMutation.mutate(id);
  };

  const renderSkeletons = () => {
    return Array.from({ length: 4 }).map((_, i) => (
      <Card key={i} className="overflow-hidden">
        <CardContent className="p-0 flex">
          <Skeleton className="w-32 h-32" />
          <div className="flex-1 p-4 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-8 w-full mt-4" />
          </div>
        </CardContent>
      </Card>
    ));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
            <p className="text-gray-600 mt-1">
              Browse our collection of premium products
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading
            ? renderSkeletons()
            : products?.map((product) => (
                <Card
                  key={product._id}
                  className="overflow-hidden shadow-none border-none transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="w-[296px] h-[375px] relative group p-4 shadow-lg rounded-lg">
                        <Image
                          src={product.thumbnail}
                          alt={product.name}
                          width={900}
                          height={900}
                          className="w-full rounded-lg h-full object-cover"
                        />
                        <button
                          onClick={() => {
                            setSelectedImage(product.thumbnail);
                            setIsModalOpen(true);
                          }}
                          className="absolute top-[50%] right-[50%] bg-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Plus className="w-5 h-5 text-gray-800" />
                        </button>
                      </div>

                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {product.name}
                          </h3>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600 mb-3">
                          <div>
                            Product ID:{" "}
                            <span className="text-blue-600">
                              {product.productId}
                            </span>
                          </div>
                          <div>Quantity: {product.quantity}</div>
                          <div>Type: {product.type}</div>
                          <div className="font-semibold text-green-600">
                            Price: ₹{product.price.toLocaleString()}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mb-3 line-clamp-3">
                          {product.description}
                        </p>
                        <Button
                          onClick={() => addToFavorites(product._id)}
                          disabled={isLoadingAdd === product._id}
                          className="w-full bg-transparent hover:bg-primary hover:text-white border-primary border rounded-full text-primary text-sm py-2"
                        >
                          {isLoadingAdd === product._id
                            ? "Added to Favorites"
                            : "Add to favorites"}{" "}
                          <Heart className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>

        {/* Pagination */}
        {pagination && !isLoading && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      pagination.hasPrevPage &&
                      handlePageChange(pagination.currentPage - 1)
                    }
                    className={
                      !pagination.hasPrevPage
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
                {Array.from({ length: pagination.totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => handlePageChange(i + 1)}
                      isActive={pagination.currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      pagination.hasNextPage &&
                      handlePageChange(pagination.currentPage + 1)
                    }
                    className={
                      !pagination.hasNextPage
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl bg-white/70">
          <DialogHeader>
            <DialogTitle>Product Preview</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="w-full h-[500px]">
              <Image
                src={selectedImage}
                alt="Preview"
                width={1000}
                height={1000}
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}