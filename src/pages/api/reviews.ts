import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch("https://service-reviews-ultimate.elfsight.com/data/sources?uris%5B%5D=ChIJAWBLx-yVC0cR09MyS9-fBcU")

  res.status(response.status).send(await response.json())
}
