import React from 'react';
import Link from 'next/link';
import { Complaint } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { useTranslations, useLocale } from '@/i18n';

interface ComplaintCardProps {
  complaint: Complaint;
  variant?: 'default' | 'compact' | 'featured';
}

export function ComplaintCard({ complaint, variant = 'default' }: ComplaintCardProps) {
  const t = useTranslations();
  const { locale } = useLocale();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    let localeString = 'en-US';
    if (locale === 'mk') localeString = 'mk-MK';
    if (locale === 'sq') localeString = 'sq-AL';

    return date.toLocaleDateString(localeString, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (variant === 'compact') {
    return (
      <Link href={`/complaints/${complaint.id}`}>
        <article className="group p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                {complaint.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{complaint.company.name}</p>
            </div>
            <Badge status={complaint.status} size="sm" />
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link href={`/complaints/${complaint.id}`}>
        <article className="group relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-indigo-500/25">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            <Badge status={complaint.status} />
            <h3 className="text-xl font-bold mt-4 line-clamp-2">{complaint.title}</h3>
            <p className="text-white/80 mt-2 line-clamp-2">{complaint.content}</p>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
              <span className="text-white/90 font-medium">{complaint.company.name}</span>
              <span className="text-white/70 text-sm">{formatDate(complaint.createdAt)}</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/complaints/${complaint.id}`}>
      <article className="group bg-white rounded-2xl border border-gray-100 p-5 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Company Avatar */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-lg font-bold text-gray-600">
              {complaint.company.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm text-gray-500">{complaint.company.name}</p>
              <p className="text-xs text-gray-400">{formatDate(complaint.createdAt)}</p>
            </div>
          </div>
          <Badge status={complaint.status} />
        </div>

        {/* Content */}
        <div className="mt-4">
          <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {complaint.title}
          </h3>
          <p className="text-gray-600 mt-2 text-sm line-clamp-2">{complaint.content}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-gray-400 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>{complaint.viewCount} {t.complaint.views}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span>{complaint.commentCount} {t.complaint.comments}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
