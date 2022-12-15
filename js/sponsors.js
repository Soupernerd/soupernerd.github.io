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

function displayImages() {
  // Log a message to the JavaScript console
  console.log("Displaying images on the page");

  // Get the image src and hrefs from local storage
  return getImageInfo().then(function(imageInfo) {
    // Select the element where the images will be displayed
    var imageElement = document.getElementById("sponsorAboveTwitterWidget");

    // Remove the existing images from the page
    imageElement.innerHTML = "";

    // Get the first image info object from the array
    var info = imageInfo.shift();

    // Create an img element
    var img = document.createElement("img");

    // Set the src and href attributes of the img element to the src and href properties of the image info object
    img.src = image.src;
    img.href = image.href;

    // Create a link element
    var link = document.createElement("a");
    link.href = image.href;
    link.setAttribute("target", "_blank");

    // Add the img element to the link element
    link.appendChild(img);

    // Add the image to the page
    imageElement.appendChild(link);
  });
}


function cycleImages() {
  var imageInfo = JSON.parse(localStorage.getItem("sponsors"));

  if (imageInfo && imageInfo.length > 0) {
    var imageElement = document.getElementById("sponsorAboveTwitterWidget");

    // Make sure the img element exists and is a child of the imageElement
    var img = imageElement.querySelector("img");
    if (!img || img.parentNode !== imageElement) return;

    var currentIndex = imageInfo.findIndex(function(info) {
      return info.src === img.src;
    });

    var nextIndex = (currentIndex + 1) % imageInfo.length;

    // Set the src and href attributes of the img element
    img.src = imageInfo[nextIndex].src;
    img.parentNode.href = imageInfo[nextIndex].href;
  }
}

// When the page loads, get the image names and URLs and store them in local storage
window.addEventListener("load", function() {
  displayImages()
});

// Every two minutes, cycle through the images
setInterval(cycleImages, 2 * 60 * 1000);
