const searchForm = document.querySelector('form');
const searchResults = document.querySelector('#search-results');
const favorites = document.querySelector('#favorites');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const source = document.querySelector('#source').value;
  const destination = document.querySelector('#destination').value;
  fetch(`/search?source=${source}&destination=${destination}`)
    .then(response => response.json())
    .then(data => {
      let html = '<table>';
      html += '<tr><th>Source</th><th>Destination</th><th>Rate</th></tr>';
      data.forEach(result => {
        html += `<tr><td>${result.source}</td><td>${result.destination}</td><td>${result.rate}</td></tr>`;
      });
      html += '</table>';
      searchResults.innerHTML = html;
    })
    .catch(error => {
      console.error(error);
      searchResults.innerHTML = '<p>Error retrieving search results.</p>';
    });
});

favorites.addEventListener('change', event => {
  const checkboxes = favorites.querySelectorAll('input[type="checkbox"]');
  const checkedBoxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);
  if (checkedBoxes.length > 5) {
    event.target.checked = false;
    alert('You can only favorite up to 5 combinations.');
  }
});
