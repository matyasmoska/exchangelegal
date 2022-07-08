import DefaultLayout from '../layouts/DefaultLayout'
import SEO from '../components/Layout/SEO'
import React from 'react'
import { PhoneIcon, MessageIcon, FacebookIcon, TwitterIcon, LinkedInIcon } from '../components/Layout/Icons'
import { WrappedIconRow, IconRow } from '../components/Layout/Icon'
import ContactForm from '../components/Pages/contact/ContactForm'
import { c } from '../services/misc'
import contactPageData from '../data/contact.json'
import pageData from '../data/pages/contact.json'

export default function Contact () {
	return (
		<DefaultLayout>
			<SEO
				title="Kontakty – 15zisif.cz"
				description="✅ Jsme předními odborníky v oblasti AML compliance ⭐ Máme unikátní zkušenosti a know-how v AML/CFT"
				keywords="AML, AML solutions, AML compliance, AML povinnosti, AML systém vnitřních zásad, AML školení, AML hodnocení rizik, AML dotazník, AML zákon, AML směrnice"
			/>
			<div
				className={c(
					'flex space-x-4 px-36 py-8 pb-52',
					'2xl:px-24',
					'xl:px-24',
					'md:block md:space-x-0 md:px-0 md:pb-32'
				)}
			>
				<div className={c('w-full relative shadow-inner', 'md:h-72')}>
					<iframe
						width="100%"
						height="100%"
						className="relative z-20"
						style={{ border: 0 }}
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2561.9223858112055!2d14.437017615885283!3d50.05028522399825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94759b1f6d5b%3A0x588df01abda2d398!2sNa%20Str%C5%BEi%201702%2F65%2C%20140%2000%20Praha%204-Nusle!5e0!3m2!1scs!2scz!4v1646906243995!5m2!1scs!2scz"
					/>
					<div className="absolute top-0 left-0 z-0 w-full h-full transition transform bg-gray-300 animate-pulse" />
				</div>
				<div className={c('w-5/6 px-4 py-0 space-y-8', '2xl:p-10 2xl:px-8', 'md:p-8 md:w-full')}>
					<div className="space-y-8">
						<div className={c('space-y-2.5 w-4/6', 'md:w-full')}>
							<h1 className="text-3xl font-bold">{pageData.header}</h1>
							<p className="text-justify">{pageData.description}</p>
						</div>
						<div className={c('space-y-2.5 w-4/6', 'md:w-full')}>
							<p className="font-bold">{contactPageData.address.firstLine}</p>
							<p>{contactPageData.address.secondLine}</p>
							<p>{contactPageData.address.thirdLine}</p>
							<p>Společnost je zapsána v obchodním rejstříku vedeném Městským soudem v Praze, sp. zn. C 346730</p>
						</div>
						<div className={c('space-y-2.5 w-4/6', 'md:w-full')}>
							<WrappedIconRow Icon={PhoneIcon} href={`tel:${contactPageData.phoneNumber}`}>
								{contactPageData.phoneNumber}
							</WrappedIconRow>
							<WrappedIconRow Icon={MessageIcon} href={`mailto:${contactPageData.email}`}>
								{contactPageData.email}
							</WrappedIconRow>
						</div>
						<div className="flex flex-col space-y-2.5 w-4/6 text-dark-blue">

							<a
								href={contactPageData.links.twitter}
								className="flex items-center space-x-3"
								aria-label="Twitter Link"
								target="_blank"
							>
								<TwitterIcon className="fill-current w-7 h-7" />
								<span>Twitter</span>
							</a>
							<a
								href={contactPageData.links.linkedIn}
								className="flex items-center space-x-3"
								aria-label="Linked In Link"
								target="_blank"
							>
								<LinkedInIcon className="fill-current w-7 h-7" />
								<span>Linked In</span>
							</a>
						</div>
					</div>
					<ContactForm />
				</div>
			</div>
		</DefaultLayout>
	)
}
