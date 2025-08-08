import * as React from 'react'

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string | number
  trend?: 'up' | 'down' | 'neutral'
  hint?: string
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, trend = 'neutral', hint, className, ...rest }) => {
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
  return (
    <div className={[
      'p-4 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-between',
      className || '',
    ].join(' ')} {...rest}>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
        {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
      </div>
      <span className={['text-xs font-medium', trendColor].join(' ')}>
        {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '—'}
      </span>
    </div>
  )
}

export default StatCard
