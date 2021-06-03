import { useRouter } from 'next/dist/client/router';
import { FormikErrors, useFormik } from 'formik'

export interface ObligationsFormValues {
	checked: string[]
}

function useObligationsForm() {
	const router = useRouter()

	const validate = ({ checked }: ObligationsFormValues): FormikErrors<ObligationsFormValues> => {
		const errors: FormikErrors<ObligationsFormValues & { api: string }> = {}
		
		// if (!checked.length) errors.api = 'Musíte zaškrtnout alespoň jeden předmět.'

		return errors
	}

	const formik = useFormik<ObligationsFormValues>({
		initialValues: { checked: [] },
		// validate,
		// validateOnChange: false,
		onSubmit: async ({ checked }) => {
			if ( checked.length ) {
				router.push('/potrebuji-aml/success')
			} else {
				router.push('/potrebuji-aml/fail')
			}
		}
	})

	return formik
}

export default useObligationsForm
