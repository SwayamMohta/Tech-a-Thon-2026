export interface UserCredential {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'user';
  email: string;
  passwordHash: string;
  department?: string;
}

export const JWT_CONFIG = {
  secret: 'krishi_match_secret_key_2026',
  issuer: 'krishi-match-auth-service',
  expiresInSeconds: 86400 // 24 hours
};

export const INITIAL_USER_CREDENTIALS: UserCredential[] = [
  {
    id: 'usr-admin-01',
    username: 'admin',
    name: 'Chief Admin Operator',
    role: 'admin',
    email: 'admin@krishimatch.gov.in',
    passwordHash: 'admin123',
    department: 'Ministry of Agriculture & Farmers Welfare'
  },
  {
    id: 'usr-farmer-01',
    username: 'farmer',
    name: 'Ramesh Patel',
    role: 'user',
    email: 'ramesh.patel@farmmail.in',
    passwordHash: 'farmer123',
    department: 'District Agriculture Advisory'
  }
];
