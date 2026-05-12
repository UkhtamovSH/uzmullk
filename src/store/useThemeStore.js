import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { useShallow } from 'zustand/react/shallow'

const useThemeStore = create(
  devtools(
    persist(
      (set) => ({
        isDark: true,
        toggleTheme: () =>
          set((s) => {
            const next = !s.isDark
            document.documentElement.classList.toggle('dark', next)
            return { isDark: next }
          }),
        setTheme: (isDark) => {
          document.documentElement.classList.toggle('dark', isDark)
          set({ isDark })
        },
      }),
      { name: 'theme-storage' }
    )
  )
)

export const useIsDark = () => useThemeStore((s) => s.isDark)
export const useThemeActions = () =>
  useThemeStore(useShallow((s) => ({ toggleTheme: s.toggleTheme, setTheme: s.setTheme })))

export default useThemeStore
