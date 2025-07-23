import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { ContactSection } from '@/components/section/contact-section'
import { HeroSection } from '@/components/section/hero-section'
import { MissionSection } from '@/components/section/mission-section'
// import { ClientThemeProvider } from '@/lib/client-theme-provider'
// import { ColorFetcher } from '@/lib/color-featcher'
import React from 'react'

const HomePage = () => {
  return (
    //  <ClientThemeProvider>
      <div className="min-h-screen">
        {/* <ColorFetcher /> */}
        <Navbar />
        <HeroSection />
        <MissionSection />
        <ContactSection />
        <Footer />
      </div>
    // </ClientThemeProvider>
  )
}

export default HomePage
