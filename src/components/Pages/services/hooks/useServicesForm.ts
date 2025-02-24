import { useRouter } from 'next/dist/client/router'
import { ContactFormValues } from './../../contact/hooks/useContactForm'
import { ServiceItem, ServiceItemType } from './../ServiceItem'
import { FormikErrors, useFormik } from 'formik'
import { emailIsValid } from '../../../../services/misc'
import axios from 'redaxios'
import { useTranslations } from '../../../../hooks/useTranslations'
import pageData from '../../../../data/forms.json'

export interface ServicesFormValues extends ContactFormValues {
	checked: ServiceItemType[]
}

function useServicesForm () {
	const t = useTranslations<string>()

	const router = useRouter()

	const validate = (values: ServicesFormValues): FormikErrors<ServicesFormValues> => {
		const errors: FormikErrors<ServicesFormValues & { api: string }> = {}

		if (!emailIsValid(values.email)) errors.email = t(pageData.emailNotValid)
		if (!values.email) errors.email = t(pageData.missingEmail)
		if (!values.firstName) errors.firstName = t(pageData.missingFirstName)
		if (!values.lastName) errors.lastName = t(pageData.missingLastName)
		if (!values.phone) errors.phone = t(pageData.missingPhone)
		if (!values.personalDataAgreement)
			errors.personalDataAgreement = t(pageData.missingPersonalDataAgreement)
		if (!values.checked.length) errors.api = t(pageData.missingServiceFormError)

		return errors
	}

	const formik = useFormik<ServicesFormValues>({
		initialValues: {
			checked: [],
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			ico: '',
			businessAddress: '',
			message: '',
			personalDataAgreement: false,
			marketingAgreement:  true
		},
		validate,
		validateOnChange: false,
		onSubmit: async (values, { resetForm, setStatus, setFieldError }) => {
			const res = await axios.post('/api/servicesMessage', { ...values } as ContactFormValues)

			if ( res.data.result ) {
				/*
				resetForm()
				setStatus('submitted')
				window.setTimeout(() => {
					setStatus('default')
				}, 5000)
				*/
				router.push('/dekujeme')
			} else {
				setFieldError('api', t(pageData.formError))
			}
		}
	})

	return formik
}

export default useServicesForm
