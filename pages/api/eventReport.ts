import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {

    const session = await getServerSession(req, res, authOptions)

    const response = await fetch('https://event-report-generator.creativesolutions.workers.dev/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + session?.id_token
      },
      body: JSON.stringify(req.body),
    })

    const info = await response.json()
    res.json(info)
  }
}