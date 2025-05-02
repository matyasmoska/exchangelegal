import Link from 'next/link'
import React, { FC } from 'react'
import { c } from '../../../services/misc'
import Checkbox from '../../Forms/Checkbox'
import ErrorMessage from '../../Forms/ErrorMessage'
import PhoneTextInput from '../../Forms/PhoneTextInput'
import TextArea from '../../Forms/TextArea'
import TextInput from '../../Forms/TextInput'
import Button from '../../Layout/Button'
import SelectedServicesList from './SelectedServicesList'
import { useTranslations } from '../../../hooks/useTranslations'
import pageData from '../../../data/forms.json'

const ServicesForm: FC<{ form: any; visibleRef: any }> = ({ form, visibleRef }) => {
	const t = useTranslations<string>()

	return (
		<form
			id="services-form"
			className={c(
				'flex flex-col items-center max-w-2xl mx-auto mb-24 space-y-6 text-center',
				'md:max-w-none, md:px-4 md:py-16'
			)}
		>
			
				<img className={c('w-16 h-16', 'md:w-12 md:h-12')} src="/images/services.svg" alt="Services icon" />
			
			
			<h2 className="text-4xl font-bold">{t(pageData.servicesFormTitle)}</h2>
			<p className={c('md:text-sm')}>
				{t(pageData.servicesFormDescription)}
			</p>
			
			
			<img src={t(pageData.cryptoImage)} className={c('w-1/2 rounded-lg', 'md:w-3/4')} />
			<p className={c('md:text-sm')}>
				{t(pageData.crypto)}{' '}
				<Link href="/prijimame-kryptomeny">
					<a target="_blank" className="underline">{t(pageData.here)}</a>
				</Link>
			</p>
			
			<SelectedServicesList form={form} />
			<div ref={visibleRef} className={c('grid w-full grid-cols-2 gap-4', 'md:block md:space-y-6')}>
				<TextInput
					form={form}
					value={form.values.firstName}
					id={'firstName'}
					placeholder={t(pageData.firstName)}
					autoComplete="given-name"
				/>
				<TextInput
					form={form}
					value={form.values.lastName}
					id={'lastName'}
					placeholder={t(pageData.lastName)}
					autoComplete="family-name"
				/>
				<TextInput
					form={form}
					value={form.values.email}
					id={'email'}
					placeholder={t(pageData.email)}
					autoComplete="email"
				/>
				<PhoneTextInput
					form={form}
					value={form.values.phone}
					id={'phone'}
					placeholder={t(pageData.phone)}
					autoComplete="tel"
				/>
				<TextInput form={form} value={form.values.ico} id={'ico'} placeholder={t(pageData.ico)} />
				<TextInput
					form={form}
					value={form.values.businessAddress}
					id={'businessAddress'}
					placeholder={t(pageData.businessAddress)}
					autoComplete="street-address"
				/>
				<div className="col-span-2">
					<TextArea
						placeholder={t(pageData.message)}
						className={c('md:h-40')}
						form={form}
						rows={3}
						value={form.values.message}
						id={'message'}
					/>
				</div>
			</div>
			<div className="w-full space-y-4">
				<Checkbox
					id={'personalDataAgreement'}
					form={form}
					isChecked={form.values.personalDataAgreement}
					value={`${t(pageData.agreeWith)} ${t(pageData.personalDataProcessing)}`}
					label={
						<span>
							{t(pageData.agreeWith)}{' '}
							<Link href="/zasady-zpracovani-osobnich-udaju">
								<a target="_blank" className="underline">{t(pageData.personalDataProcessing)}</a>
							</Link>
						</span>
					}
				/>

			</div>
			<div className="flex flex-col items-end justify-end w-full space-y-4">
				<Button
					onClick={form.handleSubmit}
					type="basic"
					className={c('px-16 py-3', 'md:w-full md:text-center md:py-3.5')}
				>
					{t(pageData.servicesFormSend)}
				</Button>
				{(form.errors as any).api && <ErrorMessage id="api">{(form.errors as any).api}</ErrorMessage>}
				{form.status === 'submitted' && (
					<span className="text-green-600">{t(pageData.formSuccess)}</span>
				)}
			</div>
		</form>
	)
}

export default ServicesForm
