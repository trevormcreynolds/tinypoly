/*!
 * Tinypoly v0.0.1
 * 2024 Trevor McReynolds
 * WARNING: This is an alpha version of the library and is not intended for production use.
 */

// console.warn("Warning: This is an experimental version of 'tinypoly.js'. This library is intended for testing purposes only and should not be used in production.");

(function() {
  // Set this to false to disable history and head updates
  var updateHistoryAndHead = true;
  var previousSelectedLink = null;

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[tp-target]').forEach(function(link) {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        handleLinkSelection(link);
        var targetSelector = link.getAttribute('tp-target');
        var url = link.getAttribute('href');
        fetchContent(url, targetSelector, updateHistoryAndHead); // Pass `true` to update history
      });
    });

    if (updateHistoryAndHead) {
      window.addEventListener('popstate', function(event) {
        // Handle browser navigation
        // Load content based on the current state
        // This may require storing additional state information when using pushState
      });
    }
  });

  function fetchContent(url, targetSelector, updateHistory = false) {
    fetch(url)
      .then(response => response.text())
      .then(html => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var content = doc.querySelector(targetSelector);
        document.querySelector(targetSelector).innerHTML = content.innerHTML;
        if (updateHistory) {
          updateHistoryStateAndHead(doc, url);
        }
      })
      .catch(error => console.error('Error fetching content:', error));
  }

  function updateHistoryStateAndHead(doc, url) {
    history.pushState({}, '', url);

    // Update document title
    document.title = doc.title;

    // Update meta tags
    ['description', 'og:image'].forEach(name => {
      let metaTag = doc.head.querySelector(`meta[name="${name}"], meta[prop="${name}"]`);
      if (metaTag) {
        document.head.querySelector(`meta[name="${name}"], meta[prop="${name}"]`).content = metaTag.content;
      }
    });

    // Update canonical link
    let canonicalLink = doc.head.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      let existingCanonical = document.head.querySelector('link[rel="canonical"]');
      if (existingCanonical) {
        existingCanonical.href = canonicalLink.href;
      } else {
        // If no canonical link exists in the current document, create one
        let newCanonical = document.createElement('link');
        newCanonical.rel = 'canonical';
        newCanonical.href = canonicalLink.href;
        document.head.appendChild(newCanonical);
      }
    }
  }

  function handleLinkSelection(link) {
    if (previousSelectedLink) {
      previousSelectedLink.classList.remove('selected');
    }
    link.classList.add('selected');
    previousSelectedLink = link;
  }
})();
