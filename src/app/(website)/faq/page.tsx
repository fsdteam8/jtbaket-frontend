import React from 'react'
import { FAQAccordion } from './_components/FAQAccordion'
import BannerSection from '@/components/homeHeaders/BannerSection'

const page = () => {
    return (
        <div>
            <BannerSection image='/account.jpg' />
            <FAQAccordion />
        </div>
    )
}

export default page