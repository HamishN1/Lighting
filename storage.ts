// src/lib/storage.ts
// localStorage helpers for demo-mode persistence.
// In production, replace these with Supabase or your database of choice.

import { Project, User } from './types'

const KEYS = {
  user: 'luma_user',
  projects: 'luma_projects',
} as const

// ─── User ─────────────────────────────────────────────────────────────────────

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(KEYS.user)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setStoredUser(user: User): void {
  localStorage.setItem(KEYS.user, JSON.stringify(user))
}

export function clearStoredUser(): void {
  localStorage.removeItem(KEYS.user)
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export function getStoredProjects(): Project[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(KEYS.projects)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveProject(project: Project): Project[] {
  const existing = getStoredProjects()
  // Replace if same id, otherwise prepend
  const idx = existing.findIndex((p) => p.id === project.id)
  const updated =
    idx >= 0
      ? existing.map((p) => (p.id === project.id ? project : p))
      : [project, ...existing]
  localStorage.setItem(KEYS.projects, JSON.stringify(updated))
  return updated
}

export function deleteProject(id: string): Project[] {
  const updated = getStoredProjects().filter((p) => p.id !== id)
  localStorage.setItem(KEYS.projects, JSON.stringify(updated))
  return updated
}

export function getProjectById(id: string): Project | null {
  return getStoredProjects().find((p) => p.id === id) ?? null
}
