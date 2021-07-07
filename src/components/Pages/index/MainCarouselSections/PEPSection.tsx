import React from 'react'
import { c } from '../../../../services/misc'
import Image from 'next/image'
import thumbnail from '../../../../../public/images/pep-background.jpg'
import Button from '../../../Layout/Button'
import pageData from '../../../../data/pages/index.json'

const PEPSection = () => {
	return (
		<div
			className={c(
				'relative w-full bg-cover px-36 py-36 pt-24 h-[602px]',
				'3xl:px-28',
				'md:px-5 md:pt-28 md:h-[674px]'
			)}
		>
			<Image
				layout="fill"
				objectFit="cover"
				priority
				placeholder="blur"
				src={thumbnail}
				alt="Background Image"
				className="top-0 left-0 z-0"
			/>
			<div
				className={c(
					'absolute top-0 left-0 z-10 w-full h-full'
				)}
			/>
			<div className={c('relative z-10 max-w-3xl space-y-12 text-white', 'md:max-w-none md:text-center')}>
                <div className="flex flex-col space-y-8">
                    <h1
                        dangerouslySetInnerHTML={{ __html: pageData.pepCheckSection.title }}
                        className={c('text-5xl font-bold leading-tight', 'md:text-3xl')}
                    />
                    <p className="text-lg leading-relaxed text-justify">{pageData.pepCheckSection.subtitle}</p>
                </div>
                <div
                    className={c(
                        'grid gap-6 items-center w-9/12 grid-cols-2',
                        'md:block md:space-y-6 md:w-full md:space-x-0'
                    )}
                >
                    <a href="https://pepcheck.cz" target="_blank" rel="noreferrer">
                        <Button type="basic" className="px-6 py-2">
                            {pageData.pepCheckSection.buttonText}
                        </Button>
                    </a>
                </div>
            </div>
			
		</div>
	)
}

export default PEPSection
