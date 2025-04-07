// Get elements
const userInput = document.querySelector('[data-users]');
const placesInput = document.querySelector('[data-places]');
const cpmInput = document.querySelector('[data-cpm]');
const resultElement = document.querySelector('[data-result]');

// Function to calculate and update result
function calculateResult() {
  // Get values from data attributes
  const users = parseFloat(userInput.getAttribute('data-users')) || 0;
  const places = parseFloat(placesInput.getAttribute('data-places')) || 0;
  const cpm = parseFloat(cpmInput.getAttribute('data-cpm')) || 0;

  // Multiply the values
  const result = (users * places * cpm) / 1000;

  // Format the result with two decimal places and a space after every 3 digits
  const roundedResult = result.toFixed(1);
  const formattedResult = roundedResult.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // Write the result to the data-result element
  if (resultElement) {
    resultElement.setAttribute('data-result', roundedResult);
    resultElement.textContent = formattedResult;
  }
}

// Add event listeners to inputs
userInput.addEventListener('input', function() {
  this.setAttribute('data-users', this.value);
  calculateResult();
});

placesInput.addEventListener('input', function() {
  this.setAttribute('data-places', this.value);
  calculateResult();
});

cpmInput.addEventListener('input', function() {
  this.setAttribute('data-cpm', this.value);
  calculateResult();
});

// Initial calculation
calculateResult();