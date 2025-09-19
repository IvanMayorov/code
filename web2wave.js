(function() {
  function initNavbarBlur() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const blurBlock = navbar.querySelector('.navbar_blur');
    if (!blurBlock) return;

    function updateNavbarBlur() {
      if (window.scrollY === 0) {
        blurBlock.classList.remove('is-visible');
        navbar.classList.remove('is-blurred');
      } else {
        blurBlock.classList.add('is-visible');
        navbar.classList.add('is-blurred');
      }
    }
 
    // Initial check
    updateNavbarBlur();

    window.addEventListener('scroll', updateNavbarBlur, { passive: true });
  }

  if (window.Webflow) {
    window.Webflow.push(initNavbarBlur);
  } else {
    window.addEventListener('DOMContentLoaded', initNavbarBlur);
  }
})();



  const article = document.getElementById("single-article");
  const tocContainer = document.getElementById("toc");

  // Create the TOC
  const createTOC = () => {
    const headings = article.querySelectorAll("h2, h3, h4");
    const tocFragment = document.createDocumentFragment();

    headings.forEach((heading) => {
      const title = heading.textContent.trim();
      const anchorId = `toc-${title.toLowerCase().replace(/\s+/g, '-')}`;

      heading.id = anchorId;

      const li = document.createElement("li");
      const anchor = document.createElement("a");
      anchor.textContent = title;
      anchor.href = `#${anchorId}`;
      li.appendChild(anchor);
      tocFragment.appendChild(li);
    });

    const ul = document.createElement("ul");
    ul.appendChild(tocFragment);
    tocContainer.appendChild(ul);
  };

  // Check if the TOC container exists and the article has headings
  if (tocContainer && article) {
    createTOC();
  }

  var tocItems = document.querySelectorAll('#toc a');
  var titleElements = document.querySelectorAll('.content [id]');

  function setActiveItem(targetId) {
    tocItems.forEach(function(item) {
      if (item.getAttribute('href') === '#' + targetId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  tocItems.forEach(function(item) {
    item.addEventListener('click', function(event) {
      event.preventDefault();
      var targetId = this.getAttribute('href').substring(1);
      setActiveItem(targetId);
      document.getElementById(targetId).scrollIntoView();
    });
  });

  titleElements.forEach(function(title) {
    title.addEventListener('click', function() {
      var targetId = this.getAttribute('id');
      setActiveItem(targetId);
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute("id");
      if (entry.isIntersecting) {
        document.querySelectorAll(".active").forEach((z) => {
          z.classList.remove("active");
        });
        document.querySelector(`a[href="#${id}"]`).classList.add("active");
      }
    });
  }, { rootMargin: '0px 0px -50% 0px' });

  if ("h2,h3,h4" !== "") {
    document.getElementById("single-article").querySelectorAll("h2, h3, h4").forEach(function(heading) {
      observer.observe(heading);
    });
  }

  // handle anchor position
function offsetAnchor() {
  if (location.hash.length !== 0) {
    const targetId = location.hash.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offset = targetElement.getBoundingClientRect().top;
      window.scrollTo(window.scrollX, window.scrollY + offset);
    }
  }
}

window.addEventListener("hashchange", offsetAnchor);
window.setTimeout(offsetAnchor, 1);

