'use client';

import React from 'react';
import { Eye, MessageCircle } from 'lucide-react';
import { RecentComplaint } from './types';

interface ComplaintCardProps {
  complaint: RecentComplaint;
}

export function ComplaintCard({ complaint }: ComplaintCardProps) {
  return (
    <div className="flex-shrink-0 w-64 p-4 bg-card border border-border rounded-xl">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
          {complaint.userInitial}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground truncate">{complaint.userName}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Eye className="w-3 h-3" />
            <span>{complaint.views}</span>
            <span>•</span>
            <span>{complaint.date}</span>
          </div>
        </div>
      </div>

      {/* Complaint Title */}
      <p className="text-sm text-foreground line-clamp-2 mb-3">
        {complaint.title}
      </p>

      {/* Comment Count */}
      {complaint.commentCount > 0 && (
        <div className="flex items-center gap-1.5 tex-xs text-muted-foreground">
          <MessageCircle className="w-3.5 h-3.5" />
          <span>{complaint.commentCount} {complaint.commentCount === 1 ? 'comment' : 'comments'}</span>
        </div>
      )}
    </div>
  );
}
