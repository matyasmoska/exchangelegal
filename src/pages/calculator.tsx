import DefaultLayout from '../layouts/DefaultLayout';
import Head from 'next/head'

export default function CalculatorPage() {
  return (
    <DefaultLayout>
      <div className="text-center p-36">
        <h1 className="text-5xl font-bold leading-snug">Cenový kalkulátor</h1>
      </div>
    </DefaultLayout>
  )
}
