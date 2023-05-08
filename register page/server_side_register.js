const express = require('express');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// Set up storage engine for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = generateUserId(); // Generate a unique user ID
    const uploadPath = path.join(__dirname, 'uploads', userId); // Create folder for user ID
    fs.mkdirSync(uploadPath); // Create the folder
    cb(null, uploadPath); // Pass the upload path to multer
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep the original file name
  }
});
const upload = multer({ storage: storage });

// Handle form submission
app.post('/register', upload.single('id-proof'), async (req, res) => {
  const { firstName, lastName, email, password, address, phoneNumber } = req.body;
  const idProofFile = req.file;

  // Validate form data
  if (!firstName || !lastName || !email || !password || !idProofFile) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  // Store ID proof document on server
  const idProofPath = idProofFile.path;

  // Generate username and password
  const username = generateUsername();
  const plainPassword = generatePassword();
  const hashedPassword = await hashPassword(plainPassword);

  // Store registration data in database
  const registrationData = {
    firstName,
    lastName,
    email,
    hashedPassword,
    address,
    phoneNumber,
    idProofPath
  };
  await saveRegistrationData(registrationData);

  // Send email to user with username and password
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password'
    }
  });
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your Online Money Transfer Portal Account Information',
    text: `Thank you for registering with the Online Money Transfer Portal!\n\nYour account has been created with the following information:\n\nUsername: ${username}\nPassword: ${plainPassword}\n\nPlease keep this information secure and do not share it with anyone.\n\nBest regards,\nThe Online Money Transfer Portal Team`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while sending the registration email.' });
    } else {
      console.log(`Registration email sent to ${email}: ${info.response}`);
      res.status(200
