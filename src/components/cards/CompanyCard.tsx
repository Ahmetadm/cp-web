import React from 'react';
import Link from 'next/link';
import { Company } from '@/types';
import { useTranslations } from '@/i18n';

interface CompanyCardProps {
  company: Company;
  variant?: 'default' | 'compact';
}

export function CompanyCard({ company, variant = 'default' }: CompanyCardProps) {
  const t = useTranslations();
  const ratingColor = company.rating >= 4 ? 'text-emerald-500' : company.rating >= 3 ? 'text-amber-500' : 'text-red-500';
  const ratingBg = company.rating >= 4 ? 'bg-emerald-50' : company.rating >= 3 ? 'bg-amber-50' : 'bg-red-50';

  if (variant === 'compact') {
    return (
      <Link href={`/companies/${company.slug}`}>
        <div className="group flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-lg font-bold text-indigo-600">
            {company.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
              {company.name}
            </h4>
            <p className="text-xs text-gray-500">{company.totalComplaints} {t.company.complaints}</p>
          </div>
          <div className={`px-2 py-1 rounded-lg ${ratingBg} ${ratingColor} text-sm font-semibold`}>
            {company.rating.toFixed(1)}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/companies/${company.slug}`}>
      <div className="group bg-white rounded-2xl border border-gray-100 p-6 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-2xl font-bold text-indigo-600 group-hover:scale-110 transition-transform duration-300">
            {company.name.charAt(0)}
          </div>
          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl ${ratingBg} ${ratingColor} font-bold`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{company.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Company Name */}
        <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
          {company.name}
        </h3>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-gray-900">{company.totalComplaints}</p>
            <p className="text-xs text-gray-500">{t.company.complaints}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-emerald-600">{company.responseRate}%</p>
            <p className="text-xs text-gray-500">{t.company.responseRate}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{t.company.resolvedComplaints}</span>
            <span>{Math.round((company.resolvedComplaints / company.totalComplaints) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${(company.resolvedComplaints / company.totalComplaints) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
