'use client';

import React from 'react';
import { useUserStore } from '@/store/user';
import { LogOut, User, Settings, FileText } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from '@/i18n';
import { clearAuthCookie } from '@/lib/cookies';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('');
}

export function UserAvatar() {
  const { user, clearUser } = useUserStore();
  const t = useTranslations();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none">
          <Avatar className="w-10 h-10 bg-primary cursor-pointer">
            <AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
              {getInitials(user.fullName)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold">{user.fullName}</p>
            <p className="text-xs text-muted-foreground">{user.phone}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/my-complaints" className="cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            {t.userMenu.myComplaints}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            {t.userMenu.myProfile}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            {t.userMenu.settings}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => {
            clearAuthCookie();
            clearUser();
          }}
          className="cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t.userMenu.logout}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
