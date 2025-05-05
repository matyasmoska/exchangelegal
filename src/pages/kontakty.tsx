/* src/pages/kontakty.tsx */
import DefaultLayout from '../layouts/DefaultLayout'
import SEO from '../components/Layout/SEO'
import React from 'react'
import {
  PhoneIcon,
  MessageIcon,
  LinkedInIcon,
} from '../components/Layout/Icons'
import { WrappedIconRow } from '../components/Layout/Icon'
import ContactForm from '../components/Pages/contact/ContactForm'
import { c } from '../services/misc'
import { useTranslations } from '../hooks/useTranslations'
import contactPageData from '../data/contact.json'

export default function Contact () {
  const t = useTranslations()

  return (
    <DefaultLayout>
      <SEO
        title="15 ZISIF – kontakty – 15zisif.cz"
        description="✅ Jsme odborníky v oblasti zakládání fondů ⭐ Máme unikátní zkušenosti a know‑how v oblasti alternativních fondů dle § 15 ZISIF"
        keywords="alternativní investiční fond, minifond, alternativní fond, § 15 ZISIF, 15zisif, osoba rizikového kapitálu"
      />

      {/* ───── 2 × 2 GRID ───── */}
      <div
        className={c(
          'grid grid-cols-2 grid-rows-2 gap-12 px-24 py-16',
          'lg:px-12 lg:gap-8',
          'md:grid-cols-1 md:grid-rows-none md:px-6 md:py-10'
        )}
      >
        {/* 1) FORMULÁŘ – LEVÝ HORNÍ */}
        <section className="space-y-8">
          <header className="space-y-2.5">
            <h1 className="text-4xl font-extrabold">
              {t(contactPageData.contact.header)}
            </h1>
            <p className="text-lg text-justify">
              {t(contactPageData.contact.description)}
            </p>
          </header>

          <ContactForm />
        </section>

        {/* 2) FOTKA – PRAVÝ HORNÍ (zmenšená na 50 % šířky) */}
        <figure className="flex items-center justify-center w-full h-full overflow-hidden">
          <img
            src="/images/moskamurad1.jpg"
            alt="Zakladatelé 15 ZISIF"
            className="w-1/2 h-auto object-cover"   /* 50 % šířky rodiče */
          />
        </figure>

        {/* 3) KONTAKTY – LEVÝ DOLNÍ */}
        <aside className="space-y-8">
          <address className="not-italic space-y-1.5 leading-relaxed text-lg">
            <p className="font-bold">
              {contactPageData.contact.address.firstLine1}
            </p>
            <p className="font-bold">
              {contactPageData.contact.address.firstLine2}
            </p>
            <p>{contactPageData.contact.address.secondLine}</p>
            <p>{t(contactPageData.contact.secondDescription)}</p>
            <p>{t(contactPageData.contact.thirdDescription)}</p>
          </address>

          <div className="space-y-2.5">
            <WrappedIconRow
              Icon={PhoneIcon}
              href={`tel:${contactPageData.contact.phoneNumberLink}`}
            >
              {contactPageData.contact.phoneNumber}
            </WrappedIconRow>
            <WrappedIconRow
              Icon={MessageIcon}
              href={`mailto:${contactPageData.contact.emailLink}`}
            >
              {contactPageData.contact.email}
            </WrappedIconRow>

            <a
              href={contactPageData.contact.links.linkedIn}
              className="flex items-center space-x-3 text-dark-blue"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon className="w-7 h-7 fill-current" />
              <span>Linked In</span>
            </a>
          </div>
        </aside>

        {/* 4) MAPA – PRAVÝ DOLNÍ */}
        <div className="w-full h-96 md:h-72 relative shadow-inner">
          <iframe
            title="Mapa"
            className="absolute inset-0 w-full h-full z-10"
            frameBorder={0}
            src="https://maps.google.com/maps?width=533&amp;height=400&amp;hl=cs&amp;q=Na%20Dolinách%20153/22,%20Podol%C3%AD,%20147%2000%20Praha%204&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          />
          <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        </div>
      </div>
    </DefaultLayout>
  )
}
