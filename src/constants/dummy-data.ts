import { Company, Complaint, Category, Statistic } from '@/types';

export const dummyCompanies: Company[] = [
  {
    id: '1',
    name: 'Makedonski Telekom',
    slug: 'makedonski-telekom',
    logo: undefined,
    rating: 3.8,
    totalComplaints: 1245,
    resolvedComplaints: 892,
    responseRate: 78,
  },
  {
    id: '2',
    name: 'EVN Makedonija',
    slug: 'evn-makedonija',
    logo: undefined,
    rating: 3.2,
    totalComplaints: 2100,
    resolvedComplaints: 1456,
    responseRate: 65,
  },
  {
    id: '3',
    name: 'A1 Makedonija',
    slug: 'a1-makedonija',
    logo: undefined,
    rating: 4.1,
    totalComplaints: 890,
    resolvedComplaints: 756,
    responseRate: 85,
  },
  {
    id: '4',
    name: 'Komercijalna Banka',
    slug: 'komercijalna-banka',
    logo: undefined,
    rating: 3.9,
    totalComplaints: 567,
    resolvedComplaints: 489,
    responseRate: 82,
  },
  {
    id: '5',
    name: 'NLB Banka',
    slug: 'nlb-banka',
    logo: undefined,
    rating: 4.0,
    totalComplaints: 432,
    resolvedComplaints: 398,
    responseRate: 88,
  },
  {
    id: '6',
    name: 'Neptun',
    slug: 'neptun',
    logo: undefined,
    rating: 3.5,
    totalComplaints: 789,
    resolvedComplaints: 534,
    responseRate: 72,
  },
];

export const dummyComplaints: Complaint[] = [
  {
    id: '1',
    title: 'Неисправна испорака на производ',
    content: 'Нарачав телевизор пред две недели и сè уште не е испорачан. Сервисот за корисници не одговара на повиците...',
    company: {
      id: '6',
      name: 'Neptun',
      slug: 'neptun',
      logo: undefined,
    },
    status: 'pending',
    createdAt: '2024-12-28T10:30:00Z',
    author: {
      name: 'Марко С.',
      avatar: undefined,
    },
    viewCount: 234,
    commentCount: 12,
  },
  {
    id: '2',
    title: 'Погрешна сметка за струја',
    content: 'Добив сметка од 15.000 денари за еден месец што е невозможно за мојот мал стан. Барам ревизија на мерењето...',
    company: {
      id: '2',
      name: 'EVN Makedonija',
      slug: 'evn-makedonija',
      logo: undefined,
    },
    status: 'in_progress',
    createdAt: '2024-12-27T14:15:00Z',
    author: {
      name: 'Ана П.',
      avatar: undefined,
    },
    viewCount: 567,
    commentCount: 23,
  },
  {
    id: '3',
    title: 'Интернет прекини секој ден',
    content: 'Веќе месец дена имам секојдневни прекини на интернетот. Техничарите доаѓаат но проблемот не се решава...',
    company: {
      id: '1',
      name: 'Makedonski Telekom',
      slug: 'makedonski-telekom',
      logo: undefined,
    },
    status: 'resolved',
    createdAt: '2024-12-26T09:00:00Z',
    author: {
      name: 'Петар К.',
      avatar: undefined,
    },
    viewCount: 892,
    commentCount: 45,
  },
  {
    id: '4',
    title: 'Неовластена наплата на картичка',
    content: 'Забележав трансакција од 50 евра на мојата картичка која не сум ја направил. Банката не сака да помогне...',
    company: {
      id: '4',
      name: 'Komercijalna Banka',
      slug: 'komercijalna-banka',
      logo: undefined,
    },
    status: 'pending',
    createdAt: '2024-12-25T16:45:00Z',
    author: {
      name: 'Сара М.',
      avatar: undefined,
    },
    viewCount: 345,
    commentCount: 18,
  },
  {
    id: '5',
    title: 'Лоша покриеност со сигнал',
    content: 'Во целиот мој крај сигналот е толку слаб што не можам да правам повици. Плаќам за услуга која не ја добивам...',
    company: {
      id: '3',
      name: 'A1 Makedonija',
      slug: 'a1-makedonija',
      logo: undefined,
    },
    status: 'in_progress',
    createdAt: '2024-12-24T11:20:00Z',
    author: {
      name: 'Игор Т.',
      avatar: undefined,
    },
    viewCount: 178,
    commentCount: 8,
  },
  {
    id: '6',
    title: 'Проблем со мобилно банкарство',
    content: 'Апликацијата за мобилно банкарство не работи веќе три дена. Не можам да пристапам до мојата сметка...',
    company: {
      id: '5',
      name: 'NLB Banka',
      slug: 'nlb-banka',
      logo: undefined,
    },
    status: 'resolved',
    createdAt: '2024-12-23T08:30:00Z',
    author: {
      name: 'Елена В.',
      avatar: undefined,
    },
    viewCount: 423,
    commentCount: 15,
  },
];

export const dummyCategories: Category[] = [
  {
    id: '1',
    name: 'Telecommunications',
    slug: 'telekomunikacii',
    icon: 'Radio',
    complaintCount: 3450,
  },
  {
    id: '2',
    name: 'Banking & Finance',
    slug: 'banki-finansii',
    icon: 'Landmark',
    complaintCount: 2890,
  },
  {
    id: '3',
    name: 'Energy',
    slug: 'energetika',
    icon: 'Zap',
    complaintCount: 2100,
  },
  {
    id: '4',
    name: 'E-commerce',
    slug: 'e-trgovija',
    icon: 'ShoppingCart',
    complaintCount: 1870,
  },
  {
    id: '5',
    name: 'Transport',
    slug: 'transport',
    icon: 'Bus',
    complaintCount: 980,
  },
  {
    id: '6',
    name: 'Insurance',
    slug: 'osiguruvanje',
    icon: 'Shield',
    complaintCount: 756,
  },
  {
    id: '7',
    name: 'Health',
    slug: 'zdravstvo',
    icon: 'Stethoscope',
    complaintCount: 654,
  },
  {
    id: '8',
    name: 'Tourism',
    slug: 'turizam',
    icon: 'Plane',
    complaintCount: 543,
  },
];

export const dummyStatistics: Statistic[] = [
  {
    id: '1',
    label: 'totalComplaints', // Changed to key
    value: '45,678',
    icon: 'FileText',
    description: 'totalComplaintsDesc', // Changed to key
  },
  {
    id: '2',
    label: 'resolvedComplaints', // Changed to key
    value: '32,456',
    icon: 'CheckCircle',
    description: 'resolvedComplaintsDesc', // Changed to key
  },
  {
    id: '3',
    label: 'registeredCompanies', // Changed to key
    value: '1,234',
    icon: 'Building2',
    description: 'registeredCompaniesDesc', // Changed to key
  },
  {
    id: '4',
    label: 'satisfiedUsers', // Changed to key
    value: '28,900',
    icon: 'Smile',
    description: 'satisfiedUsersDesc', // Changed to key
  },
];
