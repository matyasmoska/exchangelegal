import DefaultLayout from '../layouts/DefaultLayout'
import Head from 'next/head'
import Image from 'next/image'
import pageData from '../data/pages/aboutus.json'
import { FC } from 'react'
import { TeamMember } from '../typings'
import React from 'react'
import TeamMemberDetail from '../components/Pages/about/TeamMemberDetail'
import { c } from '../services/misc'

interface Reference {
  photo: string,
  reference: string,
  who: string
}

const ReferenceDetail: FC<{ reference: Reference }> = ({ reference }) => {
  return (
    <div className={c("flex max-w-xl space-x-8 text-left", "md:flex-col md:max-w-none md:space-x-0 md:space-y-12")}>
			<div className="flex-shrink-0">
				<Image layout="responsive" width={177} height={263} src={reference.photo} />
			</div>
			<div className="space-y-4">
				<p className="text-3xl font-bold">{ `“${reference.reference}”` }</p>
        <p className="text-sm"> { reference.who} </p>
			</div>
		</div>
  )
}

export default function AboutPage () {
	return (
		<DefaultLayout>
			<div className="text-center">
				<Image className="md:hidden" width={1920} height={700} layout="responsive" quality={90} priority src={'/images/team.png'} />
				<div className="flex flex-col items-center justify-center text-center my-14">
					<div className={c("flex flex-col max-w-lg space-y-8", "md:px-8 md:text-left")}>
						<h1 className="text-3xl font-bold">Kdo jsme</h1>
						<p>
							Klikněte a můžete začít psát. Sed ut perspiciatis unde omnis iste natus error sit voluptatem
							accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore
							veritatis et quasi architecto beatae vitae dicta sunt explicabo nemo enim ipsam voluptatem
							quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui
							ratione voluptatem sequi nesciunt neque porro quisquam est qui dolorem.
						</p>
					</div>
					<div className={c("flex flex-col items-start w-full my-24 space-y-20 text-left px-1/8 justify-self-start", 'md:px-8')}>
						{pageData.people.map((member: TeamMember) => <TeamMemberDetail member={member} />)}
					</div>
          <div className={c("flex flex-col space-y-20", "md:px-8")}>
						<h1 className="text-3xl font-bold">Řekli o nás</h1>
						{pageData.references.map((reference: Reference) => <ReferenceDetail reference={reference} />)}
					</div>
				</div>
			</div>
		</DefaultLayout>
	)
}
