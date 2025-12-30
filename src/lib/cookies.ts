'use client';

// Cookie name for auth token
const AUTH_COOKIE_NAME = 'auth_token';

/**
 * Set auth token in cookie
 * Note: For better security in production, consider using httpOnly cookies
 * set by the backend. This is a client-readable cookie for SSR hydration.
 */
export function setAuthCookie(token: string): void {
  // Set cookie with 7 day expiry
  const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds
  document.cookie = `${AUTH_COOKIE_NAME}=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

/**
 * Get auth token from cookie (client-side)
 */
export function getAuthCookie(): string | null {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === AUTH_COOKIE_NAME) {
      return value || null;
    }
  }
  return null;
}

/**
 * Clear auth cookie on logout
 */
export function clearAuthCookie(): void {
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0`;
}
