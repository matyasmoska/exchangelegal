import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import Input from '../../Forms/AutocompleteInput'
import { fetchAutocomplete } from '../../../services/sancions'

interface SancionsFormProps {
	onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	onPersonChange: (name: string) => void
	person: string
}

const SanctionsForm: FC<SancionsFormProps> = ({ onPersonChange, onFormSubmit, person }) => {
	const [autocompleteData, setAutocompleteData] = useState<string[]>([])
	const [searchedPerson, setSearchedPerson] = useState<string>('')
	const formRef = useRef<HTMLFormElement>(null)

	const form = {
		handleChange: (s: string) => {
			setSearchedPerson(s)
			return onPersonChange(s)
		},
		handleSubmit: () => {
			if (formRef.current) {
				formRef?.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
			}
		}
	}

	useEffect(async () => {
		if (searchedPerson && searchedPerson.length > 2) {
			const data = await fetchAutocomplete(searchedPerson)
			setAutocompleteData(data.data)
			console.log('autocomplete', data)
		} else {
			setAutocompleteData([])
		}
	}, [searchedPerson])

	return (
		<form
			className="flex md:flex-col flex-row items-center justify-between"
			onSubmit={onFormSubmit}
			autoComplete="off"
			ref={formRef}
		>
			<label className="md:mb-4 md:mr-0 mr-4 font-bold" htmlFor="sanctions-input">
				Zde zadejte jméno a příjmení klienta:
			</label>
			<div className="flex">
				<Input
					data={autocompleteData}
					form={form}
					value={person}
					className="text-medium block px-3 py-2 text-base placeholder-gray-400 focus:ring-0 focus:border-orange-primary focus:shadow-none md:py-2.5 md:px-2.5"
					autoComplete="off"
					name="person"
					required
					id="sanctions-input"
				/>
				<button className="px-4 bg-orange-primary text-white hover:bg-orange-primary-hover border-orange-primary hover:border-orange-primary-hover flex items-center justify-center transform-gpu transition cursor-pointer border">
					Vyhledat
				</button>
			</div>
		</form>
	)
}

export default SanctionsForm
