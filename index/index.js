// Get the button element
const button = document.querySelector('button');

// Add a click event listener to the button
button.addEventListener('click', () => {
  // Get the input element
  const input = document.querySelector('input');

  // Get the value of the input element
  const inputValue = input.value;

  // Make a POST request to the server to add the input value to the database
  fetch('/addData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data: inputValue })
  })
  .then(response => {
    // Reload the page to show the updated data
    location.reload();
  })
  .catch(error => {
    console.error(error);
  });
});
