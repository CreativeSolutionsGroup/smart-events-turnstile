import { readOneByProxId, createRegistration } from "@/lib/api/student";
import { NextApiRequest, NextApiResponse } from "next";
import { Registration, Event } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;
  const studentInfo = await readOneByProxId(id as string);
  if (req.method === "GET") {
    res.json(studentInfo);
  } else if (req.method === "POST") {
    // TODO: Pull in the event the student is being registered for
    console.log("in post function")
    let evt: Event | null = null;
    const reggie = await createRegistration(studentInfo !, evt !);
    res.json(reggie);
  }
}