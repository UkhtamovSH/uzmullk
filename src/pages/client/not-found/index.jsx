import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center gap-4">
      <h1 className="text-dark-text text-6xl font-bold">{t('notFoundCode')}</h1>
      <p className="text-dark-muted">{t('notFoundMessage')}</p>
      <Link
        to="/dashboard"
        className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-colors"
      >
        {t('notFoundBackHome')}
      </Link>
    </div>
  )
}
