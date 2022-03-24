import type { NextApiRequest, NextApiResponse } from 'next'
import { isIP } from 'net'

import db from '../../services/firebase'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { ip, date: dateString, ...consent } = JSON.parse(req.body)
      const ipAddress = isIP(ip) ? ip : await fetch('https://api64.ipify.org').then((res) => res.text())
      const date = dateString ? new Date(dateString) : new Date()
      const document = { date, expires: new Date(date.getFullYear(), date.getMonth() + 6, date.getDate()), ...consent }
      await db.collection('consents').doc(ipAddress).set(document)
      res.json(document)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ error: { message: 'Method not allowed' } })
  }
}

export default handler
