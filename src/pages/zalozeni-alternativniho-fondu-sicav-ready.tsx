import React, { FC, Fragment, useEffect, useRef, useState } from 'react'
import { Fade } from 'react-awesome-reveal'
import { AnimatePresence, AnimateSharedLayout, motion as m } from 'framer-motion'
import { opacityAnimation } from '../animations/navigation'
import DefaultLayout from '../layouts/DefaultLayout'
import SEO from '../components/Layout/SEO'
import { c, doScrolling } from '../services/misc'
import pageData from '../data/pages/zalozeni-alternativniho-fondu-sicav-ready/zalozeni-alternativniho-fondu-sicav-ready.json'

import servicesData from '../data/pages/services.json'
import useServicesForm from '../components/Pages/services/hooks/useServicesForm'
import { trackViewItems } from '../components/Pages/services/serviceHelpers'
import Button from '../components/Layout/Button'
import { DownloadIcon, LonelyCheckmarkIcon } from '../components/Layout/Icons'
import { OptionsSection } from '../components/Pages/index/ArgumentsSection'
import ServicesForm from '../components/Pages/services/ServícesForm'
import { useVisible } from 'react-hooks-visible'
import { useTranslations } from '../hooks/useTranslations'
import { FAQuestion } from '../typings'

const QuestionDetail: FC<{ question: FAQuestion, open?: boolean }> = ({ question, open = false }) => {
  const t = useTranslations()

  const [isOpen, setIsOpen] = useState(open)

  return (
    <m.div
      layout
      className="flex gap-8 py-8 cursor-pointer first:border-t border-b borderGradientLinear"
      onClick={() => setIsOpen(prev => !prev)}
    >
      <m.div layout className="flex-grow">
        <m.h2 layout className="max-w-3xl mt-1 text-xl font-semibold text-wine-primary">
          {t(question.question)}
        </m.h2>
        <AnimatePresence>
          {isOpen && (
            <m.div layout {...opacityAnimation} className="max-w-2xl mt-4">
              {t(question.answer)}
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
      <img src="/images/sipka1.svg" className={c('w-8 h-9 m-auto duration-1000', isOpen && 'rotate-180')} />
    </m.div>
  )
}

const ObligationsPage = () => {
  const t = useTranslations<string>()

  const [targetRef, visible] = useVisible()

  const servicesForm = useServicesForm()

  useEffect(() => {
    const selectedServices = servicesData.services.filter(({ id }) => id === 'zalozeni-alternativniho-fondu-sicav-ready')
    servicesForm.setFieldValue('checked', selectedServices)
    trackViewItems(selectedServices)
  }, [])

  const handleScroll = () => doScrolling('#services-form', 1000, 16)

  const contentRef = useRef<HTMLDivElement>(null)
  
  const contentScroll = () => contentRef.current?.scrollIntoView({ behavior: "smooth" })

  return (
    <DefaultLayout>
      <SEO
        title="15 ZISIF – Založení alternativní fondu SICAV-ready na klíč – 15zisif.cz"
        description="✅ Jsme odborníky v oblasti zakládání fondů ⭐ Máme unikátní zkušenosti a know-how v oblasti alternativních fondů dle § 15 ZISIF"
        keywords="alternativní investiční fond, minifond, alternativní fond, § 15 ZISIF, 15zisif"
      />

      <div
        className={c('bg-dark-grey bg-blend-soft-light bg-cover bg-center bg-no-repeat px-16', 'md:px-8')}
        style={{ backgroundImage: 'url("/images/CNB_pozadi.png")' }}
      >
        <div className="font-header max-w-8xl mx-auto grid grid-cols-2 items-end lg:grid-cols-1">
          <div>
            <h2
              dangerouslySetInnerHTML={{ __html: t(pageData.header.title) }}
              className="text-6xl xl:text-5xl sm:text-4xl !leading-[1.2] mt-16 mb-6 font-semibold lg:text-center"
            />
            <div className="flex gap-4">
              <div className="mx-auto">
                <div className="text-xl mb-6 lg:text-center">{t(pageData.header.subtitle)}</div>
                <div className="flex flex-wrap gap-4 max-w-max mb-6 lg:mx-auto sm:flex-col sm:max-w-sm">
                  <Button type="basic" className="px-8 py-3 mx-auto sm:w-full" onClick={handleScroll}>{t(pageData.header.orderNow)}</Button>
                  <Button type="secondary" className="px-8 py-3 mx-auto sm:w-full" onClick={contentScroll}>{t(pageData.header.moreInfo)}</Button>
                </div>
              </div>
              <img src="/images/sipka5.svg" className="w-40 lg:hidden" />
            </div>
            {pageData.header.checkmarkItems.map((item) => (
              <div key={t(item)} className="flex items-center max-w-max mb-6 last:mb-12 lg:mx-auto">
                <LonelyCheckmarkIcon className="w-8 h-8 mr-4 p-1.5 rounded-full flex-shrink-0 bg-light-green text-white" />
                <div className="max-w-sm font-semibold lg:text-justify lg:max-w-xs">{t(item)}</div>
              </div>
            ))}
          </div>
          <img src="/images/vzorecky_book.png" className="relative top-10 max-w-none w-[110%] lg:hidden" />
        </div>
      </div>

      <div className="hidden lg:block">
        <img src="/images/sipka5.svg" className="w-40 mx-auto my-12" />
        <img src="/images/vzorecky_book.png" className="w-full max-w-lg mx-auto" />
      </div>

      <div className={c('font-header mt-14 px-16', 'md:px-8')}>
		<div className="max-w-8xl mx-auto flex">
          <a href={t(pageData.header.bookTeaserLink)} target="_blank" className="max-w-sm ml-auto lg:mr-auto sm:w-full">
            <Button type="secondary" className="px-8 py-3 font-semibold">
              <DownloadIcon className="w-6 h-6 mr-3 flex-shrink-0" />
              {t(pageData.header.downloadTeaser)}
            </Button>
          </a>
		</div>
      </div>

      <div className={c('font-header space-y-24 my-24 px-16', 'md:px-8')}>
        <div className="max-w-8xl mx-auto grid gap-9 grid-cols-2 items-center md:grid-cols-1">
          <Fade direction={'up'} triggerOnce>
            <div className="space-y-10">
              <h3 dangerouslySetInnerHTML={{ __html: t(pageData.description1.title) }} className="text-3xl leading-normal font-semibold" />
              {pageData.description1.paragraphs.map((text, i) => (
                <div key={i} dangerouslySetInnerHTML={{ __html: t(text) }} className="text-xl leading-relaxed" />
              ))}
            </div>
            <img src="/images/budova.png" className="md:w-full md:max-w-lg mx-auto" />
          </Fade>
        </div>

        <div className="max-w-8xl mx-auto grid gap-9 grid-cols-2 items-center md:flex md:flex-col-reverse">
          <Fade direction={'up'} triggerOnce>
            <div className="md:max-w-lg mx-auto">
              <img src="/images/nas_tym_foto.png" />
              <div
                dangerouslySetInnerHTML={{ __html: t(pageData.ourTeam) }}
                className="bg-wine-primary text-white text-center text-[1.75rem] leading-normal ml-4 p-5"
                />
            </div>
            <div className="space-y-6">
              <h3 dangerouslySetInnerHTML={{ __html: t(pageData.description2.text1) }} className="text-2xl leading-normal" />
              {pageData.description2.checkmarkItems.map((text, i) => (
                <div key={i} className="flex items-start gap-4">
                  <LonelyCheckmarkIcon className="text-light-green flex-shrink-0 m-1" />
                  <div dangerouslySetInnerHTML={{ __html: t(text) }} className="text-xl leading-relaxed" />
                </div>
              ))}
              <div dangerouslySetInnerHTML={{ __html: t(pageData.description2.text2) }} className="text-xl leading-relaxed" />
            </div>
          </Fade>
        </div>

        <Fade direction={'up'} triggerOnce>
          <div className="flex items-start gap-3 max-w-max mx-auto">
            <img src="/images/effect.svg" className="w-8 rotate-[202deg] md:hidden" />
            <h3 dangerouslySetInnerHTML={{ __html: t(pageData.contactUs) }} className="mt-6 max-w-3xl text-3xl leading-relaxed text-center font-semibold" />
            <img src="/images/effect.svg" className="w-8 my-auto md:hidden" />
          </div>
        </Fade>

        <div ref={contentRef}>
          <Fade direction={'up'} triggerOnce>
            <div className="max-w-8xl mx-auto grid gap-4 grid-cols-3 lg:grid-cols-1">
              <div className="bg-dark-grey px-6 py-8 md:p-4 col-span-3 lg:col-span-1">
                <h3 dangerouslySetInnerHTML={{ __html: t(pageData.content.title) }} className="text-[32px] leading-tight text-center font-semibold" />
              </div>
              {pageData.content.steps.map(({ title, parts }, i) => (
                <div key={t(title)} className="bg-dark-grey px-6 py-8 md:p-4">
                  <div className="flex items-center gap-4 mb-6 text-wine-primary font-bold">
                    <div className="text-[64px] leading-none -mt-2">{i + 1}.</div>
                    <div className="text-2xl leading-7">{t(title)}</div>
                  </div>
                  {parts.map(({ title, listItems }) => (
                    <Fragment key={t(title)}>
                      <div className="text-xl font-bold">{t(title)}</div>
                      <ul className="list-disc pl-6 mt-1.5 mb-6 last:mb-0 leading-relaxed">
                        {listItems.map(({ text, subItems }) => (
                          <Fragment key={t(text)}>
                            <li>{t(text)}</li>
                            {subItems.length > 0 && (
                              <ol className="pl-10" style={{ listStyle: 'lower-roman' }}>
                                {subItems.map(({ text }) => (
                                  <li key={t(text)}>{t(text)}</li>
                                ))}
                              </ol>
                            )}
                          </Fragment>
                        ))}
                      </ul>
                    </Fragment>
                  ))}
                </div>
              ))}
            </div>
          </Fade>
        </div>

        <Fade direction={'up'} triggerOnce>
          <img src="/images/sipka6.svg" className="w-36 mx-auto" />
        </Fade>

        <Fade direction={'up'} triggerOnce>
          <div className="max-w-max mx-auto">
            <h3 dangerouslySetInnerHTML={{ __html: t(pageData.consultations) }} className="max-w-3xl text-3xl leading-relaxed text-center font-semibold" />
            <img src="/images/lines_highlight.svg" className="h-11 p-px mx-auto sm:hidden" />
          </div>
        </Fade>
      </div>

      <div className="font-header px-6 py-12" style={{ background: '#21397BE5' }}>
        <div
          className="flex items-center max-w-[1556px] min-h-[389px] mx-auto bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/images/vzorecky.svg")' }}
        >
          <div className="relative flex flex-col mx-auto">
            <h2 dangerouslySetInnerHTML={{ __html: t(pageData.formulaTitle) }} className="text-white text-5xl leading-tight text-center" />
            <Button type="basic" className="mx-auto mt-16 px-8 py-3" onClick={handleScroll}>
              {t(pageData.formulaButtonText)}
            </Button>
            <img src="/images/sipka7.svg" className="w-36 absolute -bottom-20 left-[7%] md:relative md:bottom-0" />
          </div>
        </div>
      </div>

      <OptionsSection hideArrow className="!mt-24 mb-12" />

      <div className="font-header bg-dark-grey p-20 md:px-8">
        <Fade direction={'up'} triggerOnce>
          <h2 dangerouslySetInnerHTML={{ __html: t(pageData.questionsTitle) }} className="text-4xl font-bold text-center mb-14" />
          <AnimateSharedLayout>
            <div className="max-w-4xl mx-auto">
              {pageData.questions.map((question, i) => <QuestionDetail key={t(question.question)} question={question} open={i === 0} />)}
            </div>
          </AnimateSharedLayout>
        </Fade>
      </div>

      <div className="flex items-center max-w-5xl mx-auto my-24 md:my-8">
        <img src="/images/sipka2.svg" className="max-w-xxs relative -top-24 lg:hidden" />
        <ServicesForm
          visibleRef={targetRef}
          form={servicesForm}
          className={c(
            '!mb-0 p-6 shadow-tilearg border borderGradient',
            'md:shadow-none md:border-0'
          )}
        />
        <img src="/images/sipka3.svg" className="max-w-xxs relative top-24 lg:hidden" />
      </div>
    </DefaultLayout>
  )
}

export default ObligationsPage
