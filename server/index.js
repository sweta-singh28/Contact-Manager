const express = require("express");
const cors = require("cors");
require("dotenv").config();
const admin = require("firebase-admin");

// Initialize Firebase
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "contact-manager-d4d17.firebasestorage.app",
});

const db = admin.firestore(); // Firestore Database

const app = express();
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Contact Manager API is running");
});

// Fetch All Contacts (GET method)
app.get("/contacts", async (req, res) => {
  const { email } = req.query; // Extract email from the query string (GET request)

  if (!email) {
    return res
      .status(400)
      .json({ error: "Email is required in the query string" });
  }

  try {
    // Query the contacts collection where UserId matches the provided email
    const snapshot = await db
      .collection("Contacts")
      .where("UserId", "==", email) // Filter by UserId (email)
      .get();

    // If no contacts are found
    if (snapshot.empty) {
      return res
        .status(404)
        .json({ message: "No contacts found for this user" });
    }

    const contacts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Send the filtered contacts in the response
    res.status(200).json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// Add a New Contact (POST method)
app.post("/contacts", async (req, res) => {
  const { Email, Gender, Location, Name, Number, UserId } = req.body;

  if (!Email || !Gender || !Location || !Name || !Number || !UserId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const docRef = await db
      .collection("Contacts")
      .add({ Email, Gender, Location, Name, Number, UserId });
    res.status(201).json({
      id: docRef.id,
      Email,
      Gender,
      Location,
      Name,
      Number,
      UserId,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to add contact" });
  }
});


//Fetch a Specific Contact
app.get("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await db.collection("Contacts").doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contact" });
  }
});

//Update a Contact
app.put("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const { Email, Gender, Location, Name, Number, UserId } = req.body;
  try {
    await db
      .collection("Contacts")
      .doc(id)
      .update({ Email, Gender, Location, Name, Number, UserId });
    res.status(200).json({ message: "Contact updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update contact" });
  }
});

// Delete a Contact
app.delete("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection("Contacts").doc(id).delete();
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete contact" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
