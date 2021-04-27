import React, { FC } from 'react'
import { c } from '../../../services/misc'
import Checkbox from '../../Forms/Checkbox'
import ErrorMessage from '../../Forms/ErrorMessage'
import PhoneTextInput from '../../Forms/PhoneTextInput'
import TextArea from '../../Forms/TextArea'
import TextInput from '../../Forms/TextInput'
import Button from '../../Layout/Button'
import SelectedServicesList from './SelectedServicesList'

const ServicesForm: FC<{ form: any }> = ({ form }) => {
	return (
		<form id="services-form" className={c("flex flex-col items-center max-w-2xl mx-auto mb-24 space-y-6 text-center", 'md:max-w-none, md:px-4 md:py-16')}>
			<img className={c("w-16 h-16", "md:w-12 md:h-12")} src="/images/services.svg" alt="Services icon"/>
			<h2 className="text-4xl font-bold">Nezávazná poptávka</h2>
			<p className={c('md:text-sm')}>Vyplněním údajů a kliknutím tlačítka "Nezávazně poptat" nezávazně poptáte nabídku služeb.</p>
			<SelectedServicesList form={form} />
			<div className={c('grid w-full grid-cols-2 gap-4', 'md:block md:space-y-6')}>
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
			<div className="w-full space-y-4">
				<Checkbox
					id={'personalDataAgreement'}
					form={form}
					isChecked={form.values.personalDataAgreement}
					label={'Souhlasím se zpracováním osobních údajů'}
				/>
				<Checkbox
					id={'marketingAgreement'}
					form={form}
					isChecked={form.values.marketingAgreement}
					label={'Souhlasím se zasíláním obchodních sdělení'}
				/>
			</div>
			<div className="flex flex-col items-end justify-end w-full space-y-4">
				<Button
					onClick={form.handleSubmit}
					type="basic"
					className={c('px-16 py-3', 'md:w-full md:text-center md:py-3.5')}
				>
					Nezávazně poptat
				</Button>
				{ (form.errors as any).api && <ErrorMessage id="api" >{ (form.errors as any).api }</ErrorMessage> }
				{ form.status === 'submitted' && <span className="text-green-600">Odeslání proběhlo úspěšně. Děkujeme!</span>}
			</div>
		</form>
	)
}

export default ServicesForm
