import { useRouter } from 'next/dist/client/router';
import { FormikErrors, useFormik } from 'formik'

export interface ObligationsFormValues {
	checked: string[],
	noneOfTheAbove: boolean
}

function useObligationsForm() {
	const router = useRouter()

	const validate = ({ checked, noneOfTheAbove }: ObligationsFormValues): FormikErrors<ObligationsFormValues> => {
		const errors: FormikErrors<ObligationsFormValues & { api: string }> = {}
		
		if (!checked.length && !noneOfTheAbove) errors.api = 'Musíte zaškrtnout alespoň jeden předmět.'

		return errors
	}

	const formik = useFormik<ObligationsFormValues>({
		initialValues: { checked: [], noneOfTheAbove: false },
		validate,
		validateOnChange: false,
		onSubmit: async ({ checked, noneOfTheAbove }) => {
			if ( checked.length && !noneOfTheAbove ) {
				router.push('/potrebuji-aml/success')
			} else {
				router.push('/potrebuji-aml/fail')
			}
		}
	})

	return formik
}

export default useObligationsForm
