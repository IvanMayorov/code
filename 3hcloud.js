const filtersCollection = document.querySelector('.filters_collection');
const filtersOverlay = document.querySelector('.filters_overlay');
const mobileFilterDrop = document.querySelector('.mobile_filter_drop');
const filtersButton = document.querySelectorAll('.blog_filters_button');
const mobileFilterText = document.querySelector('.mobile_filter_text');
const blogSearchBox = document.querySelector('.blog_search_box');
const blogFiltersSearch = document.querySelector('.blog_filters_search');
const blogFiltersSearchWrap = document.querySelector('.blog_filters_search_wrap');
const blogSearchCancel = document.querySelector('.blog_search_cancel');

const firstButton = document.querySelector('.blog_filters_button');
const radios = firstButton?.querySelectorAll('.blog_filters_radio');
const input = document.querySelector('.blog_filters_search');
const icon = document.querySelector('.blog_filters_search_icon');

input.addEventListener('input', () => {
    icon.style.display = input.value.trim() ? 'block' : 'none';
});
  
function clearSearchAndResetRadio() {
  input.value = "";
  icon.style.display = "none";

  setTimeout(() => {
    if (radios && radios.length >= 2) {
      radios[1].checked = true;
      console.log(radios[1]);
    }
  }, 10);
}

icon.addEventListener("click", clearSearchAndResetRadio);

  

function openFilters() {
  filtersCollection.classList.add('is-opened');
  filtersOverlay.style.display = 'block';
}

function closeFilters() {
  filtersCollection.classList.remove('is-opened');
  filtersOverlay.style.display = 'none';
}

mobileFilterDrop.addEventListener('click', function(e) {
  e.stopPropagation();
  if (filtersCollection.classList.contains('is-opened')) {
    closeFilters();
  } else {
    openFilters();
  }
});

filtersOverlay.addEventListener('click', closeFilters);

filtersButton.forEach(button => {
  button.addEventListener('click', closeFilters);
  button.addEventListener('click', () => {
    const selectedText = button.querySelector('.blog_filters_label').textContent.trim();
    mobileFilterText.textContent = selectedText === 'All' ? 'All Posts' : selectedText;
  });
});


blogFiltersSearchWrap.addEventListener('click', () => {
    blogSearchBox.classList.add('is-opened');
    blogFiltersSearch.classList.add('is-opened');
    blogSearchCancel.style.display = 'block';
});

blogSearchCancel.addEventListener('click', () => {
    blogSearchBox.classList.remove('is-opened');
    blogSearchCancel.style.display = 'none';
    blogFiltersSearch.classList.remove('is-opened');
    mobileFilterText.textContent = 'All Posts';
    clearSearchAndResetRadio();
});




