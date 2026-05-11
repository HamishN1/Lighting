'use client'
// src/contexts/AppContext.tsx
// Global state for auth + projects. Swap auth functions for Supabase/Clerk in production.

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { User, Project } from '@/lib/types'
import {
  getStoredUser, setStoredUser, clearStoredUser,
  getStoredProjects, saveProject as storageSaveProject, deleteProject as storageDeleteProject
} from '@/lib/storage'

interface AppContextValue {
  user: User | null
  projects: Project[]
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => void
  saveProject: (project: Project) => void
  deleteProject: (id: string) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Hydrate from localStorage on mount
  useEffect(() => {
    setUser(getStoredUser())
    setProjects(getStoredProjects())
    setIsLoading(false)
  }, [])

  // Demo sign-in — replace with Supabase: supabase.auth.signInWithPassword(...)
  const signIn = useCallback(async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 700)) // simulate network
    const u: User = {
      id: btoa(email),
      name: email.split('@')[0],
      email,
      createdAt: new Date().toISOString(),
    }
    setStoredUser(u)
    setUser(u)
  }, [])

  // Demo sign-up — replace with Supabase: supabase.auth.signUp(...)
  const signUp = useCallback(async (name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 700))
    const u: User = {
      id: btoa(email),
      name: name || email.split('@')[0],
      email,
      createdAt: new Date().toISOString(),
    }
    setStoredUser(u)
    setUser(u)
  }, [])

  const signOut = useCallback(() => {
    clearStoredUser()
    setUser(null)
  }, [])

  const saveProject = useCallback((project: Project) => {
    const updated = storageSaveProject(project)
    setProjects(updated)
  }, [])

  const deleteProject = useCallback((id: string) => {
    const updated = storageDeleteProject(id)
    setProjects(updated)
  }, [])

  return (
    <AppContext.Provider value={{ user, projects, isLoading, signIn, signUp, signOut, saveProject, deleteProject }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
