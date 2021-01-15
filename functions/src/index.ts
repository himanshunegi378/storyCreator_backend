import * as functions from "firebase-functions";
import app from "./app";
import { config } from "dotenv";
import { Database } from "./database";
import { FirestoreDatabase } from "./database/fireStore";
config({ path: "./.env" });
Database.init(FirestoreDatabase);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.app = functions.https.onRequest(app);
