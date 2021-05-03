import { ContactFormValues } from './../../contact/hooks/useContactForm'
import { ServiceItem, ServiceItemType } from './../ServiceItem'
import { FormikErrors, useFormik } from 'formik'
import { emailIsValid } from '../../../../services/misc'
import axios from 'redaxios'

export interface ServicesFormValues extends ContactFormValues {
	checked: ServiceItemType[]
}

function useServicesForm () {
	const validate = (values: ServicesFormValues): FormikErrors<ServicesFormValues> => {
		const errors: FormikErrors<ServicesFormValues & { api: string }> = {}

		if (!emailIsValid(values.email)) errors.email = 'Email je v nesprávném formátu'
		if (!values.email) errors.email = 'Je potřeba zadat email'
		if (!values.firstName) errors.firstName = 'Je potřeba zadat křestní jméno'
		if (!values.lastName) errors.lastName = 'Je potřeba zadat přijmení'
		if (!values.message) errors.message = 'Zpráva nemůže být prázdná'
		if (!values.phone) errors.phone = 'Je potřeba zadat telefon'
		if (!values.personalDataAgreement)
			errors.personalDataAgreement = 'Musíte souhlasit se zpracováním osobních údajů.'
		if (!values.checked.length) errors.api = 'Musíte zaškrtnout alespoň jeden předmět.'

		return errors
	}

	const formik = useFormik<ServicesFormValues>({
		initialValues: {
			checked: [],
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			message: '',
			personalDataAgreement: false,
			marketingAgreement:  true
		},
		validate,
		validateOnChange: false,
		onSubmit: async (values, { resetForm, setStatus, setFieldError }) => {
			const res = await axios.post('/api/servicesMessage', { ...values } as ContactFormValues)

			if ( res.data.result ) {
				resetForm()
				setStatus('submitted')
				window.setTimeout(() => {
					setStatus('default')
				}, 5000)
			} else {
				setFieldError('api', 'Odeslání nebylo úspěšné. Prosím, kontaktujte nás na výše uvedeném emailu.')
			}
		}
	})

	return formik
}

export default useServicesForm
