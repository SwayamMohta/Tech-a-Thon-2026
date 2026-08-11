import type { FarmerProfile, MatchResult, Scheme } from '../types/scheme';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init
  });
  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status}`);
  }
  return res.json();
}

export function fetchSchemes(): Promise<Scheme[]> {
  return apiFetch('/api/schemes');
}

export function matchProfile(profile: FarmerProfile): Promise<MatchResult[]> {
  return apiFetch('/api/match', { method: 'POST', body: JSON.stringify(profile) });
}

export function addSchemeApi(scheme: Scheme): Promise<Scheme> {
  return apiFetch('/api/admin/schemes', { method: 'POST', body: JSON.stringify(scheme) });
}
