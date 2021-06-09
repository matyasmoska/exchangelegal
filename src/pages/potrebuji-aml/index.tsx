import DefaultLayout from '../../layouts/DefaultLayout'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import data from '../../data/pages/ineedaml.json'
import useObligationsForm, { ObligationsFormValues } from '../../components/Pages/obligations/hooks/useObligationsForm'
import Checkbox from '../../components/Forms/Checkbox'
import { c } from '../../services/misc'
import Button from '../../components/Layout/Button'
import ErrorMessage from '../../components/Forms/ErrorMessage'
import { FormikErrors } from 'formik'

export default function Obligations () {
	const form = useObligationsForm()

	useEffect(() => {
		if ( form.values.noneOfTheAbove ) {
			form.setFieldValue('checked', [])
		}
	}, [form.values.noneOfTheAbove]);

	useEffect(() => {
		if ( form.values.checked.length > 0 ) {
			form.setFieldValue('noneOfTheAbove', false)
		}
	}, [form.values.checked])

	return (
		<DefaultLayout>
			<div className={c('space-y-10 text-center p-36 py-16', 'md:px-4 md:py-8')}>
				<h1 className={c('text-5xl font-bold leading-snug', 'md:text-2xl md:px-4')}>{data.header}</h1>
				<div>
					<h3 className={c('text-lg font-bold', 'md:text-sm')}>{data.subheader}</h3>
				</div>
				<form
					className={c(
						'grid grid-rows-[8] grid-cols-2 gap-2.5 px-28 pb-16 pt-12',
						'md:flex md:flex-col md:space-y-2 md:px-0 md:pt-0 md:pb-8'
					)}
				>
					{data.obligations.map((obl: string) => (
						<Checkbox
							key={obl}
							className={c('space-x-5 text-left')}
							form={form}
							isChecked={form.values.checked.includes(obl)}
							label={obl}
							value={obl}
							id="checked"
						/>
					))}
					<div className={c("flex items-center justify-center col-span-2 mt-8", "md:pt-8")}>
						<Checkbox
							key={'noneOfTheAbove'}
							className={c('space-x-5 text-left')}
							form={form}
							isChecked={form.values.noneOfTheAbove}
							label={data.noneOfTheAbove}
							value={data.noneOfTheAbove}
							id="noneOfTheAbove"
						/>
					</div>
				</form>
				
				<div className={c("relative flex flex-col items-center space-y-5", "md:mb-10")}>
					<Button type="basic" onClick={form.handleSubmit as any} className="py-2.5 px-24">
						Ověřit
					</Button>
					<div className="absolute -bottom-10">
						<ErrorMessage id={'api'}>
							{(form.errors as FormikErrors<ObligationsFormValues & { api: string }>)['api']}
						</ErrorMessage>
					</div>
				</div>
			</div>
		</DefaultLayout>
	)
}
