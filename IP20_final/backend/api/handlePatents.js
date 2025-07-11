const express = require("express");
const router = express.Router();
const { connectDB, closeConnection, ObjectId } = require("../config/db");

module.exports = router;

//et all the patents for certain account
router.get("/handlePatents/:accountId", async (req, res) => {
  let connection;
  try {
    connection = await connectDB();
    const { db } = connection;
    const { accountId } = req.params;
    console.log("ACCOUNT ID:", accountId);
    const result = await db.collection("accounts").findOne({ _id: new ObjectId(accountId) });

    if (!result) {
      return res.status(404).send({ error: "Account not found" });
    }

    res.status(200).send(result.patents || []);
  } catch (error) {
    console.error("Error fetching patents:", error);
    res.status(500).send({ error: "Internal server error" });
  } finally {
    if (connection) await closeConnection();
  }
});

//new patents
router.post("/handlePatents/:accountId", async (req, res) => {
  let connection;
  try {
    connection = await connectDB();
    const { db } = connection;
    const { accountId } = req.params;
    const newPatent = req.body.patent;

    if (!newPatent || !Array.isArray(newPatent)) {
      return res.status(400).send({ error: "Invalid patent format" });
    }

    const dbCollection = db.collection("accounts");

    const user = await dbCollection.findOne({ _id: new ObjectId(accountId) });
    if (!user) {
      return res.status(404).send({ error: "Account not found" });
    }

    const existingPatents = user.patents || [];

    const newPatentId = newPatent[0]; //id
    const alreadyExists = existingPatents.some(
      (patent) => patent.id === newPatentId
    );

    if (alreadyExists) {
      return res.status(409).send({ message: "Patent already in stash" });
    }

    const wrappedPatent = {
      id: newPatentId,
      data: newPatent,
      notes: "",
      tags: [],
      urls: [],
    };

    const updateResult = await dbCollection.updateOne(
      { _id: new ObjectId(accountId) },
      { $push: { patents: wrappedPatent } }
    );

    res.status(200).send({ message: "Patent added successfully", updateResult });
  } catch (error) {
    console.error("Error adding patent:", error);
    res.status(500).send({ error: "Internal server error" });
  } finally {
    if (connection) await closeConnection();
  }
});


//gets certain patent by id
router.get("/handlePatents/:accountId/:patentId", async (req, res) => {
  let connection;
  try {
    connection = await connectDB();
    const { db } = connection;
    const { accountId, patentId } = req.params;

    const dbCollection = db.collection("accounts");

    const user = await dbCollection.findOne({ _id: new ObjectId(accountId) });
    if (!user) {
      return res.status(404).send({ error: "Account not found" });
    }

    const patent = (user.patents || []).find((p) => p.id === patentId);

    if (!patent) {
      return res.status(404).send({ error: "Patent not found" });
    }

    res.status(200).send(patent);
  } catch (error) {
    console.error("Error retrieving patent:", error);
    res.status(500).send({ error: "Internal server error" });
  } finally {
    if (connection) await closeConnection();
  }
});

//update patents
router.put("/handlePatents/:accountId/:patentId", async (req, res) => {
  let connection;
  try {
    connection = await connectDB();
    const { db } = connection;
    const { accountId, patentId } = req.params;
    const { notes, urls, tags } = req.body; 

    const dbCollection = db.collection("accounts");

    const user = await dbCollection.findOne({ _id: new ObjectId(accountId) });
    if (!user) {
      return res.status(404).send({ error: "Account not found" });
    }

    const index = (user.patents || []).findIndex(p => p.data[0] === patentId);
    if (index === -1) {
      return res.status(404).send({ error: "Patent not found" });
    }

    user.patents[index].notes = notes;
    user.patents[index].urls = urls;
    user.patents[index].tags = tags;

    await dbCollection.updateOne(
      { _id: new ObjectId(accountId) },
      { $set: { patents: user.patents } }
    );

    res.status(200).send({ message: "Patent notes updated successfully" });
  } catch (error) {
    console.error("Error updating patent notes:", error);
    res.status(500).send({ error: "Internal server error" });
  } finally {
    if (connection) await closeConnection();
  }
});

//delete a patent by accountId and patentId
router.delete("/handlePatents/:accountId/:patentId", async (req, res) => {
  let connection;
  try {
    connection = await connectDB();
    const { db } = connection;
    const { accountId, patentId } = req.params;

    const dbCollection = db.collection("accounts");

    const user = await dbCollection.findOne({ _id: new ObjectId(accountId) });
    if (!user) {
      return res.status(404).send({ error: "Account not found" });
    }

    const initialPatents = user.patents || [];
    const updatedPatents = initialPatents.filter(p => p.data[0] !== patentId);

    if (initialPatents.length === updatedPatents.length) {
      return res.status(404).send({ error: "Patent not found" });
    }

    await dbCollection.updateOne(
      { _id: new ObjectId(accountId) },
      { $set: { patents: updatedPatents } }
    );

    res.status(200).send({ message: "Patent deleted successfully" });
  } catch (error) {
    console.error("Error deleting patent:", error);
    res.status(500).send({ error: "Internal server error" });
  } finally {
    if (connection) await closeConnection();
  }
});
