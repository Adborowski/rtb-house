const { MongoClient, ServerApiVersion } = require("mongodb");
// @ts-ignore
import clientPromise from "@/util/mongo";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@rtb-house.sqarbue.mongodb.net/?retryWrites=true&w=majority`;

import type { NextApiRequest, NextApiResponse } from "next";

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
        const body = JSON.parse(req.body);

        console.log(body.userId);

        if (body.userId) {
            const db = client.db("rtb-house");
            let newVisit = await db.collection("visits").insertOne(body);
            res.status(200).json({ name: "OK" });
        }
    } catch (e) {
        res.status(500).json({ name: "Could not connect to DB." });
        return;
    }
}
