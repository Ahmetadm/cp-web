// Core type definitions for the complaints platform

export interface Company {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  rating: number;
  totalComplaints: number;
  resolvedComplaints: number;
  responseRate: number;
}

export interface Complaint {
  id: string;
  title: string;
  content: string;
  company: Pick<Company, 'id' | 'name' | 'logo' | 'slug'>;
  status: ComplaintStatus;
  createdAt: string;
  author: {
    name: string;
    avatar?: string;
  };
  viewCount: number;
  commentCount: number;
}

export type ComplaintStatus = 'pending' | 'in_progress' | 'resolved' | 'rejected';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  complaintCount: number;
}

export interface Statistic {
  id: string;
  label: string;
  value: string | number;
  icon: string;
  description?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}
