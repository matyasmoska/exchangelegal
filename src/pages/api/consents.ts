import type { NextApiRequest, NextApiResponse } from 'next'
import { isIP } from 'net'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { ip, date: dateString, site, ...consent } = JSON.parse(req.body)
      const ipAddress = isIP(ip) ? ip : await fetch('https://api64.ipify.org').then((res) => res.text())
      const date = dateString ? new Date(dateString) : new Date()
      // one Firestore project serves several sites, so the record has to say which one
      const source = String(site || req.headers.host || 'unknown').replace(/^www\./, '')
      const document = {
        date,
        expires: new Date(date.getFullYear(), date.getMonth() + 6, date.getDate()),
        site: source,
        ...consent,
      }
      // document id is scoped per site so consents from different sites don't overwrite each other
      // imported lazily so a missing Firebase config returns JSON instead of crashing the route
      const db = (await import('../../services/firebase')).default
      await db.collection('consents').doc(`${source}_${ipAddress}`).set(document)
      res.json(document)
    } catch (error) {
      console.error('Consent could not be stored', error)
      res.status(500).json({ error: { code: 'server_error' } })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ error: { message: 'Method not allowed' } })
  }
}

export default handler
