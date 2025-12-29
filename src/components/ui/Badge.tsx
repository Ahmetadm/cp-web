import React from 'react';
import { ComplaintStatus } from '@/types';
import { useTranslations } from '@/i18n';

interface BadgeProps {
  status: ComplaintStatus;
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({ status, size = 'md' }: BadgeProps) {
  const t = useTranslations();

  const styles = {
    pending: {
      bg: 'bg-amber-100',
      text: 'text-amber-700',
      dot: 'bg-amber-500',
      label: t.complaint.status.pending,
    },
    in_progress: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      dot: 'bg-blue-500',
      label: t.complaint.status.in_progress,
    },
    resolved: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-700',
      dot: 'bg-emerald-500',
      label: t.complaint.status.resolved,
    },
    rejected: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      dot: 'bg-red-500',
      label: t.complaint.status.rejected,
    },
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const style = styles[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${style.bg} ${style.text} ${sizes[size]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {style.label}
    </span>
  );
}
