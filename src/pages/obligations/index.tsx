import DefaultLayout from '../../layouts/DefaultLayout'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import data from '../../data/pages/obligations.json'
import useObligationsForm, { ObligationsFormValues } from '../../components/Pages/obligations/hooks/useObligationsForm'
import Checkbox from '../../components/Forms/Checkbox'
import { c } from '../../services/misc'
import Button from '../../components/Layout/Button'
import ErrorMessage from '../../components/Forms/ErrorMessage'
import { FormikErrors } from 'formik'

export default function Obligations () {
	const form = useObligationsForm()

	return (
		<DefaultLayout>
			<div className="space-y-10 text-center p-36">
				<h1 className="text-5xl font-bold leading-snug">Zjistěte, zda se na Vás vztahují AML povinnosti</h1>
				<div>
					<h3 className="text-lg font-bold">
						Provádím jako podnikatel nebo nepodnikající právnická osoba některou z těchto činností?
					</h3>
				</div>
				<form className="flex flex-col w-1/2 mx-auto space-y-2.5">
					{data.obligations.map((obl: string) => (
						<Checkbox
							key={obl}
							className={c('space-x-5 text-left')}
							form={form}
							isChecked={form.values.checked.includes(obl)}
							label={obl}
							id="checked"
						/>
					))}
				</form>
				<div className="relative flex flex-col items-center space-y-5">
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
