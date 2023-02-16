import { readOneByProxId } from "@/lib/api/student";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === "GET") {
        const id = req.query.id;
        const studentInfo = await readOneByProxId(id as string);
        res.json(studentInfo);
    }
  }