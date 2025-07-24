import React from 'react'
// import ProductsPage from './_components/ProductsPage'
import BannerSection from '@/components/homeHeaders/BannerSection'
import { ProductCatalog } from './_components/product-catalog'

const page = () => {
    return (
        <div>
                   <BannerSection image='/password.jpg' title='Browse Our All Products' description="High-quality products for every need – Indoor & Outdoor High-quality products for every"/>
            {/* <ProductsPage /> */}
            <ProductCatalog/>
        </div>
    )
}

export default page