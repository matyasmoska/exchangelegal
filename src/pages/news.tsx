import DefaultLayout from '../layouts/DefaultLayout';
import Head from 'next/head'

export default function NewsPage() {
  return (
    <DefaultLayout>
      <div className="text-center p-36">
        <h1 className="text-5xl font-bold leading-snug">Aktuality</h1>
      </div>
    </DefaultLayout>
  )
}
