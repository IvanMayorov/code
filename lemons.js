// Function to get URL parameters
function getUrlParams() {
  const params = {};
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  // Get UTM parameters if they exist
  if (urlParams.has('utm_source')) params.source = urlParams.get('utm_source');
  if (urlParams.has('utm_medium')) params.medium = urlParams.get('utm_medium');
  if (urlParams.has('utm_campaign')) params.campaign = urlParams.get('utm_campaign');
  
  return params;
}

// Function to add hidden fields to the form
function addHiddenFieldsToForm() {
  const form = document.querySelector('.form-popup-cgi');
  if (!form) return;
  
  const params = getUrlParams();
  
  // Create and append hidden fields if parameters exist
  if (params.source) {
    const sourceField = document.createElement('input');
    sourceField.type = 'hidden';
    sourceField.name = 'source';
    sourceField.value = params.source;
    form.appendChild(sourceField);
  }
  
  if (params.medium) {
    const mediumField = document.createElement('input');
    mediumField.type = 'hidden';
    mediumField.name = 'medium';
    mediumField.value = params.medium;
    form.appendChild(mediumField);
  }
  
  if (params.campaign) {
    const campaignField = document.createElement('input');
    campaignField.type = 'hidden';
    campaignField.name = 'campaign';
    campaignField.value = params.campaign;
    form.appendChild(campaignField);
  }
}

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', addHiddenFieldsToForm);
