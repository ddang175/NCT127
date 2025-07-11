const express = require("express");
const router = express.Router();
const { connectDB, closeConnection, ObjectId } = require("../config/db");

module.exports = router;

// Get all accounts - used for logging in
router.get("/nctaccount", async (req, res) => {
  let connection;
  try {
    connection = await connectDB();
    const { db } = connection;
    console.log("Connected to MongoDB server GET");
    
    const query = {};
    const results = await db.collection("accounts").find(query).toArray();
    console.log(results);
    res.status(200).send(results);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).send("Internal server error");
  } finally {
    if (connection) await closeConnection();
  }
});

// Get certain account by ID
router.get("/nctaccount/:accountId", async (req, res) => {
  let connection;
  try {
    connection = await connectDB();
    const { db } = connection;
    console.log("Connected to MongoDB server GET by accountId");

    const accountId = req.params.accountId;

    const result = await db
      .collection("accounts")
      .findOne({ _id: new ObjectId(accountId) });

    if (!result) {
      return res.status(404).send("Account not found");
    }

    res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching account:", error);
    res.status(500).send("Internal server error");
  } finally {
    if (connection) await closeConnection();
  }
});

// Login
router.post("/nctaccount/login", async (req, res) => {
  let connection;
  try {
    connection = await connectDB();
    const { db } = connection;
    console.log("OKAY");
    
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    
    const result = await db.collection("accounts").findOne({ email });
    console.log(result);
    
    res.status(201);
    if (!result) return res.send({ message: "Invalid Email" });
    else if (result.password != password)
      return res.send({ message: "Wrong Password" });
    else res.send({ message: "Account found", id: result._id });
  } catch (error) {
    console.error("Error finding account", error);
    res.status(500).send("Internal server error");
  } finally {
    if (connection) await closeConnection();
  }
});

// Creating new account
router.post("/nctaccount", async (req, res) => {
  let connection;
  try {
    connection = await connectDB();
    const { db } = connection;
    const { username, email, password, confirmPassword, patents } = req.body;

    if (password != confirmPassword) {
      return res.send({ message: "Passwords do not match" });
    }
    console.log("Connected to MongoDB server POST");

    const result = await db
      .collection("accounts")
      .insertOne({ username, email, password, confirmPassword, patents });
    
    res.status(201);
    res.send({
      message: "Account created successfully",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).send("Internal server error");
  } finally {
    if (connection) await closeConnection();
  }
});

// Update account info
router.put("/nctaccount/:accountId", async (req, res) => {
  let connection;
  try {
    connection = await connectDB();
    const { db } = connection;
    
    const updateDoc = {
      $set: req.body,
    };
    
    const result = await db
      .collection("accounts")
      .updateOne({ _id: new ObjectId(req.params.accountId) }, updateDoc);
    
    if (result.matchedCount === 0) {
      return res.status(404).send("Account not found");
    }
    
    res.status(200).send({ message: "Account updated successfully" });
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(500).send("Internal server error");
  } finally {
    if (connection) await closeConnection();
  }
});