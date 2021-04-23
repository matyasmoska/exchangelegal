import React from 'react'
import { c } from '../../../services/misc'
import Checkbox from '../../Forms/Checkbox'
import PhoneTextInput from '../../Forms/PhoneTextInput'
import TextArea from '../../Forms/TextArea'
import TextInput from '../../Forms/TextInput'
import Button from '../../Layout/Button'
import useContactForm from './hooks/useContactForm'

const ContactForm = () => {
	const form = useContactForm()

	return (
		<form className="flex flex-col space-y-5">
			<div className={c('grid grid-cols-2 gap-6', 'md:block md:space-y-6')}>
				<TextInput
					form={form}
					value={form.values.firstName}
					id={'firstName'}
					placeholder={'Křestní jméno'}
					autoComplete="given-name"
				/>
				<TextInput
					form={form}
					value={form.values.lastName}
					id={'lastName'}
					placeholder={'Přijmení'}
					autoComplete="family-name"
				/>
				<TextInput
					form={form}
					value={form.values.email}
					id={'email'}
					placeholder={'Email'}
					autoComplete="email"
				/>
				<PhoneTextInput
					form={form}
					value={form.values.phone}
					id={'phone'}
					placeholder={'Telefon'}
					autoComplete="tel"
				/>
				<div className="col-span-2">
					<TextArea placeholder={'Zde napište zprávu'} className={c('md:h-40')} form={form} rows={3} value={form.values.message} id={'message'} />
				</div>
			</div>
			<div className="space-y-4">
				<Checkbox
					id={'personalDataAgreement'}
					form={form}
					isChecked={form.values.personalDataAgreement}
					label={'Souhlasím se zpracováním osobních údajů'}
				/>
			</div>
			<div className="flex justify-end">
				<Button
					onClick={form.handleSubmit as any}
					type="basic"
					className={c('px-16 py-2', 'md:w-full md:text-center md:py-3.5')}
				>
					Odeslat
				</Button>
			</div>
		</form>
	)
}

export default ContactForm
