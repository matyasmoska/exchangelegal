import { AnimateSharedLayout, motion as m } from 'framer-motion'
import React, { FC } from 'react'
import contactPageData from '../../../data/pages/index.json'

/*
    Top contact bar on all pages.
    Config can be found on pages/index.json
*/

const TopBar: FC = () => {
	return (
		<AnimateSharedLayout>
		    <m.div className="space-y-2 whitespace-nowrap underlineOffset">
                <div className="flex gap-4 lg:gap-2 items-center">
                    <div className="flex gap-2">
                        <a href={contactPageData.contact.links.twitter} target="_blank" rel="noopener" aria-label="Twitter Link">
                            <img src="/images/twitter-icon.svg" className="w-5 h-5" />
                        </a>
                    </div>
                    <div className="flex gap-2">
                        <img src="/images/mail-icon.svg" className="w-6 h-6" />
                        <a href={`mailto:${contactPageData.contact.email}`} className="hover:underline">
                            {contactPageData.contact.email}
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
                        <img src="/images/phone-icon.svg" className="w-6 h-6" />
                        <a href={`tel:${contactPageData.contact.phoneNumber}`} className="hover:underline">
                            {contactPageData.contact.phoneNumber}
                        </a>
                    </div>
    			</div>
    		</m.div>
		</AnimateSharedLayout>
	)
}

export default TopBar
