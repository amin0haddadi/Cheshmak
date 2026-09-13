const GUEST_TOKEN_KEY = 'cheshmak_guest_token';
const GUEST_TOKEN_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function createGuestToken(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `guest-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string, maxAge = GUEST_TOKEN_MAX_AGE) {
  if (typeof document === 'undefined') {
    return;
  }

  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function deleteCookie(name: string) {
  if (typeof document === 'undefined') {
    return;
  }

  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

/**
 * Read guest cart token from cookie (falls back to legacy localStorage once).
 */
export function getGuestToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const fromCookie = readCookie(GUEST_TOKEN_KEY);
  if (fromCookie) {
    return fromCookie;
  }

  // One-time migrate from older localStorage key
  try {
    const legacy = window.localStorage.getItem(GUEST_TOKEN_KEY);
    if (legacy) {
      writeCookie(GUEST_TOKEN_KEY, legacy);
      window.localStorage.removeItem(GUEST_TOKEN_KEY);
      return legacy;
    }
  } catch {
    // ignore
  }

  return null;
}

/**
 * Get or create a persistent guest cart token (cookie).
 */
export function getOrCreateGuestToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const existing = getGuestToken();
  if (existing) {
    return existing;
  }

  const token = createGuestToken();
  writeCookie(GUEST_TOKEN_KEY, token);
  return token;
}

export function clearGuestToken(): void {
  if (typeof window === 'undefined') {
    return;
  }

  deleteCookie(GUEST_TOKEN_KEY);
  try {
    window.localStorage.removeItem(GUEST_TOKEN_KEY);
  } catch {
    // ignore
  }
}
