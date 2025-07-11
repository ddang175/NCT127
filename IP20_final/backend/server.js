const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { port, host } = require("./config/env");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const nctAccountRoute = require("./api/nctAccount");
const handlePatentsRoute = require("./api/handlePatents");
const nasaApiRoute = require("./api/nasaApi");
app.use("/api", nctAccountRoute);
app.use("/api", handlePatentsRoute);
app.use("/api", nasaApiRoute);

app.listen(port, () => {
  console.log(`App listening at http://${host}:${port}`);
});