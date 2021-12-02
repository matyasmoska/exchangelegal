import React, { useEffect } from "react";
import ParagraphOrMultiple from "../components/Layout/ParagraphOrMultiple";
import DefaultLayout from "../layouts/DefaultLayout";
import SEO from "../components/Layout/SEO";
import { c } from "../services/misc";
import Image from 'next/image'
import pageData from '../data/pages/slovnik-aml-cft-pojmu/slovnik-aml-cft-pojmu.json'
import servicesData from '../data/pages/services.json'
import useServicesForm from "../components/Pages/services/hooks/useServicesForm";
import OrderButton from "../components/Pages/services/OrderButton";
import ServicesForm from "../components/Pages/services/ServícesForm";
import { useVisible } from "react-hooks-visible";
// @ts-ignore
import TopPartMdx from "../data/pages/slovnik-aml-cft-pojmu//topPart.mdx"
// @ts-ignore
import BottomPartMdx from "../data/pages/slovnik-aml-cft-pojmu//bottomPart.mdx"

const ObligationsPage = () => {
	const [targetRef, visible] = useVisible()

	const servicesForm = useServicesForm()

	useEffect(() => {
		servicesForm.setFieldValue('checked', servicesData.services.filter(({ id }) => id === 'zapis-do-evidence-skutecnych-majitelu'))
	}, [])

    return (
        <DefaultLayout>
			<SEO
				title="Slovník AML/CFT pojmů | AML solutions"
				description="✅ Jsme předními odborníky v oblasti AML compliance ⭐"
				keywords="AML, AML solutions, AML compliance, AML povinnosti, AML systém vnitřních zásad, AML školení, AML hodnocení rizik, AML dotazník, AML zákon, AML směrnice"
			/>
			<div className={c('relative items-center')}>
				<div className="relative w-full">
					<div className="h-[385px]">
						<Image
							layout="fill"
							objectFit="cover"
							className="absolute"
							priority
							src={'/images/slovnik-aml-cft-pojmu.jpg'}
						/>
						<div
							className={c(
								'absolute top-0 left-0 z-10 w-full h-full from-dark-blue via-[#021C62A6] bg-gradient-to-r to-transparent',
								'md:to-dark-blue md:opacity-80'
							)}
						/>
						<div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center text-white">
							<div className="flex flex-col max-w-2xl space-y-6">
								<h1 className="text-[40px] font-bold">{pageData.header}</h1>
								<p className={c('text-xl font-medium', 'md:text-lg md:px-6')}>{pageData.shortText}</p>
							</div>
						</div>
					</div>
				</div>
				<div
					className={c(
						'flex flex-col items-center text-justify leading-relaxed pb-4',
						'md:py-6 md:pb-0'
					)}
				>

					<section className={c('py-8 pb-12 space-y-4 max-w-[802px] leading-relaxed prose', 'md:px-6 md:py-6')}>
						
						
						<table style="width: 933px;" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="30">
<h1><span style="color: #00ccff;">A</span></h1>
</td>
<td style="text-align: justify;" valign="top" width="37">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="403">
<p><span style="color: #00ccff;"><a name="A"></a>AML</span></p>
<p>Obecně používaná zkratka pro oblast boje proti praní špinavých peněz (Anti-Money-Laundering = proti praní peněz). Někdy se používá ve spojení AML/CFT.</p>
</td>
<td style="text-align: justify;" valign="top" width="38">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="425">
<p><span style="color: #00ccff;">AML povinnosti</span></p>
<p>Soubor povinností stanovených AML zákonem, AML vyhláškou a dalšími platnými předpisy.</p>
</td>
</tr>
<tr>
<td valign="top" width="30">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="37">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="403">
<p><span style="color: #00ccff;">AML standardy</span></p>
<p>Uznávané a osvědčené principy a postupy v oblasti předcházení legalizaci výnosů z trestné činnosti a financování terorismu, které reflektují vývoj v oblasti praní peněz. V ČR jsou stanoveny Úředním sdělením ČNB ze dne 26.5.2009.</p>
</td>
<td style="text-align: justify;" valign="top" width="38">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="425">
<p><span style="color: #00ccff;">AML směrnice</span></p>
<p>Nebo také III. AML směrnice je směrnice Evropského parlamentu a Rady 2005/60/ES ze dne 26. října 2005 o předcházení zneužití finančního systému k praní peněz a financování terorismu.</p>
</td>
</tr>
<tr>
<td valign="top" width="30">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="37">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="403">
<p><span style="color: #00ccff;">AML vyhláška</span></p>
<p>Vyhláška č. 281/2008 Sb. o některých požadavcích na systém vnitřních zásad, postupů a kontrolních opatření proti legalizaci výnosů z trestné činnosti a financování terorismu.</p>
</td>
<td style="text-align: justify;" valign="top" width="38">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="425">
<p><span style="color: #00ccff;">AML zákon</span></p>
<p>Zákon č. 253/2008 Sb. o některých opatřeních proti legalizaci výnosů z trestné činnosti a financování terorismu, nebo také zákon „proti praní špinavých peněz“.</p>
</td>
</tr>
</tbody>
</table>
<hr style="width: 100%;" width="100%" />
<table style="width: 933px;" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="30">
<h1><span style="color: #00ccff;">C</span></h1>
</td>
<td valign="top" width="37">
<p> </p>
</td>
<td valign="top" width="403">
<p><span style="color: #00ccff;">CFT</span></p>
<p style="text-align: justify;">Obecně používaná zkratka pro oblast boje proti financování terorismu (Counter Financing of Terrorism) = proti financování terorismu). Někdy se používá ve spojení AML/CFT.</p>
</td>
<td valign="top" width="38">
<p> </p>
</td>
<td valign="top" width="425">
<p> </p>
</td>
</tr>
</tbody>
</table>
<hr style="width: 100%;" width="100%" />
<table style="width: 933px;" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="30">
<h1><span style="color: #00ccff;">D</span></h1>
</td>
<td valign="top" width="37">
<p> </p>
</td>
<td valign="top" width="403">
<p><span style="color: #00ccff;">Doporučení FATF (40+9)</span></p>
<p style="text-align: justify;">Nebo také 40 Recommendations + 9 Special Recommendations je soubor opatření proti praní špinavých peněz a financování terorismu.</p>
</td>
<td valign="top" width="38">
<p> </p>
</td>
<td valign="top" width="425">
<p><span style="color: #00ccff;">Due Diligence</span></p>
<p style="text-align: justify;">Nebo také Customer Due Diligence (CDD) je anglický výraz pro hloubkovou kontrolu klienta.</p>
</td>
</tr>
</tbody>
</table>
<hr style="width: 100%;" width="100%" />
<table style="width: 933px;" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="30">
<h1><span style="color: #00ccff;">F</span></h1>
</td>
<td valign="top" width="37">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="403">
<p><span style="color: #00ccff;">FATF</span></p>
<p>Fiancial Action Task Force = Finanční akční výbor proti praní peněz je mezivládní organizací, která stanovuje standardy a rozpracovává a propaguje zásady politiky boje proti praní peněz a financování terorismu. FATF má celosvětový vliv při hodnocení zemí a teritorií v oblasti boje proti praní špinavých peněz a financování terorismu.</p>
</td>
<td style="text-align: justify;" valign="top" width="38">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="425">
<p><span style="color: #00ccff;">FAÚ MF</span></p>
<p>Specializovaný útvar MF CŘ, který se primárně zabývá příjmem a šetřením oznámení o podezřelých obchodech podle AML zákona. Dále se zabývá spolupráci ČR s FIU jiných států, prováděním mezinárodních sankcí a kontrolní činností.</p>
</td>
</tr>
<tr>
<td valign="top" width="30">
<p> </p>
</td>
<td valign="top" width="37">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="403">
<p><span style="color: #00ccff;">Financování terorismu</span></p>
<p>Z pohledu AML zákona se tím rozumí shromažďování nebo poskytnutí majetku s vědomím, že bude použit ke spáchání trestného činu teroru, teroristického útoku nebo trestného činu, který má tomuto napomoci. Jedná se také o podporu osoby nebo skupiny osob připravujících se ke spáchání těchto trestných činů nebo jednání vedoucí k poskytnutí odměny nebo odškodnění pachatele těchto činů.</p>
</td>
<td style="text-align: justify;" valign="top" width="38">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="425">
<p><span style="color: #00ccff;">FIU</span></p>
<p>Financial Intelligence Unit = Finanční zpravodajská jednotka pověřená shromažďováním a vyšetřováním podezřelých obchodů; v ČR plní funkci FIU Finanční analytický útvar Ministerstva financí (FAÚ MF).</p>
</td>
</tr>
</tbody>
</table>
<hr style="width: 100%;" width="100%" />
<table style="width: 933px;" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="30">
<h1><span style="color: #00ccff;">H</span></h1>
</td>
<td valign="top" width="37">
<p> </p>
</td>
<td valign="top" width="403">
<p><span style="color: #00ccff;">Hodnotící zpráva</span></p>
<p style="text-align: justify;">Nebo také „zpráva hodnotící činnost v oblasti předcházení legalizaci výnosů z trestné činnosti a financování terorismu“ je dokument, který musí některé typy povinných osob vypracovat podle § 8 AML vyhlášky alespoň jednou ročně.</p>
</td>
<td valign="top" width="38">
<p> </p>
</td>
<td valign="top" width="425">
<p> </p>
</td>
</tr>
</tbody>
</table>
<hr style="width: 100%;" width="100%" />
<table style="width: 933px;" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="30">
<h1><span style="color: #00ccff;">I</span></h1>
</td>
<td valign="top" width="37">
<p> </p>
</td>
<td valign="top" width="403">
<p><span style="color: #00ccff;">Identifikace klienta</span></p>
<p style="text-align: justify;">Jedná se o postup, kterého cílem je jednoznačně určit identitu klienta a získat jeho identifikační údaje na základě důvěryhodného průkazu totožnosti. Správně provádění identifikace je základním pilířem AML povinností.</p>
</td>
<td valign="top" width="38">
<p> </p>
</td>
<td valign="top" width="425">
<p> </p>
</td>
</tr>
</tbody>
</table>
<hr style="width: 100%;" width="100%" />
<table style="width: 933px;" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="30">
<h1><span style="color: #00ccff;">K</span></h1>
</td>
<td valign="top" width="37">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="403">
<p><span style="color: #00ccff;">Kontrola klienta</span></p>
<p>Kontrola klienta je kontinuální proces, který začíná při navazování obchodního vztahu s klientem a pokračuje v jeho průběhu. Cílem Due Dilgence je především vyhodnocovat rizikovost klienta z pohledu AML předpisů. Hodnocení rizikovosti je nezbytnou součástí posuzování podezřelosti obchodů. Provádět kontrolu klienta ukládá § 9 AML zákona.</p>
</td>
<td style="text-align: justify;" valign="top" width="38">
<p> </p>
</td>
<td valign="top" width="425">
<p><span style="color: #00ccff;">Kontaktní osoba</span></p>
<p style="text-align: justify;">Osoba pověřená k plnění oznamovací povinnosti podle AML zákona a k zajišťování průběžného styku s MF ČR. AML zákon stanovuje určitá omezení pro volbu kontaktní osoby v § 22.</p>
</td>
</tr>
</tbody>
</table>
<hr style="width: 100%;" width="100%" />
<table style="width: 933px;" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="30">
<h1><span style="color: #00ccff;">L</span></h1>
</td>
<td valign="top" width="37">
<p> </p>
</td>
<td valign="top" width="403">
<p><span style="color: #00ccff;">Legalizace výnosů z trestné činnosti</span></p>
<p style="text-align: justify;">Z pohledu AML zákona se tím rozumí jednání sledující zakrytí nezákonného původu jakékoliv ekonomické výhody vyplývající z trestné činnosti s cílem vzbudit zdání, že jde o majetkový prospěch nabytý v souladu se zákonem.</p>
</td>
<td valign="top" width="38">
<p> </p>
</td>
<td valign="top" width="425">
<p> </p>
</td>
</tr>
</tbody>
</table>
<hr style="width: 100%;" width="100%" />
<table style="width: 933px;" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="30">
<h1><span style="color: #00ccff;">M</span></h1>
</td>
<td valign="top" width="37">
<p> </p>
</td>
<td valign="top" width="403">
<p><span style="color: #00ccff;">Mezinárodní sankce</span></p>
<p style="text-align: justify;">Podle zákona č. 69/2006 Sb. o provádění mezinárodních sankcí se tím rozumí příkaz, zákaz nebo omezení stanovené za účelem udržení nebo obnovení mezinárodního míru a bezpečnosti, ochrany základních lidských práv a boje proti terorismu. Vztahují-li se na klienta mezinárodní sankce, jedná se nutně o podezřelý obchod.</p>
</td>
<td valign="top" width="38">
<p> </p>
</td>
<td valign="top" width="425">
<p> </p>
</td>
</tr>
</tbody>
</table>
<hr style="width: 100%;" width="100%" />
<table style="width: 933px;" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="30">
<h1><span style="color: #00ccff;">N</span></h1>
</td>
<td valign="top" width="37">
<p> </p>
</td>
<td valign="top" width="403">
<p><span style="color: #00ccff;">Nařízení 1781</span></p>
<p style="text-align: justify;">Nařízení Evropského parlamentu a Rady (ES) č. 1781/2006 ze dne 15. listopadu 2006 o informacích o plátci doprovázejících převody finančních prostředků.</p>
</td>
<td valign="top" width="38">
<p> </p>
</td>
<td valign="top" width="425">
<p><span style="color: #00ccff;">Nařízení 1889</span></p>
<p style="text-align: justify;">Nařízení Evropského parlamentu a Rady (ES) č. 1889/2006 ze dne 26. října 2005 o kontrolách peněžní hotovosti vstupujících do Společenství nebo je opouštějící.</p>
</td>
</tr>
</tbody>
</table>
<hr style="width: 100%;" width="100%" />
<table style="width: 933px;" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="30">
<h1><span style="color: #00ccff;">O</span></h1>
</td>
<td valign="top" width="37">
<p> </p>
</td>
<td valign="top" width="403">
<p><span style="color: #00ccff;">Oznámení podezřelého obchodu</span></p>
<p style="text-align: justify;">Oznámení, které musí podat povinné osoby FAÚ MF ČR v případě, že podezřelý obchod zjistí. Je možno ho učinit několika způsoby, vždy však bez zbytečného odkladu. Přesný postup stanovuje § 18 AML zákona.</p>
</td>
<td valign="top" width="38">
<p> </p>
</td>
<td valign="top" width="425">
<p> </p>
</td>
</tr>
</tbody>
</table>
<hr style="width: 100%;" width="100%" />
<table style="width: 933px;" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="30">
<h1><span style="color: #00ccff;">P</span></h1>
</td>
<td valign="top" width="37">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="403">
<p><span style="color: #00ccff;">Podezřelý obchod</span></p>
<p>Z pohledu AML/CFT se jedná o obchod uskutečněný za okolností vyvolávajících podezření ze snahy o legalizaci výnosů z trestné činnosti nebo podezření, že v obchodu užité prostředky jsou určeny k financování terorismu.</p>
</td>
<td style="text-align: justify;" valign="top" width="38">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="425">
<p> <span style="color: #00ccff;">PEP</span></p>
<p>Zkratka používaná pro Politically Exposed Person = Politicky exponovaná osoba.</p>
</td>
</tr>
<tr>
<td valign="top" width="30"> </td>
<td valign="top" width="37"> </td>
<td style="text-align: justify;" valign="top" width="403">
<p><span style="color: #00ccff;">Politicky exponovaná osoba</span></p>
<p>Nebo také PEP je fyzická osoba, která je ve významné veřejné funkci s celostátní působností, nebo fyzická osoba, která obdobné funkce vykonává v jiných mezinárodních organizacích, a to po dobu výkonu této funkce a dále po dobu jednoho roku po ukončení výkonu této funkce, a která má bydliště mimo Českou republiku, nebo takovou významnou veřejnou funkci vykonává mimo Českou republiku. PEP je definovaná v § 4 AML zákona.</p>
</td>
<td style="text-align: justify;" valign="top" width="38">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="425">
<p><span style="color: #00ccff;">Poznej svého klienta</span></p>
<p>Nebo také Know Your Customer (KYC) je součásti kontroly klienta podle § 9 AML zákona. Jedná se o princip, na základě kterého společnost nebo podnikatel shromažďuje relevantní informace o klientech. Z pohledu AML se jedná o sestavování a aktualizaci profilu klienta, který, mimo jiné, pomáhá rozhodovat o tom, zda uskutečněné obchody odpovídají povaze nebo rozsahu jeho podnikatelské činnosti nebo jeho majetkovým poměrům.</p>
</td>
</tr>
<tr>
<td valign="top" width="30">
<p> </p>
</td>
<td valign="top" width="37">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="403">
<p><span style="color: #00ccff;">Povinná osoba</span></p>
<p>Je subjekt (fyzická nebo právnická osoba, podnikající nebo nepodnikající), který je definován v § 2 AML zákona. Na tyto subjekty se pak vztahují AML povinnosti.</p>
</td>
<td style="text-align: justify;" valign="top" width="38">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="425">
<p><span style="color: #00ccff;">Praní špinavých peněz</span></p>
<p>Laický výraz používaný pro legalizaci výnosů z trestné činnosti.</p>
</td>
</tr>
<tr>
<td valign="top" width="30">
<p> </p>
</td>
<td valign="top" width="37">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="403">
<p><span style="color: #00ccff;">Prováděcí směrnice</span></p>
<p>Směrnice Komise 2006/70/ES ze dne 1. srpna 2006, kterou jsou stanoveny prováděcí opatření k AML směrnici.</p>
</td>
<td style="text-align: justify;" valign="top" width="38">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="425">
<p> </p>
</td>
</tr>
</tbody>
</table>
<hr style="width: 100%;" width="100%" />
<table style="width: 933px;" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="30">
<h1><span style="color: #00ccff;">R</span></h1>
</td>
<td valign="top" width="37">
<p> </p>
</td>
<td valign="top" width="403">
<p><span style="color: #00ccff;">Rizikové země</span></p>
<p style="text-align: justify;">Jedná se o země nebo teritoria, které nedostatečně uplatňují opatření proti praní peněz, nebo je neuplatňují vůbec. Seznam těchto zemí vydává a několikrát do roka aktualizuje FATF.</p>
</td>
<td valign="top" width="38">
<p> </p>
</td>
<td valign="top" width="425">
<p> </p>
</td>
</tr>
</tbody>
</table>
<hr style="width: 100%;" width="100%" />
<table style="width: 933px;" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="30">
<h1><span style="color: #00ccff;">S</span></h1>
</td>
<td valign="top" width="37">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="403">
<p><span style="color: #00ccff;">Sankční seznamy</span></p>
<p>Seznamy osob a organizovaných skupin (právnických osoby), na které se vztahují mezinárodní sankce. Pro ČR mají význam zejména dva sankční seznamy – sankční seznam EU a Nařízení vlády č. 210/2008 Sb. k provedení zvláštních opatření k boji proti terorismu.</p>
</td>
<td style="text-align: justify;" valign="top" width="38">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="425">
<p><span style="color: #00ccff;">Skutečný majitel</span></p>
<p>Skutečným majitelem se rozumí fyzická osoba, která fakticky nebo právně vykonává přímo nebo nepřímo rozhodující vliv na řízení nebo provozování; nepřímým vlivem se rozumí vliv vykonávaný prostřednictvím jiné osoby nebo jiných osob. Skutečný majitel je definován v § 4 AML zákona.</p>
</td>
</tr>
<tr>
<td valign="top" width="30">
<p> </p>
</td>
<td valign="top" width="37">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="403">
<p><span style="color: #00ccff;">Strukturování obchodů</span></p>
<p>Činnost, při které dochází k rozdělování vyšších částek na nižší částky pod hranicí povinnosti identifikace nebo kontroly (1 000 EUR nebo 15 000 EUR) za účelem vyhnout se provedení identifikace nebo kontroly u povinné osoby. Takovéto chování klienta je znakem podezřelého obchodu.</p>
</td>
<td style="text-align: justify;" valign="top" width="38">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="425">
<p><span style="color: #00ccff;">Systém vnitřních zásad, postupů a kontrolních opatření</span></p>
<p>Nebo také SVZ je rozsáhlý soubor interních směrnic a návodů, které jednoznačně stanovují přesné postupy pro zaměstnance povinné osoby. Cílem těchto směrnic je zabezpečit, aby bylo podnikání plně v souladu s AML zákonem a souvisejícími předpisy a aby tím byly všechny AML povinnosti řádně plněny.  obsahuje § 21 AML zákona.</p>
</td>
</tr>
<tr>
<td valign="top" width="30">
<p> </p>
</td>
<td valign="top" width="37">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="403">
<p><span style="color: #00ccff;">Štrasburská úmluva</span></p>
<p>Úmluva o praní, vyhledávaní, zadržování a konfiskaci výnosů ze zločinů, která byla přijata v r. 1990, pro ČR vstoupila v platnost 1.3.1997.</p>
</td>
<td style="text-align: justify;" valign="top" width="38">
<p> </p>
</td>
<td style="text-align: justify;" valign="top" width="425">
<p> </p>
</td>
</tr>
</tbody>
</table>
<hr style="width: 100%;" width="100%" />
<table style="width: 933px;" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="30">
<h1><span style="color: #00ccff;">V</span></h1>
</td>
<td valign="top" width="37">
<p> </p>
</td>
<td valign="top" width="403">
<p><span style="color: #00ccff;">Výjimka z AML zákona</span></p>
<p style="text-align: justify;">Je institut, který umožňuje, aby na některé typy subjektů (kterým výjimka byla udělena) nebylo pohlížet jako na povinné osoby podle AML zákona a tudíž se na ně valná většina AML povinností nevztahuje. O výjimku je nutno požádat a splnil podmínky stanovené v § 34 AML zákona.</p>
</td>
<td valign="top" width="38">
<p> </p>
</td>
<td valign="top" width="425">
<p> </p>
</td>
</tr>
</tbody>
</table>
<hr style="width: 100%;" width="100%" />
<table style="width: 933px;" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="30">
<h1><span style="color: #00ccff;">Z</span></h1>
</td>
<td valign="top" width="37">
<p> </p>
</td>
<td valign="top" width="403">
<p><span style="color: #00ccff;">Znaky podezřelého obchodu</span></p>
<p style="text-align: justify;">Znaky a okolnosti, které by mohly nasvědčovat tomu, že se jedná o podezřelý obchod. Jedná se typické znaky chování klienta a o typické znaky a okolnosti obchodu. Tyto znaky a okolnosti jsou pro každý obor a typ obchodu specifické a k jejich určování je nutno mít znalosti z bezpečností oblasti.</p>
</td>
<td valign="top" width="38">
<p> </p>
</td>
<td valign="top" width="425">
<p> </p>
</td>
</tr>
</tbody>
</table>
						
						<BottomPartMdx />
					</section>
				</div>
				
			</div>
			
		</DefaultLayout>
    );
}

export default ObligationsPage;
