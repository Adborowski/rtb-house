// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import clientPromise from "@/util/mongo";

type Data = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let client;

    try {
        client = await clientPromise;
        const body = JSON.parse(req.body);
        console.log("logging avatar scroll for", body.userId);

        if (body.userId) {
            const db = client.db("rtb-house");
            await db.collection("visits").insertOne(body);
            res.status(200).json({ message: "Avatar scroll logged." });
        } else {
            res.status(404).json({ message: "userId not found." });
        }
    } catch (e) {
        res.status(500).json({ message: "Could not connect to DB." });
        return;
    }
}
