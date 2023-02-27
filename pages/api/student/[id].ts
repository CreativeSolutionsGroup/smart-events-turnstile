import { getRegisteredById, readOneByProxId } from "@/lib/api/student";
import { Student } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const id = req.query.id;
    let studentInfo;
    if (req.query.evt !== null) {
      const evt = req.query.evt;
      studentInfo = await getRegisteredById(evt as string, id as string);
    } else {
      studentInfo = await readOneByProxId(id as string);
    }
    res.json(studentInfo);
  }
}