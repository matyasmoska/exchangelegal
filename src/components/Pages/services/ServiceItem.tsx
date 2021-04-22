import { Dispatch, FC, MouseEventHandler, useMemo } from 'react'
import Button from '../../Layout/Button'
import { AnimatedCheckmarkIcon, CheckmarkIcon } from '../../Layout/Icons'

export interface ServiceItemType {
	name: string
	description: string
	price: number
	icon: string
}

export interface ServiceItemProps {
	serviceItem: ServiceItemType
	selectedItems: ServiceItemType[]
	setSelectedItems: Dispatch<ServiceItemType[]>
}

export const ServiceItem: FC<ServiceItemProps> = ({ serviceItem, selectedItems, setSelectedItems }) => {
	const isSelected = useMemo(() => selectedItems.find((item: ServiceItemType) => item.name === serviceItem.name), [
		selectedItems
	])

	const deselectItem = (e: MouseEvent) => {
		e.stopPropagation()
		setSelectedItems(selectedItems.filter((i: ServiceItemType) => i.name !== serviceItem.name))
	}

	return (
		<div
			onClick={() => setSelectedItems([ ...selectedItems, serviceItem ])}
			className="relative flex flex-col justify-between p-8 text-left cursor-pointer text-dark-blue shadow-tile"
		>
			<div className="flex flex-col justify-between h-full space-y-4">
			    <img src={serviceItem.icon} className="w-12" />
    			<h3 className="text-2xl font-bold">{serviceItem.name}</h3>
    			<p>{serviceItem.description}</p>
    			<div className="flex items-end justify-between">
    				<p className="mb-0.5 text-sm">Cena od</p>
    				<p className="text-3xl font-bold text-orange-primary">{`${serviceItem.price},- Kč`}</p>
    			</div>
			</div>
			{isSelected && (
				<div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full space-y-12 text-white bg-dark-blue bg-opacity-90">
					<CheckmarkIcon className="w-12 h-12" />
					<h3 className="text-2xl font-bold">{serviceItem.name}</h3>
					<Button type="basic" className="px-6 py-2 text-sm" onClick={deselectItem as any}>
						Odebrat
					</Button>
				</div>
			)}
		</div>
	)
}
