import { createElement } from 'react'
import type { LucideProps } from 'lucide-react'
import logo from '../../../../../resources/assets/CaPilot logo inverted.png'
import { cn } from '@/lib/utils'

export function OrcaLogoSettingsIcon({ className }: LucideProps): React.JSX.Element {
  return createElement('img', {
    src: logo,
    alt: '',
    'aria-hidden': true,
    className: cn('object-contain invert dark:invert-0', className)
  })
}
