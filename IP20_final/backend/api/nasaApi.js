const express = require("express");
const router = express.Router();
const { nasaAPIKey } = require("../config/env");
module.exports = router;

router.get("/nasaApi/:search", async (req, res) => {
    const search = req.params.search;

    console.log("Search term:", search);
    console.log("NASA API Key:", nasaAPIKey);
    try {
        const response = await fetch(
          `https://api.nasa.gov/techtransfer/patent/?${search}&api_key=${nasaAPIKey}`
        );
        const data = await response.json();
        res.status(200).send(data);
      } catch (error) {
        console.error("Error fetching patents:", error);
      }
})