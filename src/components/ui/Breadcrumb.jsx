import { Link, useLocation, matchPath } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronRight } from 'lucide-react'
import { routes } from '@/router/router'

function getCurrentRoute(pathname) {
  const children = routes.find(r => r.path === '/')?.children ?? []
  for (const route of children) {
    if (route.index) continue
    if (matchPath(`/${route.path}`, pathname)) return route
  }
}

export default function Breadcrumb() {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const current = getCurrentRoute(pathname)

  if (!current) return null

  const isDashboard = matchPath('/dashboard', pathname)

  return (
    <nav className="flex items-center gap-1 text-sm mb-1">
      {isDashboard ? (
        <span className="text-dark-muted">{t('home')}</span>
      ) : (
        <>
          <Link
            to="/dashboard"
            className="text-dark-muted hover:text-dark-text transition-colors"
          >
            {t('home')}
          </Link>
          <ChevronRight size={14} className="text-dark-muted shrink-0" />
          <span className="text-dark-text font-medium">
            {t(current.handle?.breadcrumb)}
          </span>
        </>
      )}
    </nav>
  )
}
