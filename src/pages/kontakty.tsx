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

      {/* ---------- 2 × 2 grid layout ---------- */}
      <div
        className={c(
          'grid grid-cols-2 grid-rows-2 gap-6 px-24 py-12',
          'lg:px-12 md:grid-cols-1 md:grid-rows-none md:gap-8 md:px-0 md:py-8'
        )}
      >
        {/* ───── levý horní: FOTKA (50 %) ───── */}
        <figure className="row-span-1 col-span-1 flex items-center justify-center w-full h-full overflow-hidden">
          <img
            src="/images/moskamurad1.jpg"
            alt="Zakladatelé 15 ZISI
