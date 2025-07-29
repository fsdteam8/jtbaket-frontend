"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Plus } from "lucide-react";
import { Category, CategoryResponse } from "../../../../../types/CategoryType";
import { ProductResponse } from "../../../../../types/ProductDataType";

export default function ProductsPage() {
  const session = useSession();
  const [isLoadingAdd, setIsLoading] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceSort, setPriceSort] = useState<"asc" | "desc" | null>(null);

  const router = useRouter();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  const queryClient = useQueryClient();

  // Category query
  const { data: categoryData } = useQuery<CategoryResponse>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
  });

  // Product query with backend filters (except priceSort)
  const { data, isLoading } = useQuery<ProductResponse>({
    queryKey: ["Product", currentPage, selectedCategory],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("page", String(currentPage));
      if (selectedCategory !== "all") {
        params.append("category", selectedCategory);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product?${params.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
    //  enabled: !!token,
  });

  const products = useMemo(() => {
    if (!data?.data?.products) return [];

    const sorted = [...data.data.products];
    if (priceSort === "asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (priceSort === "desc") {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [data, priceSort]);

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

  const renderSkeletons = () =>
    Array.from({ length: 4 }).map((_, i) => (
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:py-8  ">
        {/* Filters */}
        <div className="flex justify-between  mb-[46px] items-center  gap-4">
          <div className="text-sm text-gray-700 md:block hidden">
            Filter by :
          </div>

          {/* Category Filter */}
          <Select
            onValueChange={(val) => {
              setSelectedCategory(val);
              setCurrentPage(1);
            }}
            value={selectedCategory}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Categories</SelectItem>
              {categoryData?.data.categories.map((cat: Category) => (
                <SelectItem key={cat._id} value={cat._id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Price Sort Filter */}
          <Select
            onValueChange={(val: "asc" | "desc") => {
              setPriceSort(val);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Prices" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="asc">Price: Low to High</SelectItem>
              <SelectItem value="desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {isLoading
            ? renderSkeletons()
            : products?.map((product) => (
                <Card
                  key={product._id}
                  className="overflow-hidden shadow-lg bg-white transition-shadow h-full"
                >
                  <CardContent className="p-0 h-full bg-white">
                    <div className="flex flex-col lg:flex-row h-full">
                      {/* Image Section */}
                      <div className="relative group p-4  w-full lg:w-[296px] h-[300px] lg:h-auto">
                        <div className="w-full max-h-[250px] rounded-l-xl overflow-hidden shadow-none">
                          <Image
                            src={product.thumbnail}
                            alt={product.name}
                            width={900}
                            height={900}
                            className="w-full h-full rounded-l-xl object-cover"
                          />
                        </div>
                        <button
                          onClick={() => {
                            setSelectedImage(product.thumbnail);
                            setIsModalOpen(true);
                          }}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Plus className="w-5 h-5 text-gray-800" />
                        </button>
                      </div>

                      {/* Info Section */}
                      <div className="flex flex-col justify-between p-4 flex-1">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {product.name}
                          </h3>
                          <div className="text-sm text-gray-600 space-y-1 mb-3">
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
                        </div>

                        <Button
                          onClick={() => addToFavorites(product._id)}
                          disabled={isLoadingAdd === product._id}
                          className={`w-full bg-transparent hover:bg-primary hover:text-white border-primary border rounded-full text-primary text-sm py-2 mt-2 ${
                            product.isFavorited
                              ? "bg-red-500 border-red-500 text-white hover:bg-red-500/80"
                              : ""
                          }`}
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
