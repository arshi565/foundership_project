const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });

// Set up MongoDB client
const client = new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to MongoDB server
client.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("Connected to MongoDB server");
});

// Handle registration form submission
app.post("/register", upload.single("idProof"), (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const idProofFile = req.file;

  // Validate input
  if (!firstName || !lastName || !email || !password || !idProofFile) {
    res.status(400).send("Please fill out all mandatory fields and upload an ID proof document.");
    return;
  }

  // Insert user details into database
  const usersCollection = client.db().collection("users");
  usersCollection.insertOne(
    {
      firstName,
      lastName,
      email,
      password,
      idProofFileName: idProofFile.filename,
    },
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal server error.");
        return;
      }

      // Send email containing username and password
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "youremail@gmail.com",
          pass: "yourpassword",
        },
      });

      const mailOptions = {
        from: "youremail@gmail.com",
        to: email,
        subject: "Your username and password",
        text: `Your username is ${email} and your password is ${password}.`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal server error.");
          return;
        }

        console.log("Email sent: " + info.response);
        res.status(200).send("Registration successful.");
      });
    }
  );
});

// Handle login form submission
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    res.status(400).send("Please enter your email address and password.");
    return;
  }

  // Authenticate user
  const usersCollection = client.db().collection("users");
  usersCollection.findOne({ email, password }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal server error.");
      return;
    }

    if (!user) {
      res.status(401).send("Invalid email address or password.");
      return;
    }

    res.status(200).send("Login successful.");
  });
});

// Handle fetch exchange rates API
app.get("/exchange-rates", (req, res) => {
  // Fetch exchange rates from database
  // Return exchange rates as JSON response
});

// Handle add favorite combination API
app.post("/favorites", (req, res) => {
  const { email, source, destination } = req.body;

  // Insert favorite combination into database
});

app.listen
