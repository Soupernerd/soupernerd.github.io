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
