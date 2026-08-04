import { INITIAL_USER_CREDENTIALS, JWT_CONFIG } from '../data/credentials';

export interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'user';
  email: string;
}

export interface AuthTokenPayload {
  sub: string;
  username: string;
  name: string;
  role: 'admin' | 'user';
  iat: number;
  exp: number;
  iss: string;
}

const STORAGE_TOKEN_KEY = 'krishi_match_jwt_token';
const STORAGE_USERS_KEY = 'krishi_match_users_db';

function getUsersDb(): (User & { passwordHash: string })[] {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(INITIAL_USER_CREDENTIALS));
      return INITIAL_USER_CREDENTIALS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_USER_CREDENTIALS;
  }
}

// Generate JWT token string header.payload.signature
function createJwtToken(user: User): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const payload: AuthTokenPayload = {
    sub: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    iat: now,
    exp: now + JWT_CONFIG.expiresInSeconds,
    iss: JWT_CONFIG.issuer
  };

  const b64Header = btoa(JSON.stringify(header));
  const b64Payload = btoa(JSON.stringify(payload));
  const signature = btoa(`sig_${user.id}_${now}`);

  return `${b64Header}.${b64Payload}.${signature}`;
}

// Decode and parse JWT payload
export function parseJwtToken(token: string): AuthTokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payloadJson = atob(parts[1]);
    const payload: AuthTokenPayload = JSON.parse(payloadJson);
    
    // Expiry check
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function getStoredToken(): string | null {
  const token = localStorage.getItem(STORAGE_TOKEN_KEY);
  if (!token) return null;
  const parsed = parseJwtToken(token);
  if (!parsed) {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    return null;
  }
  return token;
}

export function getCurrentUser(): User | null {
  const token = getStoredToken();
  if (!token) return null;
  const payload = parseJwtToken(token);
  if (!payload) return null;

  return {
    id: payload.sub,
    username: payload.username,
    name: payload.name,
    role: payload.role,
    email: `${payload.username}@krishimatch.gov.in`
  };
}

export function loginUser(username: string, password: string): { success: boolean; token?: string; user?: User; error?: string } {
  const db = getUsersDb();
  const found = db.find(u => u.username.toLowerCase() === username.toLowerCase().trim());
  
  if (!found || found.passwordHash !== password) {
    return { success: false, error: 'Invalid username or password.' };
  }

  const user: User = {
    id: found.id,
    username: found.username,
    name: found.name,
    role: found.role,
    email: found.email
  };

  const token = createJwtToken(user);
  localStorage.setItem(STORAGE_TOKEN_KEY, token);

  return { success: true, token, user };
}

export function registerUser(username: string, name: string, password: string, role: 'admin' | 'user' = 'user'): { success: boolean; token?: string; user?: User; error?: string } {
  const db = getUsersDb();
  const exists = db.some(u => u.username.toLowerCase() === username.toLowerCase().trim());
  
  if (exists) {
    return { success: false, error: 'Username is already taken.' };
  }

  const newUser: User & { passwordHash: string } = {
    id: `usr-${Date.now()}`,
    username: username.trim(),
    name: name.trim() || username.trim(),
    role,
    email: `${username.trim()}@farmmail.in`,
    passwordHash: password
  };

  db.push(newUser);
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(db));

  const user: User = {
    id: newUser.id,
    username: newUser.username,
    name: newUser.name,
    role: newUser.role,
    email: newUser.email
  };

  const token = createJwtToken(user);
  localStorage.setItem(STORAGE_TOKEN_KEY, token);

  return { success: true, token, user };
}

export function logoutUser(): void {
  localStorage.removeItem(STORAGE_TOKEN_KEY);
}
