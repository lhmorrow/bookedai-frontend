import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token to all requests
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  register: (data: {
    business_name: string;
    business_slug: string;
    owner_name: string;
    owner_email: string;
    password: string;
    business_address?: string;
    business_hours?: string;
    services?: string[];
    service_area?: string;
    timezone?: string;
    intake_json?: Record<string, any>;
  }) => apiClient.post('/auth/register', data),

  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),

  me: () => apiClient.get('/auth/me'),
};

// Business endpoints
export const businessAPI = {
  me: () => apiClient.get('/businesses/me'),
};

// Subscription endpoints
export const subscriptionAPI = {
  checkout: (tier: string) =>
    apiClient.post('/api/stripe/checkout-session', { tier }),

  status: () => apiClient.get('/subscription/status'),

  cancel: () => apiClient.post('/subscription/cancel'),
};

export default apiClient;
