import { AnimateSharedLayout, motion as m } from 'framer-motion'
import React, { FC } from 'react'
import contactPageData from '../../../data/contact.json'

/*
    Top contact bar on all pages.
*/

const TopBar: FC = () => {
	return (
		<AnimateSharedLayout>
		    <m.div className="space-y-2 flex-shrink-0 whitespace-nowrap underlineOffset">
                <div className="flex gap-4 lg:gap-2 items-center">
                    <div className="flex gap-2">
                        <a href={contactPageData.contact.links.twitter} target="_blank" rel="noopener" aria-label="Twitter Link">
                            <img src="/images/twitter-icon.svg" className="w-5 h-5" />
                        </a>
                    </div>
                    <div className="flex gap-2">
                        <a href={`mailto:${contactPageData.contact.emailLink}`} className="hover:underline flex gap-2" aria-label="E-mail Link">
                            <img src="/images/mail-icon.svg" className="w-6 h-6" title={contactPageData.contact.email} />
                            <span className="lg:hidden">{contactPageData.contact.email}</span>
                        </a>
                    </div>
                </div>
                <div className="flex gap-4 lg:gap-2 items-center">
                    <div className="flex gap-2">
                        <a href={contactPageData.contact.links.linkedIn} target="_blank" rel="noopener" aria-label="Linked In Link">
                            <img src="/images/linkedin-icon.svg" className="w-5 h-5" />
                        </a>
                    </div>
                    <div className="flex gap-2">
                        <a href={`tel:${contactPageData.contact.phoneNumberLink}`} className="hover:underline flex gap-2" aria-label="Phone Link">
                            <img src="/images/phone-icon.svg" className="w-6 h-6" title={contactPageData.contact.phoneNumber} />
                            <span className="lg:hidden">{contactPageData.contact.phoneNumber}</span>
                        </a>
                    </div>
    			</div>
    		</m.div>
		</AnimateSharedLayout>
	)
}

export default TopBar
