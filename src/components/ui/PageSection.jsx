import { useLocation, matchPath } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { routes } from '@/router/router'
import Breadcrumb from './Breadcrumb'
import Card from './Card'

function getPageTitleKey(pathname) {
  const children = routes.find(r => r.path === '/')?.children ?? []
  for (const route of children) {
    if (route.index) continue
    if (matchPath(`/${route.path}`, pathname)) return route.handle?.breadcrumb
  }
}

export default function PageSection({ children }) {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const titleKey = getPageTitleKey(pathname)

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="space-y-4">
        <div>
          <Breadcrumb />
          <h2 className="text-gray-900 dark:text-dark-text text-xl font-semibold">{t(titleKey)}</h2>
        </div>
        <Card className="p-6">{children}</Card>
      </div>
    </div>
  )
}
