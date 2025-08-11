// Utility functions for authentication

export interface TokenPayload {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  role: string;
  username: string;
}

export function decodeJWTToken(token: string): TokenPayload | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
}

export function getUserRole(token: string): string | null {
  const payload = decodeJWTToken(token);
  return payload?.role || null;
}

export function isTokenValid(token: string): boolean {
  const payload = decodeJWTToken(token);
  if (!payload) return false;
  
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp > currentTime;
}

export function getRedirectPath(userRole: string): string {
  switch (userRole) {
    case 'investor':
      return '/investor/dashboard';
    case 'startup':
      return '/startup/dashboard';
    default:
      return '/';
  }
} 