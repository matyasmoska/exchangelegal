import DefaultLayout from '../layouts/DefaultLayout'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Button from '../components/Layout/Button'
import Link from 'next/link'
import { c } from '../services/misc'

export default function CalculatorPage () {
	return (
		<DefaultLayout>
			<div className={c("relative grid items-center grid-cols-2", 'md:flex md:flex-col-reverse')}>
				<div className="relative w-full h-full">
          <Image width={950} height={980} layout="responsive" quality={85} src={'/images/whatisaml.png'} />
        </div>
				<div className={c("px-12 space-y-8", '2xl:py-16', 'md:py-6 md:pb-16')}>
					<h1 className="text-5xl font-bold">Co je to AML?</h1>
					<p>
						AML je zkratka anglického "Anti Money Laundering" a používá se v souvislosti s opatřeními, které
						mají bránit legalizaci výnosů z trestné činnosti (tj. "praní špinavých peněz") a financování
						terorismu (CFT - "Combating the Financing of Terrorism"). Často se v této souvislosti uvádí i
						zkratka KYC ("Know Your Client"), která odkazuje na jednu ze základních AML povinností, tedy
						povinnost identifikovat klienta a získat informace nutné k posouzení, zda nejde o podezřelý
						obchod.
					</p>
					<p>
						Tato opatření musí přijímat fyzické osoby nebo společnosti, které vykonávají určité činnosti
						vyjmenované zákonem (zákon č. 253/2008 Sb.). Kromě bank, spořitelen, pojišťoven, obchodníků s
						cennými papíry a dalších úvěrových a finančních institucí, jsou to také osoby, které poskytují
						služby související s virtuálními aktivy (např. kryptoměnami, tokeny apod.), právnické osoby,
						které spravují majetek investorů, obchodníci s použitým zbožím, zastavárny, obchodníci s
						nemovitostmi a realitní zprostředkovatelé, faktoringové a inkasní společnosti, daňoví poradci a
						auditoři, exekutoři, dražebníci nemovitostí, ale i každý podnikatel, který provede obchod v
						hodnotě 10 000 a více EUR.
					</p>
					<p>
						Plnění AML povinností kontroluje u většiny povinných osob Finanční analytický úřad (na úvěrové a
						finanční instituce dohlíží Česká národní banka) a za porušení povinností hrozí{' '}
						<b>citelné tresty</b>.
					</p>
					<p>
						V některých případech vyžadují i banky nebo obchodníci, kteří sami plní AML povinnosti, důkaz o
						tom, že povinná osoba má řádně zpracovanou vnitřní dokumentaci stanovenou AML zákonem, a že
						postupuje v souladu s ním, jinak{' '}
						<b>odmítají například zřídit či vést bankovní účet, nebo uskutečnit obchod.</b>
					</p>
					<div className="flex">
					  <Link href="/obligations">
  						<Button type="basic" className={c('px-16 py-2', 'md:w-full md:text-center md:py-3.5')}>
  							Více informací
  						</Button>
  					</Link>
					</div>
				</div>
			</div>
		</DefaultLayout>
	)
}
