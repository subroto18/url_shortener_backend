const express = require("express");
require("dotenv").config();
const urlRoute = require("./routes/url.route");
const errorMiddleware = require("./middlewares/error.middleware");
const notFoundMiddleware = require("./middlewares/notFound.middleware");
const connectDB = require("./database/db");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/api", urlRoute);

// (Handles undefined routes)
app.use(notFoundMiddleware);

// (Handles errors)
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("You are listening port :", PORT);
});
