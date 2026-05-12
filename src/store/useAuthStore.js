import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

// Session is persisted in sessionStorage so it survives page refreshes but
// clears when the browser tab is closed. This is a reasonable middle ground
// until a real backend with httpOnly cookies is available.

const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        isAuthenticated: false,

        login: (user, token) =>
          set({ user, token, isAuthenticated: true }, false, 'auth/login'),

        logout: () =>
          set({ user: null, token: null, isAuthenticated: false }, false, 'auth/logout'),

        getToken: () => get().token,
      }),
      {
        name: 'auth-session',
        storage: createJSONStorage(() => sessionStorage),
      }
    ),
    {
      name: 'auth-store',
      enabled: import.meta.env.DEV,
    }
  )
)

export default useAuthStore
