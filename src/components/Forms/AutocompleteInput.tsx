import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import { ChangeEvent, ComponentPropsWithoutRef, FC } from 'react'
import { c } from '../../services/misc'
import ErrorMessage from './ErrorMessage'
import { useClickOutside } from 'react-click-outside-hook'

export interface AuthTextInputFields extends ComponentPropsWithoutRef<'input'> {
	form: any
	value: string
	id: string
	type?: string
	data?: string[]
}

const AutocompleteInput: FC<AuthTextInputFields> = ({
	form,
	value,
	id,
	type = 'text',
	placeholder,
	autoComplete,
	data
}) => {
	const [focused, setFocused] = React.useState(false)
	const [wrapperRef, hasClickedOutside] = useClickOutside()

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		form.handleChange(e.target.value)
	}

	useEffect(() => {
		if (hasClickedOutside) {
			setFocused(false)
		}
	}, [hasClickedOutside])

	const handleClick = (s: string) => {
		form.handleChange(s)
		setFocused(false)
		form.handleSubmit()
	}

	return (
		<motion.div className="relative" ref={wrapperRef}>
			<motion.label layout data-test={`${id}-input-wrapper`} className="block space-y-1 text-dark-blue">
				<motion.input
					layout
					autoComplete={autoComplete}
					className={c(
						'border-dark-blue',
						'text-medium block w-full px-3 py-2 text-base placeholder-gray-400',
						'focus:ring-0 focus:border-orange-primary focus:shadow-none',
						'md:py-2.5 md:px-2.5'
					)}
					value={value}
					data-test={`${id}-input`}
					id={id}
					onFocus={() => setFocused(true)}
					placeholder={placeholder}
					onChange={event => {
						onChange(event)
					}}
					type={type}
				/>
			</motion.label>
			{focused && value.length > 2 && (
				<motion.ul
					initial={{ y: 10, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					layout
					className="absolute z-10 bg-white shadow-md rounded-lg overflow-auto mt-2 py-2 left-0 w-72 md:max-w-full"
				>
					{data && data.length > 0 ? (
						<>
							{data.map((item, index) => (
								<motion.li
									layout="position"
									key={`person-autocomplete-${item}`}
									className="px-4 py-2 text-xs text-left hover:bg-orange-primary-hover hover:text-white cursor-pointer"
									onClick={e => handleClick(item)}
								>
									{item}
								</motion.li>
							))}
						</>
					) : (
						<motion.li layout="position" className="px-4 py-2 text-xs text-left">Žádný výsledek</motion.li>
					)}
				</motion.ul>
			)}
		</motion.div>
	)
}

export default AutocompleteInput
