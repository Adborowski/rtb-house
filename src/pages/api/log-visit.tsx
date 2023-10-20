// @ts-ignore
import clientPromise from "@/util/mongo";
import type { NextApiRequest, NextApiResponse } from "next";

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

        console.log("Logging visit for", body.userId);

        if (body.userId) {
            const db = client.db("rtb-house");
            await db.collection("visits").insertOne(body);
            res.status(200).json({ message: "Visit logged." });
        } else {
            res.status(404).json({ message: "userId not found." });
        }
    } catch (e) {
        res.status(500).json({ message: "Could not connect to DB." });
        return;
    }
}
