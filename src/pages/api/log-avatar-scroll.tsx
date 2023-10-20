// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import clientPromise from "@/util/mongo";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let client;

    try {
        client = await clientPromise;
        res.status(200).json({ name: "Connected via ClientPromise" });
    } catch (e) {
        res.status(500).json({ name: "Could not connect to DB." });
        return;
    }
    res.status(200).json({ name: "John Doe" });
}
