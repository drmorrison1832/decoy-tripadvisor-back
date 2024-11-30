// require("dotenv").config();

const cors = require("cors");

// Middleware
const showReq = require("./middleware/showReq");

// Express
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());

// Email send script
const sendMail = require("./utils/sendMail");

// Create basic routs

app.get("/", showReq, async (req, res) => {
  try {
    res.status(200).json({ message: "All good." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.post("/form", showReq, async (req, res) => {
  try {
    const body = req.body;
    const sendMailResult = sendMail(body);
    console.log(sendMailResult);
    return res.status(200).json(sendMailResult);
    // .json({ message: "Form received by server. Attempting to send..." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.get("*", showReq, (req, res) => {
  try {
    res.status(404).json({ message: "Page not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.warn("🔶 Server «Vinted» started");
});
