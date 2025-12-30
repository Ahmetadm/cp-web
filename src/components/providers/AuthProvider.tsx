'use client';

import React, { useEffect } from 'react';
import { useUserStore } from '@/store/user';
import { getAuthCookie } from '@/lib/cookies';
import { api } from '@/lib/api';

/**
 * AuthProvider handles initial auth state hydration.
 * It checks for an auth cookie and fetches user data if present.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, setUser, setHasHydrated, hasHydrated, token } = useUserStore();

  useEffect(() => {
    // If already hydrated and have user, nothing to do
    if (hasHydrated && user) return;

    // Get token from cookie or from store (localStorage)
    const cookieToken = getAuthCookie();
    const authToken = cookieToken || token;

    // If no token available, mark as hydrated
    if (!authToken) {
      setHasHydrated(true);
      return;
    }

    // If we have a token but no user, try to fetch user data
    if (authToken && !user) {
      const fetchUser = async () => {
        try {
          const { data, error } = await api.GET('/auth/me', {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          if (!error && data) {
            setUser(
              {
                id: data.id!,
                phone: data.phone!,
                fullName: data.fullName || '',
                isVerified: data.isVerified!,
              },
              authToken
            );
          }
        } catch {
          // Token might be invalid, that's fine
        } finally {
          setHasHydrated(true);
        }
      };

      fetchUser();
    } else {
      setHasHydrated(true);
    }
  }, [hasHydrated, user, token, setUser, setHasHydrated]);

  return <>{children}</>;
}
