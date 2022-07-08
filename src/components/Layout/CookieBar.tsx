import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import staticData from '../../data/pages/cookies.json'
import { c } from '../../services/misc'
import { useFetcher } from '../../hooks/useFetcher'
import Button from './Button'
import Modal from './Modal'
import Toggle, { ToggleProps } from '../Forms/Toggle'
import { ChevronDown, CloseIcon } from './Icons'

export const consentName = 'cookie-consent'

type CookieConsent = {
  technical: boolean
  analytics: boolean
}

type CookieTableRow = {
  name: string
  domain: string
  expiration: string
  description: string
}

type CookieSectionProps = ToggleProps & {
  header: string
  description: string
  rows: CookieTableRow[]
}

const CookieSection = ({ header, description, rows, className, ...toggleProps }: CookieSectionProps) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={c('border-b', className, expanded && 'bg-gray-100')}>
      <div className="flex items-center xs:justify-end xs:flex-wrap">
        <div
          className="flex-grow flex items-center p-2 xs:px-1 font-bold text-dark-blue cursor-pointer hover:bg-gray-200"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <ChevronDown
            className={c('w-5 h-5 mr-2 xs:mr-1 flex-shrink-0 transition-transform', expanded && 'rotate-180')}
          />
          {header}
        </div>
        <Toggle {...toggleProps} className="m-2 xs:mx-1" />
      </div>
      {expanded && (
        <>
          <p className="text-sm text-light-black px-2">{description}</p>
          <div className="overflow-auto p-1">
            <table className="w-full text-sm text-light-black">
              <thead>
                <tr>
                  {staticData.headers.map(({ value }) => (
                    <th key={value} className="p-1 font-normal">
                      {value}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={`row-${i}`}>
                    {staticData.headers.map(({ key }) => (
                      <td key={`row-${i}-${key}`} className="p-1">
                        {row[key as keyof CookieTableRow]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

const MoreInfo = () => (
  <>
    {staticData.moreInfo.text}{' '}
    <a href={staticData.moreInfo.link} className="underline hover:text-wine-primary" target="_blank" rel="noreferrer">
      {staticData.moreInfo.linkText}
    </a>
    .
  </>
)

const CookieBar = () => {
  const router = useRouter()
  const showCookieModal = router.query.consent === 'setup'

  const [cookies, setCookie] = useCookies([consentName])
  const [getIp] = useFetcher<{ ip: string }>()
  const [saveConsent] = useFetcher()
  const [allowAnalytics, setAllowAnalytics] = useState(false)
  const [hideBar, setHideBar] = useState(false)

  useEffect(() => {
    if (showCookieModal) {
      setAllowAnalytics(cookies[consentName]?.analytics ?? false)
    }
  }, [showCookieModal, cookies])

  const handleModalOpen = () => {
    router.push({ pathname: router.pathname, query: { ...router.query, consent: 'setup' } }, undefined, { scroll: false })
  }

  const handleBack = () => {
    setHideBar(true)
    const query = { ...router.query }
    delete query.consent
    router.push({ pathname: router.pathname, query }, undefined, { scroll: false })
  }

  const setConsent = async (analytics: boolean) => {
    const consent: CookieConsent = { technical: true, analytics }
    const date = new Date()
    setCookie(consentName, consent, { expires: new Date(date.getFullYear(), date.getMonth() + 6, date.getDate()) })
    const { data } = await getIp('https://jsonip.com')
    await saveConsent('/api/consents', {
      method: 'POST',
      body: JSON.stringify({ ip: data?.ip, date, ...consent }),
    })
    if (showCookieModal) handleBack()
  }

  return showCookieModal ? (
    <Modal open={!!showCookieModal} onClose={handleBack} title={staticData.headerModal} className="sm:w-full sm:!mx-0">
      <p className="text-light-black">
        {staticData.description}
        <br />
        {staticData.detail} <MoreInfo />
      </p>
      <CookieSection {...staticData.cookies.technical} className="mt-4" checked />
      <CookieSection
        {...staticData.cookies.analytics}
        className="mt-4"
        checked={allowAnalytics}
        onChange={(e) => setAllowAnalytics(e.target.checked)}
      />
      <div className="flex flex-wrap gap-x-28 justify-between sm:justify-around">
        <Button type="basic" className="w-40 sm:w-full max-w-2.5xs mt-4 p-2" onClick={() => setConsent(true)}>
          {staticData.acceptAll}
        </Button>
        <Button type="secondary" className="w-40 sm:w-full max-w-2.5xs mt-4 p-2" onClick={() => setConsent(allowAnalytics)}>
          {staticData.saveSettings}
        </Button>
      </div>
    </Modal>
  ) : (
    <AnimatePresence>
      {(!cookies[consentName] || cookies[consentName] === "true") && !hideBar && (
        <motion.div
          className="fixed bottom-0 flex items-center justify-center w-full z-50 p-4 border-t text-white bg-dark-blue bg-opacity-95"
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ type: 'tween', duration: 0.6 }}
        >
          <div className="flex items-center justify-center lg:flex-wrap max-w-9xl">
            <div className="m-2 xs:mx-0">
              <p className="mb-2 font-bold">{staticData.header}</p>
              <p className="text-sm">
                {staticData.description} <MoreInfo />
              </p>
            </div>
            <Button type="light" className="w-40 xs:w-full flex-shrink-0 m-2 p-2" onClick={handleModalOpen}>
              {staticData.settings}
            </Button>
            <Button type="light" className="w-40 xs:w-full flex-shrink-0 m-2 p-2" onClick={() => setConsent(false)}>
              {staticData.acceptTechnical}
            </Button>
            <Button type="basic" className="w-40 xs:w-full flex-shrink-0 m-2 p-2" onClick={() => setConsent(true)}>
              {staticData.acceptAll}
            </Button>
          </div>
          <div className="m-1 xs:-mr-1 cursor-pointer" onClick={() => setHideBar(true)}>
            <CloseIcon className="w-5 h-5 flex-shrink-0" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CookieBar
