import { useSyncExternalStore } from 'react';

type AuthToken = {
  access_token: string;
  token_type: string;
  expires_in: string;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getSnapshot(): string | null {
  return window.localStorage.getItem('authToken');
}

export function isTokenExpired(expiresIn: string | number | null): boolean {
    if (!expiresIn) return true;
    const now = Math.floor(Date.now() / 1000);
    const expirationTime = typeof expiresIn === 'string' ? parseInt(expiresIn, 10) : expiresIn;
    const issuedAt = localStorage.getItem('tokenIssuedAt') ? parseInt(localStorage.getItem('tokenIssuedAt')!, 10) : 0;
    return now >= issuedAt + expirationTime;
}

export function useAuthToken(): AuthToken | null {
    const jwt = useSyncExternalStore(subscribe, getSnapshot);
    if (!jwt) return null;
    const jwtParse: AuthToken = JSON.parse(jwt);
    return jwtParse;
}

export function saveAuthToken(token: AuthToken): void {
  localStorage.setItem('authToken', JSON.stringify(token));
  localStorage.setItem('tokenIssuedAt', JSON.stringify(Math.floor(Date.now() / 1000)));
  window.dispatchEvent(new Event('storage'));
}

export function clearAuthToken(): void {
  localStorage.removeItem('authToken');
  localStorage.removeItem('tokenIssuedAt');
  window.dispatchEvent(new Event('storage'));
}