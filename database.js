// Import the necessary packages and modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  fileId: {
    type: String,
    default: ''
  },
  favorites: {
    type: Array,
    default: []
  }
});

// Hash the password before saving the user to the database
userSchema.pre('save', async function(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Define the user model
const User = mongoose.model('User', userSchema);

// Export the user model and other necessary functions
module.exports = {
  // Add a new user to the database
  addUser: async function(user) {
    try {
      const newUser = new User(user);
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  },

  // Find a user by email
  findUserByEmail: async function(email) {
    try {
      const user = await User.findOne({ email: email });
      return user;
    } catch (error) {
      throw error;
    }
  },

  // Find a user by id
  findUserById: async function(id) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  },

  // Update a user's favorites
  updateUserFavorites: async function(id, favorites) {
    try {
      const user = await User.findById(id);
      user.favorites = favorites;
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  },

  // Update a user's details and uploaded file
  updateUserDetails: async function(id, userDetails, fileId) {
    try {
      const user = await User.findById(id);
      user.firstName = userDetails.firstName;
      user.lastName = userDetails.lastName;
      user.email = userDetails.email;
      user.address = userDetails.address;
      user.phone = userDetails.phone;
      user.fileId = fileId;
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  },

  // Find all the users in the database
  findAllUsers: async function() {
    try {
      const users = await User.find({});
      return users;
    } catch (error) {
      throw error;
    }
  }
};
