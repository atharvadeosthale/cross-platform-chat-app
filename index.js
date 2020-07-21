const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./connections/db");
const api = require("./routers/api");

require("dotenv").config();

const PORT = process.env.PORT || 80;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", api);

app.get("/", (req, res) => {
  res.json({ message: "server running" });
});

app.listen(PORT, () => {
  console.log("Server running at port " + PORT);
});
