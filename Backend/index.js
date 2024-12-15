const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const complaintRoutes = require("./routes/complainRoute.js");
const userRoute = require("./routes/userRoute.js");
const path = require("path");

dotenv.config();

const app = express();
app.use(cors());

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

app.use("/home", userRoute);
app.use("/complaints", complaintRoutes);

//-----------------------------------DEPLOYMENT------------------------

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "frontend/dist")));
  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is Running Succesfully!");
  });
}

//-----------------------------------DEPLOYMENT------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
