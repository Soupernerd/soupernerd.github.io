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
  var imageInfo = JSON.parse(localStorage.getItem("sponsors"));

    // If there are no images, fetch the image information and store it in local storage
    return getImageInfo().then(function() {
      // Once the image information has been stored in local storage, get it again
      // and display the images on the page
      imageInfo = JSON.parse(localStorage.getItem("sponsors"));

      // Select the element where the images will be displayed
      var imageElement = document.getElementById("sponsorAboveTwitterWidget");

      // Remove the existing images from the page
      imageElement.innerHTML = "";

      // Get the first image info object from the array
      var info = imageInfo.shift();

      // Create an img element
      var img = document.createElement("img");

      // Set the src and href attributes of the img element to the corresponding values from the image info object
      img.setAttribute("src", info.src);
      img.setAttribute("href", info.href);

      // Create a link element
      var link = document.createElement("a");
      link.setAttribute("target", "_blank");
      link.appendChild(img);

      // Add the image to the page
      imageElement.appendChild(link);
    });
}


function cycleImages() {
  var imageInfo = JSON.parse(localStorage.getItem("sponsors"));

  if (imageInfo && imageInfo.length > 0) {
	 var imageElement = document.getElementById("sponsorAboveTwitterWidget");

    var currentIndex = imageInfo.findIndex(function(info) {
      return info.src === imageElement.querySelector("img").src;
    });

    var nextIndex = (currentIndex + 1) % imageInfo.length;

	var imgElement = imageElement.querySelector("img");
	var linkElement = imageElement.querySelector("a");
	imgElement.src = imageInfo[nextIndex].src;
	linkElement.href = imageInfo[nextIndex].href;
  }
}


// When the page loads, get the image names and URLs and store them in local storage
window.addEventListener("load", function() {
  displayImages()
});

// Every two minutes, cycle through the images
setInterval(cycleImages, 2 * 60 * 1000);
