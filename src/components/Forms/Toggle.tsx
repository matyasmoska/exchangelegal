import { ComponentPropsWithoutRef, ReactNode } from 'react'
import clsx from 'clsx'

import ErrorMessage from './ErrorMessage'

export interface ToggleProps extends ComponentPropsWithoutRef<'input'> {
  label?: ReactNode
  error?: string
  resetError?: () => void
}

const Toggle = ({ className, onChange, type, checked, label, error, resetError, ...other }: ToggleProps) => {
  return (
    <div className={clsx('space-y-1', className)}>
      <label className={clsx('flex items-center max-w-max', !!onChange && 'cursor-pointer')}>
        <input
          className="w-0 h-0 border-0 focus:ring-0 focus:shadow-none"
          onChange={(e) => {
            resetError?.()
            onChange?.(e)
          }}
          type="checkbox"
          checked={checked}
          {...other}
        />
        <div
          className={clsx('w-12 h-6 rounded-full transition duration-100', checked ? 'bg-dark-blue' : 'bg-gray-400')}
        >
          <div
            className={clsx(
              'w-1/2 h-full rounded-full border-2 bg-white transition duration-100',
              checked ? 'translate-x-full border-dark-blue' : 'translate-x-0 border-gray-400'
            )}
          />
        </div>
        {label && <span className="ml-2 text-light-black">{label}</span>}
      </label>
      {error && <ErrorMessage id="toggle">{error}</ErrorMessage>}
    </div>
  )
}

export default Toggle
