const admin = require("firebase-admin");
const serviceAccount = require("./contactmanager-firebase-adminsdk-xxxx.json"); // Use your actual JSON filename

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-database-name.firebaseio.com", // Replace with your Firebase Database URL
});

const db = admin.firestore(); // Use Firestore as the database
module.exports = db;
