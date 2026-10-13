import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const connectionString = process.env.MONGODB_URL || "mongodb://localhost:27017/placeholder";

const client = new MongoClient(connectionString as string);
const db = client.db("web1-bazar-dor-auth");

export const auth = betterAuth({
    emailAndPassword: {    
        enabled: true,
    },
    database: mongodbAdapter(db, {
        client,
    }),
});