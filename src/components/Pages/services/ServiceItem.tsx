import { AnimatePresence, motion as m } from 'framer-motion'
import { Dispatch, FC, MouseEventHandler, useMemo, useState } from 'react'
import { heightAnimation } from '../../../animations/navigation'
import { useMediaQueries } from '../../../hooks/useMediaQueries'
import { c, numberWithSpaces as ns } from '../../../services/misc'
import Button from '../../Layout/Button'
import { CheckmarkIcon, CloseIcon } from '../../Layout/Icons'

interface MoreInfoProps {
	href: string
	type: 'secondary' | 'light'
}

const MoreInfo: FC<MoreInfoProps> = ({ href, type }) => (
	<a href={href} target="_blank" onClick={(e) => e.stopPropagation()}>
		<Button type={type} className="px-8 py-2.5">
			Více informací
		</Button>
	</a>
)

export interface ServiceItemType {
	id: string
	name: string
	description: string
	price: number
	link: string
	icon: string
}

export interface ServiceItemProps {
	serviceItem: ServiceItemType
	selectedItems: ServiceItemType[]
	setSelectedItems: Dispatch<ServiceItemType[]>
}

export const ServiceItem: FC<ServiceItemProps> = ({ serviceItem, selectedItems, setSelectedItems }) => {
	const { isMd } = useMediaQueries()

	const isSelected = useMemo(() => selectedItems.find((item: ServiceItemType) => item.name === serviceItem.name), [
		selectedItems
	])

	const [ hover, setHover ] = useState(false)

	const deselectItem: MouseEventHandler = (e) => {
		e.stopPropagation()
		setSelectedItems(selectedItems.filter((i: ServiceItemType) => i.name !== serviceItem.name))
	}

	return (
		<div
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onClick={() => {
				if (!isSelected && isMd) setSelectedItems([ ...selectedItems, serviceItem ])
			}}
			className={c(
				'relative flex flex-col justify-between p-8 text-left cursor-pointer text-dark-blue shadow-tile',
				'3xl:p-6'
			)}
		>
			<div className="flex flex-col justify-between h-full space-y-4">
				<div className="flex flex-col space-y-5">
					<img src={serviceItem.icon} className={c('w-12', 'md:self-center')} />
					<h3 className={c('text-2xl font-bold', '3xl:text-xl', 'md:text-center md:text-2xl')}>
						{serviceItem.name}
					</h3>
					<p className={c('text-justify', '3xl:text-sm', 'md:text-justify')}>{serviceItem.description}</p>
				</div>
				<div className="flex flex-col space-y-1">
					<div className="flex items-end justify-between">
						<p className="mb-[2px] text-lg">Cena od:</p>
						<p
							className={c('text-3xl font-bold text-wine-primary', '3xl:text-2xl')}
						>{`${ns(serviceItem.price)},- Kč`}</p>
					</div>
					<div className="flex justify-end text-lg text-gray-400">bez DPH</div>
				</div>
				{isMd && <Button type="basic" className="px-8 py-2.5">
					Přidat
				</Button>}
				{isMd && <MoreInfo href={serviceItem.link} type="secondary" />}
			</div>
			<AnimatePresence>
				{isSelected && (
					<m.div
						{...heightAnimation}
						className={c(
							'absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full space-y-12 overflow-hidden text-white bg-dark-blue bg-opacity-90',
							'3xl:space-y-8 3xl:px-2'
						)}
					>
						<m.div onClick={deselectItem}>
							<CloseIcon className="absolute w-8 h-8 transition transform top-5 right-5 hover:scale-110" />
						</m.div>
						<CheckmarkIcon className="w-12 h-12" />
						<h3 className={c('text-3xl font-bold max-w-[90%] text-center', '3xl:text-xl')}>{serviceItem.name}</h3>
						<p className="text-[32px] font-bold text-wine-primary">Přidáno</p>
					</m.div>
				)}
				{hover && !isSelected && !isMd && (
					<m.div
						{...heightAnimation}
						className={c(
							'absolute top-0 left-0 flex text-center flex-col items-center justify-center w-full h-full space-y-12 overflow-hidden text-white bg-dark-blue bg-opacity-90',
							'3xl:space-y-8 3xl:px-2'
						)}
					>
						<h3 className={c('text-2xl font-bold', '3xl:text-xl')}>{serviceItem.name}</h3>
						<p className={c('text-2xl font-bold', '3xl:text-xl')}>Cena od {`${ns(serviceItem.price)},- Kč`}</p>
						<Button
							onClick={() => {
								if (!isSelected) setSelectedItems([ ...selectedItems, serviceItem ])
							}}
							type="basic"
							className="px-8 py-2.5"
						>
							Přidat
						</Button>
						<MoreInfo href={serviceItem.link} type="light" />
					</m.div>
				)}
			</AnimatePresence>

		</div>
	)
}
