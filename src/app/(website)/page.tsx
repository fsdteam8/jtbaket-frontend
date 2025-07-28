import FooterBannar from "@/components/footerBannar";
import { HeroSection } from "@/components/section/hero-section";
import MissionSection from "@/components/section/mission-section";
// import { ClientThemeProvider } from '@/lib/client-theme-provider'
// import { ColorFetcher } from '@/lib/color-featcher'

const HomePage = () => {
  return (
    //  <ClientThemeProvider>
    <div className="min-h-screen">
      {/* <ColorFetcher /> */}
      <HeroSection />
      <MissionSection />
      <div className="bg-[#F2F9F2]">
        <div className="container">
          <FooterBannar />
        </div>
      </div>
    </div>
    // </ClientThemeProvider>
  );
};

export default HomePage;
