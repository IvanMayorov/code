
const message = document.querySelector(".email_message");
const form = document.querySelector("form[name='email-form-3']");
const input = form.querySelector("input[type='email']");

message.style.display = "none";

// List of common non-business email domains
const nonBusinessDomains = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
  'icloud.com', 'mail.com', 'protonmail.com', 'zoho.com', 'yandex.com',
  'gmx.com', 'live.com', 'me.com', 'inbox.com', 'mail.ru'
];

// Function to check if email is a business email
function isBusinessEmail(email) {
  if (!email || !email.includes('@')) return false;
  
  const domain = email.split('@')[1].toLowerCase();
  return !nonBusinessDomains.includes(domain);
}

// Add input validation
input.addEventListener('input', () => {
  const email = input.value.trim();
  
  if (email && !isBusinessEmail(email)) {
    message.style.display = "block";
    input.setCustomValidity('Please use your company email. Thank you.');
  } else {
    message.style.display = "none";
    input.setCustomValidity('');
  }
});



