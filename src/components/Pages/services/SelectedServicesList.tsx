import { FormikProps } from 'formik'
import { AnimateSharedLayout, motion as m } from 'framer-motion'
import React from 'react'
import { FC } from 'react'
import { c, numberWithSpaces as ns } from '../../../services/misc'
import { ServicesFormValues } from './hooks/useServicesForm'

const SelectedServicesList: FC<{ form: FormikProps<ServicesFormValues> }> = ({ form }) => {
	const price = form.values.checked.reduce((acc, curr) => acc + curr.price, 0)

	return (
		<AnimateSharedLayout>
			<m.div layout className={c('flex flex-col w-full p-6 space-y-4 shadow-tile', 'md:p-3')}>
				{form.values.checked.length ? (
					<React.Fragment>
						<div className="flex flex-col space-y-3">
							{form.values.checked.map((item) => (
								<m.div key={item.name} layout className={c("flex items-center justify-between", "md:space-x-1")}>
									<span className={c("font-bold", "md:text-left")}>{item.name}</span>
									<span className={c("md:text-right md:w-1/2")}>{`${ns(item.price)},- Kč`}</span>
								</m.div>
							))}
						</div>
						<hr />
						<m.div layout className="flex items-center justify-between">
							<p>Celkem</p>
							<p className={c('text-2xl font-bold text-wine-primary', 'text-xl')}>{`${ns(
								price
							)},- EUR`}</p>
						</m.div>
					</React.Fragment>
				) : (
					<m.p layout className="text-red-500">
						Prosím, vyberte alespoň jednu službu.
					</m.p>
				)}
			</m.div>
		</AnimateSharedLayout>
	)
}

export default SelectedServicesList
