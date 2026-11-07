import { ApiClient } from '@nota-mil/shared';

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';

export const apiClient = new ApiClient({
  baseUrl,
});

export type { Person } from '../api';
export { apiRequest } from '../api';

