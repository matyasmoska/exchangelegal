import { FormikErrors, useFormik } from 'formik'
import { emailIsValid } from '../../../../services/misc'
import axios from 'redaxios'
import { useTranslations } from '../../../../hooks/useTranslations'
import pageData from '../../../../data/forms.json'

export interface ContactFormValues {
	firstName: string
	lastName: string
	email: string
	phone: string
	ico: string
	businessAddress: string
	message: string
	personalDataAgreement: boolean
	marketingAgreement: boolean
}

function useContactForm () {
	const t = useTranslations<string>()

	const validate = (values: ContactFormValues): FormikErrors<ContactFormValues> => {
		const errors: FormikErrors<ContactFormValues> = {}

		if (!emailIsValid(values.email)) errors.email = t(pageData.emailNotValid)
		if (!values.email) errors.email = t(pageData.missingEmail)
		if (!values.firstName) errors.firstName = t(pageData.missingFirstName)
		if (!values.lastName) errors.lastName = t(pageData.missingLastName)
		if (!values.phone) errors.phone = t(pageData.missingPhone)
		if (!values.personalDataAgreement)
			errors.personalDataAgreement = t(pageData.missingPersonalDataAgreement)

		return errors
	}

	const formik = useFormik<ContactFormValues>({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			ico: '',
			businessAddress: '',
			phone: '',
			message: '',
			personalDataAgreement: false,
			marketingAgreement: true
		},
		validate,
		validateOnChange: false,
		onSubmit: async (values, { resetForm, setStatus, setFieldError }) => {
			const res = await axios.post('/api/message', { ...values } as ContactFormValues)

			if (res.data.result) {
				resetForm()
				setStatus('submitted')
				window.setTimeout(() => {
					setStatus('default')
				}, 5000)
			} else {
				setFieldError('api', t(pageData.formError))
			}
		}
	})

	return formik
}

export default useContactForm
