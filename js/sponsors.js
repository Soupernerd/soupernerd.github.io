function getImageInfo() {
  // Use the fetch() function to get the JSON data from the href
  return fetch("json/sponsors.json")
    .then(function(response) {
      // The fetch was successful, so we can extract the JSON data from the response
      return response.json();
    })
    .then(function(data) {
      // The JSON data has been extracted, so we can loop through the array of objects
      // and extract the image src and hrefs
      var imageInfo = data.map(function(object) {
        return {
          src: object.src,
          href: object.href
        };
      });

      // Store the image src and hrefs in local storage
      localStorage.setItem("sponsors", JSON.stringify(imageInfo));

      // We can also return the data here, so that it can be used by other parts of the code
      return imageInfo;
    })
    .catch(function(error) {
      // There was an error with the fetch, so we can handle it here
      console.error(error);
    });
}


// Next, we define a function that displays the images on the page
function displayImages() {
  // Get the image src and hrefs from local storage
  var imageInfo = JSON.parse(localStorage.getItem("sponsors"));

  // Make sure we have some images to display
  if (imageInfo && imageInfo.length > 0) {
    // Select the element where the images will be displayed
    var imageElement = document.getElementById("sponsorAboveTwitterWidget");

    // Create an img element for each image
    var images = imageInfo.map(function(info) {
      var img = document.createElement("img");
      img.src = info.src;

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




// Finally, we define a function that cycles through the images
// every two minutes
function cycleImages() {
  // Get the image src and hrefs from local storage
  var imageInfo = JSON.parse(localStorage.getItem("sponsors"));

  // Make sure we have some images to display
  if (imageInfo && imageInfo.length > 0) {
    // Select the element where the images are displayed
	 var imageElement = document.getElementById("sponsorAboveTwitterWidget");


    // Get the index of the currently-displayed image
    var currentIndex = imageInfo.findIndex(function(info) {
      return info.src === imageElement.querySelector("img").src;
    });

    // Calculate the index of the next image to display
    var nextIndex = (currentIndex + 1) % imageInfo.length;

	// Update the src and href attributes of the img and a elements to display the next image
	var imgElement = imageElement.querySelector("img");
	var linkElement = imageElement.querySelector("a");
	imgElement.src = imageInfo[nextIndex].src;
	linkElement.href = imageInfo[nextIndex].href;

  }
}

// When the page loads, get the image src and hrefs and store them in local storage
window.addEventListener("load", function() {
  localStorage.setItem("sponsors", JSON.stringify(getImageInfo()));
});

// When the page loads, display the images on the page
window.addEventListener("load", displayImages);

// Every two minutes, cycle through the images
setInterval(cycleImages, 2 * 60 * 1000);