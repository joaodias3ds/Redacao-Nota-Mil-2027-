export interface ApiClientConfig {
  baseUrl: string;
  getToken?: () => Promise<string | null> | string | null;
  getActiveRole?: () => string | null;
  fetchFn?: typeof fetch;
}

export interface ApiRequestOptions extends RequestInit {
  activeRole?: string;
  idempotencyKey?: string;
  expectedVersion?: number;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public fieldErrors?: unknown,
    public requestId?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ApiClient {
  constructor(private config: ApiClientConfig) {}

  async request<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
    const fetchImpl = this.config.fetchFn ?? fetch;
    const token = options.headers && 'authorization' in options.headers
      ? undefined
      : await this.config.getToken?.();
    const role = options.activeRole ?? this.config.getActiveRole?.();

    const headers = new Headers(options.headers);
    if (!headers.has('content-type') && options.body && typeof options.body === 'string') {
      headers.set('content-type', 'application/json');
    }
    if (token && !headers.has('authorization')) {
      headers.set('authorization', `Bearer ${token}`);
    }
    if (role && !headers.has('x-active-role')) {
      headers.set('x-active-role', role);
    }
    if (options.idempotencyKey && !headers.has('idempotency-key')) {
      headers.set('idempotency-key', options.idempotencyKey);
    }

    const url = `${this.config.baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
    const response = await fetchImpl(url, {
      ...options,
      headers,
    });

    if (response.status === 204) {
      return undefined as T;
    }

    const contentType = response.headers.get('content-type') ?? '';
    const isJson = contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const err = isJson ? (data as Record<string, unknown>) : {};
      throw new ApiError(
        (err.message as string) ?? `Falha na requisição (${response.status})`,
        response.status,
        err.code as string,
        err.fieldErrors,
        err.requestId as string
      );
    }

    return data as T;
  }
}

