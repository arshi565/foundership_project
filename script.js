// Validate registration form on submit
function validateRegistrationForm() {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const idProof = document.getElementById("idProof").value.trim();

  if (firstName === "" || lastName === "" || email === "" || password === "" || idProof === "") {
    alert("Please fill out all mandatory fields.");
    return false;
  }

  // Validate email format
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  return true;
}

// Validate login form on submit
function validateLoginForm() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === "" || password === "") {
    alert("Please enter your email address and password.");
    return false;
  }

  return true;
}

// Implement search functionality on dashboard
function searchExchangeRates() {
  const source = document.getElementById("source").value.trim();
  const destination = document.getElementById("destination").value.trim();

  // Use AJAX to fetch exchange rates from server
  // Display exchange rates in table
}

// Implement favorite functionality on dashboard
function addFavorite() {
  const source = document.getElementById("source").value.trim();
  const destination = document.getElementById("destination").value.trim();

  // Use AJAX to add favorite combination to database
  // Display favorite combination on dashboard
}
