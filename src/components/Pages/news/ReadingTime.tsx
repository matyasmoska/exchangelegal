import { FC, useMemo } from "react";
import { useRouter } from 'next/router'
import { useTranslations } from '../../../hooks/useTranslations'

import pageData from '../../../data/news.json'

const rule = (key: Intl.LDMLPluralRule) => {
  switch (key) {
    case 'zero':
      return 'other'
    case 'two':
      return 'few'
    default:
      return key
  }
}

const ReadingTime: FC<{ stats: { minutes: number } }> = ({ stats }) => {
    const { locale } = useRouter()
    const t = useTranslations()

    const minutes = useMemo(() => Math.max(1, Math.round(stats.minutes)), [stats.minutes])

    return (
        <span className="p-1.5 text-sm font-bold bg-gray-100">
            {minutes} {t(pageData.minutesReading[rule(new Intl.PluralRules(locale).select(minutes))])}
        </span>
    );
}

export default ReadingTime;