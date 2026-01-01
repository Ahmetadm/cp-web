'use client';

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useTranslations } from '@/i18n';
import {
  Trend100HeroSection,
  CompanyList,
  trendingCompanies,
} from '@/components/sections/trend-100';

export default function Trend100Page() {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <Trend100HeroSection
          translations={{
            last30Days: t.trend100?.last30Days,
            title: t.trend100?.title,
            subtitle: t.trend100?.subtitle,
            visits: t.trend100?.visits,
            complaints: t.trend100?.complaints,
            companies: t.trend100?.companies,
          }}
          stats={{
            totalVisits: '228K+',
            totalComplaints: '1.3K+',
            totalCompanies: 10,
          }}
        />

        <CompanyList
          companies={trendingCompanies}
          translations={{
            chartTitle: t.trend100?.chartTitle,
            visitors: t.trend100?.visitors,
            complaintCount: t.trend100?.complaintCount,
            last7DaysComplaints: t.trend100?.last7DaysComplaints,
            wantToSeeMore: t.trend100?.wantToSeeMore,
            viewFullRankings: t.trend100?.viewFullRankings,
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
