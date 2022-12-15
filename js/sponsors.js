function getImageInfo() {
  return fetch("json/sponsors.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Instead of accessing the nonexistent "keySponsors" property,
      // access the array of objects directly
      var entries = Object.entries(data);

      var imageInfo = entries.map(function(entry) {
        var key = entry[0];
        var object = entry[1];

        return {
          src: object.src,
          href: object.href
        };
      });

      localStorage.setItem("sponsors", JSON.stringify(imageInfo));
      return imageInfo;
    })
    .catch(function(error) {
      console.error(error);
    });
}

// Next, we define a function that displays the images on the page
function displayImages() {
  // Log a message to the JavaScript console
  console.log("Displaying images on the page");

  // Get the image src and hrefs from local storage
  var imageInfo = JSON.parse(localStorage.getItem("sponsors"));

  // Log the value of imageInfo
  console.log("Image info:", imageInfo);

  // Make sure we have some images to display
  if (imageInfo && imageInfo.length > 0) {
    // Select the element where the images will be displayed
    var imageElement = document.getElementById("sponsorAboveTwitterWidget");

    // Create an img element for each image
    var images = imageInfo.map(function(info) {
      var img = document.createElement("img");

      // Set the src and href attributes of the img element to the src and href properties of the image info object
      img.src = info.src;
      img.href = info.href;

      // Create a link element for each image
      var link = document.createElement("a");
      link.href = info.href;
      link.setAttribute("target", "_blank");
      link.appendChild(img);

      return link;
    });

    // Add the images to the page
    images.forEach(function(link) {
      imageElement.appendChild(link);
    });
  }
}

function cycleImages() {
  // Log a message to the JavaScript console
  console.log("Cycling through images");

  // Get the image src and hrefs from local storage
  var imageInfo = JSON.parse(localStorage.getItem("sponsors"));

  // Make sure we have some images to display
  if (imageInfo && imageInfo.length > 0) {
    // Select the element where the images are displayed
    var imageElement = document.getElementById("sponsorAboveTwitterWidget");

    // Get the current src and href values of the img and a elements
    var img = imageElement.querySelector("img");
    var a = imageElement.querySelector("a");
    var currentSrc = img.src;
    var currentHref = a.href;

    // Find the index of the current image in the image info array
    var currentIndex = imageInfo.findIndex(function(info) {
      return info.src === currentSrc && info.href === currentHref;
    });

    // Calculate the index of the next image in the image info array
    var nextIndex = (currentIndex + 1) % imageInfo.length;

    // Get the src and href values of the next image
    var nextSrc = imageInfo[nextIndex].src;
    var nextHref = imageInfo[nextIndex].href;

    // Set the src and href attributes of the img and a elements to the corresponding values of the next image
    img.setAttribute("src", nextSrc);
    img.setAttribute("href", nextHref);
    a.setAttribute("href", nextHref);
  }
}

// When the page loads, get the image src and hrefs and store them in local storage
window.addEventListener("load", function() {
  // Call the getImageInfo function here, and store the returned value in local storage
  localStorage.setItem("sponsors", JSON.stringify(getImageInfo()));

  // Call the displayImages function here, to make sure it is not called until getImageInfo is finished
  displayImages();
});

// Every two minutes, cycle through the images
setInterval(cycleImages, 2 * 60 * 1000);
