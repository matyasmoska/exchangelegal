import { ComponentPropsWithoutRef, Fragment } from 'react'
import { useRouter } from 'next/router'
import { Listbox } from '@headlessui/react'
import clsx from 'clsx'
import { Locale } from '../../hooks/useTranslations'
import { ChevronDown, CzechFlag, EnglishFlag } from './Icons'
import staticData from '../../data/locales.json'

const flagIcon = {
  cs: <CzechFlag />,
  en: <EnglishFlag />,
}

type LangSelectProps = ComponentPropsWithoutRef<'select'> & {
  onSelectionChange?: () => void
  isMobile?: boolean
}

const LangSelect = ({ className, isMobile, onSelectionChange }: LangSelectProps) => {
  const router = useRouter()

  const handleChange = (locale: string) => {
    router.push({ pathname: router.pathname, query: router.query }, undefined, { locale })
    onSelectionChange?.()
  }

  if (isMobile) {
    return (
      <select
        value={router.locale}
        onChange={e => handleChange(e.target.value)}
        className={clsx('font-bold rounded-lg', className)}
      >
        {router.locales?.map(loc => (
          <option key={loc} value={loc}>
            {staticData.languageFlag[loc as Locale]} {staticData.languageName[loc as Locale]}
          </option>
        ))}
      </select>
    )
  }

  return (
    <Listbox
      as="div"
      value={router.locale}
      onChange={handleChange}
      className={clsx('relative w-28 h-[42px] flex-shrink-0 lg:flex-shrink rounded-lg border border-dark-blue', className)}
    >
      <Listbox.Button className="inline-flex w-full h-full items-center justify-center gap-1 pl-1">
        <span className="flex items-center justify-start gap-2">
          {flagIcon[router.locale as Locale]}
          {staticData.languageName[router.locale as Locale]}
        </span>
        <ChevronDown className="w-4 h-4" />
      </Listbox.Button>
      <Listbox.Options className="relative -left-2 lg:left-0 top-px z-30 w-32 lg:w-auto p-1.5 rounded-lg bg-white shadow-tile focus:outline-none">
        {router.locales?.map(loc => (
          <Listbox.Option key={loc} value={loc} as={Fragment}>
            {({ active }) => (
              <li
                className={clsx(
                  'flex items-center justify-start gap-2 lg:gap-1.5 cursor-pointer rounded-md py-1.5 px-[11px] lg:px-1.5 select-none',
                  active && 'bg-wine-primary text-white'
                )}
              >
                {flagIcon[loc as Locale]}
                <span>{staticData.languageName[loc as Locale]}</span>
              </li>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}

export default LangSelect
