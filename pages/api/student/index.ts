import { readFuzzyByName, readOneByProxId } from "@/lib/api/student";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const name = req.query.name;

    if (name) {
      const students = await readFuzzyByName(name as string);
      return res.json(students);
    }

    res.json(null);
  }
}