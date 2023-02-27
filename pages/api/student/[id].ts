import { readOneByProxId, addRegistration } from "@/lib/api/student";
import { NextApiRequest, NextApiResponse } from "next";
import { Registeration } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;
  const studentInfo = await readOneByProxId(id as string);
  if (req.method === "GET") {
    res.json(studentInfo);
  } else if (req.method === "PUT") {
    // TODO: Pull in the event the student is being registered for
    let registration: Registeration | null = null;
    await addRegistration(studentInfo !, registration !);
    // TODO: Figure out what makes sense to return here
    res.json("Student successfully registered for event... probably");
  }
}