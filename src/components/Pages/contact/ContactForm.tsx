import Link from 'next/link'
import React from 'react'
import { c } from '../../../services/misc'
import Checkbox from '../../Forms/Checkbox'
import ErrorMessage from '../../Forms/ErrorMessage'
import PhoneTextInput from '../../Forms/PhoneTextInput'
import TextArea from '../../Forms/TextArea'
import TextInput from '../../Forms/TextInput'
import Button from '../../Layout/Button'
import useContactForm from './hooks/useContactForm'

const ContactForm = () => {
	const form = useContactForm()

	return (
		<form className="flex flex-col space-y-5">
			<div className={c('grid grid-cols-2 gap-6 gap-x-4', 'md:block md:space-y-6')}>
				<TextInput
					form={form}
					value={form.values.firstName}
					id={'firstName'}
					placeholder={'Jméno'}
					autoComplete="given-name"
				/>
				<TextInput
					form={form}
					value={form.values.lastName}
					id={'lastName'}
					placeholder={'Příjmení'}
					autoComplete="family-name"
				/>
				<TextInput
					form={form}
					value={form.values.email}
					id={'email'}
					placeholder={'E-mail'}
					autoComplete="email"
				/>
				<PhoneTextInput
					form={form}
					value={form.values.phone}
					id={'phone'}
					placeholder={'Telefon'}
					autoComplete="tel"
				/>
				<TextInput form={form} value={form.values.ico} id={'ico'} placeholder={'IČO (nepovinné)'} />
				<TextInput
					form={form}
					value={form.values.businessAddress}
					id={'businessAddress'}
					placeholder={'Obchodní firma (nepovinné)'}
					autoComplete="street-address"
				/>
				<div className="col-span-2">
					<TextArea
						placeholder={'Zde napište zprávu'}
						className={c('md:h-40')}
						form={form}
						rows={3}
						value={form.values.message}
						id={'message'}
					/>
				</div>
			</div>
			<div className="flex justify-between items-center gap-y-6 lg:flex-wrap md:flex-nowrap xs:flex-wrap">
				<div className="space-y-4">
					<Checkbox
						id={'personalDataAgreement'}
						form={form}
						isChecked={form.values.personalDataAgreement}
						value={'Souhlasím se zpracováním osobních údajů'}
						label={
							<span>
								Souhlasím se{' '}
								<a target="_blank" href="/zasady-zpracovani-osobnich-udaju" className="underline">zpracováním osobních údajů</a>
							</span>
						}
					/>
					
				</div>
				<div className="flex flex-col items-end self-end space-y-4 ml-auto">
					<Button
						onClick={form.handleSubmit as any}
						type="basic"
						className={c('px-16 py-2', 'md:w-full md:text-center md:py-3.5')}
					>
						Odeslat
					</Button>
					{(form.errors as any).api && <ErrorMessage id="api">{(form.errors as any).api}</ErrorMessage>}
					{form.status === 'submitted' && (
						<span className="text-green-600">Odeslání proběhlo úspěšně. Děkujeme!</span>
					)}
				</div>
			</div>
			
		</form>
	)
}

export default ContactForm
