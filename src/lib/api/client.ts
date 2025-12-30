import createClient from 'openapi-fetch';
import type { paths } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4004';

/**
 * Type-safe API client for the Complaints API
 * Generated types from backend OpenAPI spec
 */
export const api = createClient<paths>({
  baseUrl: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Create an authenticated API client with JWT token
 */
export function createAuthenticatedClient(token: string) {
  return createClient<paths>({
    baseUrl: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

export type { paths } from './types';
