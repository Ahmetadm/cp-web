// Types for Trend 100 components

export interface RecentComplaint {
  id: string;
  userName: string;
  userInitial: string;
  views: number;
  date: string;
  title: string;
  commentCount: number;
}

export interface Company {
  id: string;
  rank: number;
  name: string;
  slug: string;
  logo: string | undefined;
  category: string;
  visits30Days: number;
  newComplaints30Days: number;
  trend: 'up' | 'down';
  trendPercentage: number;
  chartData: { date: string; shortDate?: string; visitors: number; complaints: number }[];
  recentComplaints: RecentComplaint[];
}
