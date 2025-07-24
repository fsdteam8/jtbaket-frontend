import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function LoadingGrid() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-8 w-48 mb-6 bg-gray-200" />
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <Skeleton className="h-6 w-24 mb-4 bg-gray-100" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-10 bg-gray-100" />
            <Skeleton className="h-10 bg-gray-100" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="bg-white border border-gray-200 shadow-sm">
            <Skeleton className="aspect-square bg-gray-200" />
            <CardContent className="p-4 space-y-3">
              <Skeleton className="h-6 bg-gray-100" />
              <Skeleton className="h-4 w-24 bg-gray-100" />
              <Skeleton className="h-4 w-20 bg-gray-100" />
              <Skeleton className="h-6 w-16 bg-gray-100" />
              <Skeleton className="h-12 bg-gray-100" />
              <Skeleton className="h-10 bg-gray-100" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
