// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import clientPromise from "@/util/mongo";

type Data = {
    message: string;
    visits?: any;
    avatarScrolls?: any;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let client;

    try {
        client = await clientPromise;
        console.log("Getting visits...");
        const db = client.db("rtb-house");
        const visitsData = await db.collection("visits").find({}).toArray();
        const avatarScrollsData = await db
            .collection("avatar-scrolls")
            .find({})
            .toArray();
        res.status(200).json({
            message: "Visits received.",
            visits: visitsData,
            avatarScrolls: avatarScrollsData,
        });
    } catch (e) {
        res.status(500).json({ message: "Could not connect to DB." });
        return;
    }
}
