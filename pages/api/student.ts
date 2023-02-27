import { readOneByProxId, updateStudentRecord } from "@/lib/api/student";
import { Student } from "@prisma/client";
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

    if  (req.method == "PUT"){

        const student: Student = req.body
        const studentInfo = await updateStudentRecord(student);
        res.json(studentInfo);

    } 
  }