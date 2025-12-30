'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useUserStore } from '@/store/user';
import { LogOut, User, Settings, FileText } from 'lucide-react';
import Link from 'next/link';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('');
}

export function UserAvatar() {
  const { user, clearUser } = useUserStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg"
      >
        {getInitials(user.fullName)}
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-background border border-foreground/10 rounded-lg shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b border-foreground/10">
            <p className="text-sm font-semibold">{user.fullName}</p>
            <p className="text-xs text-foreground/60">{user.phone}</p>
          </div>
          <Link
            href="/my-complaints"
            className="flex items-center px-4 py-2 text-sm text-foreground/80 hover:bg-foreground/5"
            onClick={() => setIsDropdownOpen(false)}
          >
            <FileText className="w-4 h-4 mr-2" />
            My Complaints
          </Link>
          <Link
            href="/profile"
            className="flex items-center px-4 py-2 text-sm text-foreground/80 hover:bg-foreground/5"
            onClick={() => setIsDropdownOpen(false)}
          >
            <User className="w-4 h-4 mr-2" />
            My Profile
          </Link>
          <Link
            href="/settings"
            className="flex items-center px-4 py-2 text-sm text-foreground/80 hover:bg-foreground/5"
            onClick={() => setIsDropdownOpen(false)}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Link>
          <button
            onClick={() => {
              clearUser();
              setIsDropdownOpen(false);
            }}
            className="w-full text-left flex items-center px-4 py-2 text-sm text-red-500 hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
