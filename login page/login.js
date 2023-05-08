// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');

// Set up express app
const app = express();

// Use middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
  // Retrieve email and password from request body
  const { email, password } = req.body;

  // Validate that email and password are present
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  // Authenticate user by checking email and password against database
  const user = getUserByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).send('Invalid email or password');
  }

  // Set session cookie and redirect to dashboard
  req.session.user = user;
  res.redirect('/dashboard');
});

app.get('/dashboard', (req, res) => {
  // Check if user is authenticated
  const user = req.session.user;
  if (!user) {
    return res.redirect('/');
  }

  // Render dashboard page with user details
  res.sendFile(__dirname + '/dashboard.html');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// Example function to retrieve user by email from database
function getUserByEmail(email) {
  // Implement your own database logic here
  const users = [
    { email: 'john@example.com', password: bcrypt.hashSync('password123', 10), name: 'John Doe' },
    { email: 'jane@example.com', password: bcrypt.hashSync('password456', 10), name: 'Jane Smith' }
  ];
  return users.find(user => user.email === email);
}
