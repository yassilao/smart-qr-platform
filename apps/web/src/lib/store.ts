import { atom } from 'zustand'
import create from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  user: any | null
  token: string | null
  setUser: (user: any) => void
  setToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()
(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

interface UIStore {
  sidebarOpen: boolean
  darkMode: boolean
  setSidebarOpen: (open: boolean) => void
  setDarkMode: (dark: boolean) => void
}

export const useUIStore = create<UIStore>(
  persist(
    (set) => ({
      sidebarOpen: true,
      darkMode: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setDarkMode: (dark) => set({ darkMode: dark }),
    }),
    {
      name: 'ui-storage',
    }
  )
)
