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
  return getImageInfo().then(function(imageInfo) {
    // Create a new array with only the first value from the original array
    var firstImage = imageInfo.slice(0, 1);

    // Select the element where the images will be displayed
    var imageElement = document.getElementById("sponsorAboveTwitterWidget");

    // Create an img element for the first image
    var images = firstImage.map(function(info) {
      var img = document.createElement("img");

      // Set the src attribute of the img element to the src property of the image info object
      img.src = info.src;

      // Log the values of the src property and the src attribute
      console.log("Image src property:", info.src);
      console.log("Image src attribute:", img.src);

      // Create a link element for the first image
      var link = document.createElement("a");
      link.href = info.href;
      link.setAttribute("target", "_blank");
      link.appendChild(img);

      return link;
    });

    // Add the first image to the page
    images.forEach(function(link) {
      imageElement.appendChild(link);
    });
  });
}


function cycleImages() {
  var imageInfo = JSON.parse(localStorage.getItem("sponsors"));

  if (imageInfo && imageInfo.length > 0) {
    console.log("Cycling images:", imageInfo);

    var imageElement = document.getElementById("sponsorAboveTwitterWidget");

    var currentIndex = imageInfo.findIndex(function(info) {
      return info.src === imageElement.querySelector("img").src;
    });

    var nextIndex = (currentIndex + 1) % imageInfo.length;

    // Create an img element for the next image
    var img = document.createElement("img");
    img.src = imageInfo[nextIndex].src;

    // Create a link element for the next image
    var link = document.createElement("a");
    link.href = imageInfo[nextIndex].href;
    link.setAttribute("target", "_blank");
    link.appendChild(img);

    // Remove the current image from the page
    var imgElement = imageElement.querySelector("img");
    var linkElement = imageElement.querySelector("a");
    linkElement.removeChild(imgElement);

    // Add the next image to the page
    linkElement.appendChild(img);
  }
}




// When the page loads, get the image names and URLs and store them in local storage
window.addEventListener("load", function() {
  displayImages();
  cycleImages();
  setInterval(cycleImages, 2 * 60 * 1000);
});

