import React from 'react'
import ProductsPage from './_components/ProductsPage'
import BannerSection from '@/components/homeHeaders/BannerSection'

const page = () => {
    return (
        <div>
                   <BannerSection image='/password.jpg' title='Browse Our All Products' description="High-quality products for every need – Indoor & Outdoor High-quality products for every"/>
            <ProductsPage />
        </div>
    )
}

export default page