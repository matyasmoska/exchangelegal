import DefaultLayout from '../layouts/DefaultLayout';
import Head from 'next/head'
import { useState } from 'react';

export default function Obligations() {
  const [selectedObligations, setSelectedObligations] = useState<string[]>([])

  return (
    <DefaultLayout>
      <div className="text-center p-36">
        <h1 className="text-6xl font-bold leading-snug">Zjistěte, zda se na Vás vztahují AML povinnosti</h1>
        <div>
          <h3>Provádím jako podnikatel nebo nepodnikající právnická osoba některou z těchto činností?</h3>
        </div>
      </div>
    </DefaultLayout>
  )
}
