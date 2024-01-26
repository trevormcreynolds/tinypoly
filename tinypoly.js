(function() {
  var previousSelectedLink = null;

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-target]').forEach(function(link) {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        handleLinkSelection(link);
        var targetSelector = link.getAttribute('data-target');
        var url = link.getAttribute('href');
        fetchContent(url, targetSelector);
      });
    });
  });

  function fetchContent(url, targetSelector) {
    fetch(url)
      .then(response => response.text())
      .then(html => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var content = doc.querySelector(targetSelector);
        document.querySelector(targetSelector).innerHTML = content.innerHTML;
      })
      .catch(error => console.error('Error fetching content:', error));
  }

  function handleLinkSelection(link) {
    if (previousSelectedLink) {
      previousSelectedLink.classList.remove('selected');
    }
    link.classList.add('selected');
    previousSelectedLink = link;
  }
})();