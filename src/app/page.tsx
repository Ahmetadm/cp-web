import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { RecentComplaintsSection } from "@/components/sections/RecentComplaintsSection";
import { FeaturedCompaniesSection } from "@/components/sections/FeaturedCompaniesSection";
import { StatisticsSection } from "@/components/sections/StatisticsSection";
import { TrendingSection } from "@/components/sections/TrendingSection";
import { TopCompaniesSection } from "@/components/sections/TopCompaniesSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <RecentComplaintsSection />
        <FeaturedCompaniesSection />
        <StatisticsSection />
        <TrendingSection />
        <TopCompaniesSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
