import { Company, RecentComplaint } from './types';

// Generate mock chart data for each company - Daily data for 30 days
export const generateChartData = (baseVisits: number, baseComplaints: number) => {
  const data = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en', { month: 'short' });
    const dayOfWeek = date.toLocaleString('en', { weekday: 'short' });

    // Create variation in the data
    const dayIndex = 29 - i;
    const visitMultiplier = 0.3 + (dayIndex * 0.02) + (Math.sin(dayIndex * 0.5) * 0.15);
    const complaintMultiplier = 0.1 + (Math.random() * 0.3) + (dayIndex > 20 ? 0.2 : 0);

    data.push({
      date: `${day} ${month} ${dayOfWeek}`,
      shortDate: `${day} ${month}`,
      visitors: Math.round(baseVisits * visitMultiplier / 30),
      complaints: Math.round(baseComplaints * complaintMultiplier / 30),
    });
  }

  return data;
};

// Generate mock recent complaints (only for some companies)
export const generateRecentComplaints = (hasComplaints: boolean): RecentComplaint[] => {
  if (!hasComplaints) return [];

  const names = ['Марко', 'Ана', 'Петар', 'Елена', 'Игор'];
  const titles = [
    'Проблем со наплата и неточна сметка за последниот месец',
    'Услугата не работи веќе 3 дена, без одговор од поддршка',
    'Бавен одговор на рекламација за производ',
    'Прекин на услуга без претходно известување',
    'Неисправен производ и одбиено враќање на пари',
  ];

  const count = Math.floor(Math.random() * 3) + 2; // 2-4 complaints
  return Array.from({ length: Math.min(count, 5) }, (_, i) => ({
    id: `complaint-${i}`,
    userName: names[i % names.length],
    userInitial: names[i % names.length].charAt(0),
    views: Math.floor(Math.random() * 800) + 100,
    date: `0${i + 1} Jan 12:${30 + i}`,
    title: titles[i % titles.length],
    commentCount: Math.floor(Math.random() * 5),
  }));
};

// Generate mini sparkline points for header
export const generateSparklinePoints = (trend: 'up' | 'down') => {
  if (trend === 'up') {
    return "0,20 15,18 30,22 45,15 60,12 75,8 90,5";
  }
  return "0,5 15,8 30,6 45,12 60,15 75,18 90,20";
};

// Mock data for 10 companies - some have recent complaints, some don't
export const trendingCompanies: Company[] = [
  {
    id: '1',
    rank: 1,
    name: 'EVN Makedonija',
    slug: 'evn-makedonija',
    logo: undefined,
    category: 'Energy',
    visits30Days: 45600,
    newComplaints30Days: 342,
    trend: 'up',
    trendPercentage: 278,
    chartData: generateChartData(45600, 342),
    recentComplaints: generateRecentComplaints(true),
  },
  {
    id: '2',
    rank: 2,
    name: 'Makedonski Telekom',
    slug: 'makedonski-telekom',
    logo: undefined,
    category: 'Telecommunications',
    visits30Days: 38900,
    newComplaints30Days: 287,
    trend: 'up',
    trendPercentage: 223,
    chartData: generateChartData(38900, 287),
    recentComplaints: generateRecentComplaints(true),
  },
  {
    id: '3',
    rank: 3,
    name: 'A1 Makedonija',
    slug: 'a1-makedonija',
    logo: undefined,
    category: 'Telecommunications',
    visits30Days: 29800,
    newComplaints30Days: 156,
    trend: 'up',
    trendPercentage: 189,
    chartData: generateChartData(29800, 156),
    recentComplaints: generateRecentComplaints(false),
  },
  {
    id: '4',
    rank: 4,
    name: 'Neptun',
    slug: 'neptun',
    logo: undefined,
    category: 'Retail',
    visits30Days: 27500,
    newComplaints30Days: 198,
    trend: 'down',
    trendPercentage: 145,
    chartData: generateChartData(27500, 198),
    recentComplaints: generateRecentComplaints(true),
  },
  {
    id: '5',
    rank: 5,
    name: 'Komercijalna Banka',
    slug: 'komercijalna-banka',
    logo: undefined,
    category: 'Banking',
    visits30Days: 21300,
    newComplaints30Days: 89,
    trend: 'up',
    trendPercentage: 134,
    chartData: generateChartData(21300, 89),
    recentComplaints: generateRecentComplaints(false),
  },
  {
    id: '6',
    rank: 6,
    name: 'NLB Banka',
    slug: 'nlb-banka',
    logo: undefined,
    category: 'Banking',
    visits30Days: 18900,
    newComplaints30Days: 67,
    trend: 'up',
    trendPercentage: 112,
    chartData: generateChartData(18900, 67),
    recentComplaints: generateRecentComplaints(true),
  },
  {
    id: '7',
    rank: 7,
    name: 'Tinex',
    slug: 'tinex',
    logo: undefined,
    category: 'Retail',
    visits30Days: 15600,
    newComplaints30Days: 78,
    trend: 'down',
    trendPercentage: 98,
    chartData: generateChartData(15600, 78),
    recentComplaints: generateRecentComplaints(false),
  },
  {
    id: '8',
    rank: 8,
    name: 'Vero',
    slug: 'vero',
    logo: undefined,
    category: 'Retail',
    visits30Days: 12400,
    newComplaints30Days: 54,
    trend: 'up',
    trendPercentage: 87,
    chartData: generateChartData(12400, 54),
    recentComplaints: generateRecentComplaints(true),
  },
  {
    id: '9',
    rank: 9,
    name: 'Ohridska Banka',
    slug: 'ohridska-banka',
    logo: undefined,
    category: 'Banking',
    visits30Days: 9800,
    newComplaints30Days: 41,
    trend: 'down',
    trendPercentage: 65,
    chartData: generateChartData(9800, 41),
    recentComplaints: generateRecentComplaints(false),
  },
  {
    id: '10',
    rank: 10,
    name: 'City Mall',
    slug: 'city-mall',
    logo: undefined,
    category: 'Retail',
    visits30Days: 8500,
    newComplaints30Days: 32,
    trend: 'up',
    trendPercentage: 54,
    chartData: generateChartData(8500, 32),
    recentComplaints: generateRecentComplaints(true),
  },
];
