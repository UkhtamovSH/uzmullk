export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl ${className}`}>
      {children}
    </div>
  )
}
