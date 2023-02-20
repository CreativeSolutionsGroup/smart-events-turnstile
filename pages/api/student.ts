import { readOneByProxId } from "@/lib/api/student";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === "GET") {
        const id = req.query.id;
        const studentInfo = await readOneByProxId(id as string);
        res.json(studentInfo);
    }

    if  (req.method == "POST"){

        const session = await getServerSession(req, res, authOptions)

        // console.log(session?.id_token)
        // console.log(req.body)

        const response = await fetch('https://event-report-generator.creativesolutions.workers.dev/', {
                              method: 'POST', 
                              headers: {
                                'Authorization': 'Bearer ' + session?.id_token
                              },
                              body: JSON.stringify(req.body),
                          })

        const info = await response.json()
        res.json(info)
    } 
  }