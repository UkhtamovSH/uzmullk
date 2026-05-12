import { Suspense, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from '@/router/router'
import { useIsDark, useThemeActions } from '@/store/useThemeStore'

export default function App() {
  const isDark = useIsDark()
  const { setTheme } = useThemeActions()

  useEffect(() => {
    setTheme(isDark)
  }, [])

  const element = useRoutes(routes)

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-dark-bg flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      {element}
    </Suspense>
  )
}
