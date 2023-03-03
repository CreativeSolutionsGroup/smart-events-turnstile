import { createRegistration } from "@/lib/api/student";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const evt = req.query.evt as string;
        const student = req.query.id as string;

        await createRegistration(student, evt);
        res.status(200).send("200/OK")
    }
}