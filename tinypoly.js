(function() {
  var config = {
    // Set this to false to disable history and head updates
    updateHistoryAndHead: true, // Default setting
  };

  var previousSelectedLink = null;

  // Initialization function to override default configurations
  function init(customConfig) {
    Object.assign(config, customConfig); // Override default config with custom settings
    setupEventListeners();
  }

  function setupEventListeners() {
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('[tp-target]').forEach(function(link) {
        link.addEventListener('click', function(event) {
          event.preventDefault();
          handleLinkSelection(link);
          var targetSelector = link.getAttribute('tp-target');
          var url = link.getAttribute('href');
          fetchContent(url, targetSelector); // Pass `true` to update history
        });
      });
  
      if (config.updateHistoryAndHead) {
        window.addEventListener('popstate', function(event) {
          // Handle browser navigation
          // Load content based on the current state
          // This may require storing additional state information when using pushState
        });
      }
    });
  }

  function handlePopState(event) {
    // Handle browser navigation based on the current state
  }

  function fetchContent(url, targetSelector) {
    fetch(url)
      .then(response => response.text())
      .then(html => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var content = doc.querySelector(targetSelector);
        document.querySelector(targetSelector).innerHTML = content.innerHTML;
        if (config.updateHistoryAndHead) {
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

  window.tinypoly = {
    init: init
  };
})();
