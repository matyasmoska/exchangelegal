import { useState, Dispatch, SetStateAction } from 'react'

import { fetcher } from '../services/misc'

type LoadingAndError<E> = {
  loading: boolean
  error?: E
  resetError: () => void
}

type LoadingAndErrorActions<E> = {
  setLoading: Dispatch<SetStateAction<boolean>>
  setError: Dispatch<SetStateAction<E | undefined>>
}

type Tuple<T, S> = [T, S]

const useLoadingAndError = <E>(): Tuple<LoadingAndError<E>, LoadingAndErrorActions<E>> => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<E>()
  const resetError = () => setError(undefined)

  return [
    { loading, error, resetError },
    { setLoading, setError },
  ]
}

type FetcherFn<T, E> = (input: RequestInfo, init?: RequestInit) => Promise<{ data?: T; error?: E }>

export const useFetcher = <T = any, E = any>(): Tuple<FetcherFn<T, E>, LoadingAndError<E>> => {
  const [loadingAndError, { setLoading, setError }] = useLoadingAndError<E>()

  const performFetch: FetcherFn<T, E> = (input, init) => {
    loadingAndError.resetError()
    setLoading(true)
    return fetcher(input, init)
      .then((data: T) => {
        setLoading(false)
        return { data }
      })
      .catch((error: E) => {
        setLoading(false)
        setError(error)
        return { error }
      })
  }

  return [performFetch, loadingAndError]
}
