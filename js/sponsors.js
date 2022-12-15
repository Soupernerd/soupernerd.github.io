function getImageInfo() {
  return fetch("json/sponsors.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var keySponsors = data.keySponsors;
      var entries = Object.entries(keySponsors);

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


// When the page loads, get the image src and hrefs and store them in local storage
window.addEventListener("load", function() {
  localStorage.setItem("sponsors", JSON.stringify(getImageInfo()));
});

// When the page loads, display the images on the page
window.addEventListener("load", displayImages);

// Every two minutes, cycle through the images
setInterval(cycleImages, 2 * 60 * 1000);