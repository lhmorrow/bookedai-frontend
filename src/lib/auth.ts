export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function getBusinessId(): number | null {
  if (typeof window === 'undefined') return null;
  const bid = localStorage.getItem('business_id');
  return bid ? parseInt(bid, 10) : null;
}

export function setAuth(token: string, business_id: number) {
  localStorage.setItem('token', token);
  localStorage.setItem('business_id', String(business_id));
}

export function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('business_id');
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
