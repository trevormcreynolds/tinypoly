# tinypoly (Experimental)

A lightweight alternative to Unpoly with zero dependencies and an identical API surface.

This library allows for fetching and displaying content from server responses without full page reloads, enhancing the user experience by giving your site an SPA-like feel. Please see the Unpoly project for 

> **⚠️ Warning:** This library is currently in an experimental state. It is untested and not suitable for use in production. Please use at your own risk.

## Usage

### Link Setup: Add `data-target` attribute to your links to specify the target container for the content.

```html
<nav>
  <a href="page_a" class="selected" data-target="#content">Page A</a>
  <a href="page_b" class="" data-target="#content">Page B</a>
  <a href="page_c" class="" data-target="#content">Page C</a>
</nav>
```

### Target Container: Define a container where the content will be loaded

```html
<div id="content"></div>
```

### Initialization: The library initializes automatically on DOMContentLoaded.

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->


<!-- CONTACT -->
## Contact

<!-- Trevor McReynolds - [@your_twitter](https://twitter.com/your_username) - email@example.com -->
Project Link: [https://github.com/zero-sigma/tinypoly](https://github.com/zero-sigma/tinypoly)
<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

This project would not exist if not for [Unpoly](https://choosealicense.com). I truly admire the maintainers of that project.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
