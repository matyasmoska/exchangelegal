import { useRouter } from 'next/router'

export type Locale = 'cs' | 'en'

export type Translations<T = string> = {
  [key in Locale]?: T
}

export const useTranslations = <T = string | JSX.Element>() => {
  const { locale, defaultLocale } = useRouter()

  const translate = (translations?: Translations<T> | string) =>
    typeof translations === 'string'
      ? translations
      : translations?.[locale as Locale] || translations?.[defaultLocale as Locale] || ''

  return translate
}
