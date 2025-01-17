import admin from "firebase-admin";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load service account key using `fs` and `import`
const serviceAccountPath = resolve(__dirname, "./serviceAccountKey.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mentorship-851db-default-rtdb.firebaseio.com/",
  });
}

export default admin;
