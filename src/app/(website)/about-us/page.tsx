import React from 'react'
import { AboutSection } from './_components/AboutSection'
import BannerSection from '@/components/homeHeaders/BannerSection'

const page = () => {
  return (
    <div>
        <BannerSection image='/password.jpg'/>
        <AboutSection/>
    </div>
  )
}

export default page