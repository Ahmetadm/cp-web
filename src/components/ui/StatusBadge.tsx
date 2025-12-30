'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ComplaintStatus } from '@/types';
import { useTranslations } from '@/i18n';

interface StatusBadgeProps {
  status: ComplaintStatus;
  size?: 'sm' | 'default' | 'lg';
}

const statusDotColors: Record<ComplaintStatus, string> = {
  pending: 'bg-amber-500',
  in_progress: 'bg-blue-500',
  resolved: 'bg-emerald-500',
  rejected: 'bg-red-500',
};

export function StatusBadge({ status, size = 'default' }: StatusBadgeProps) {
  const t = useTranslations();

  const statusLabels: Record<ComplaintStatus, string> = {
    pending: t.complaint.status.pending,
    in_progress: t.complaint.status.in_progress,
    resolved: t.complaint.status.resolved,
    rejected: t.complaint.status.rejected,
  };

  return (
    <Badge variant={status} size={size}>
      <span className={`w-1.5 h-1.5 rounded-full ${statusDotColors[status]}`} />
      {statusLabels[status]}
    </Badge>
  );
}
