import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const AccountSkeleton = () => {

    return (
        <div className="min-h-screen bg-[#F8FEFF] py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-lg shadow-sm p-6 mb-6">
                    <Skeleton className="h-8 w-40 mb-6 mx-auto" />

                    <div className="flex flex-col items-start gap-[24px] mb-[42px]">
                        <Skeleton className="h-5 w-40 mb-4" />
                        <div className="flex items-center gap-6">
                            <Skeleton className="w-40 h-40 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-4 w-40" />
                                <Skeleton className="h-4 w-48" />
                            </div>
                        </div>
                        <div className="flex justify-between w-full mt-4">
                            <Skeleton className="h-10 w-32 rounded-full" />
                            <Skeleton className="h-6 w-20" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Skeleton className="h-5 w-28" />
                        <Skeleton className="h-10 w-full rounded" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Skeleton className="h-5 w-28" />
                                <Skeleton className="h-10 w-full rounded" />
                            </div>
                            <div>
                                <Skeleton className="h-5 w-28" />
                                <Skeleton className="h-10 w-full rounded" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Skeleton className="h-5 w-28" />
                                <Skeleton className="h-10 w-full rounded" />
                            </div>
                            <div>
                                <Skeleton className="h-5 w-28" />
                                <Skeleton className="h-10 w-full rounded" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Skeleton className="h-5 w-28" />
                                <Skeleton className="h-10 w-full rounded" />
                            </div>
                            <div>
                                <Skeleton className="h-5 w-28" />
                                <Skeleton className="h-10 w-full rounded" />
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-6">
                            <Skeleton className="h-10 w-24 rounded-full" />
                            <Skeleton className="h-10 w-36 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AccountSkeleton