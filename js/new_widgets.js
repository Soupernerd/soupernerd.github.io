// Get the container for the ticker widget containers
const container = document.getElementById("container");

// Define priceBoxDiv and assign a value to it
const priceBoxDiv = document.getElementById("priceBox");

// Check if the "tickerWidgets" key is empty in localStorage
const checktickerWidgets = JSON.parse(localStorage.getItem("tickerWidgets"));
if (!Array.isArray(checktickerWidgets) || checktickerWidgets.length === 0 || checktickerWidgets.some((widget) => !widget["coin_id"] || !widget["id"])) {
	// If it is empty, create some default ticker widgets

	// Create an array of default ticker widget data
	const defaultTickerWidgets = [
		{ id: "tickerWidget1", coin_id: "bitcoin" },
		{ id: "tickerWidget2", coin_id: "ethereum" },
		{ id: "tickerWidget3", coin_id: "sideshift-token" },
		{ id: "tickerWidget4", coin_id: "metis-token" },
		{ id: "tickerWidget5", coin_id: "ecash" },
		{ id: "tickerWidget6", coin_id: "optimism" }
	];
	// Save the array of default ticker widget data to the "tickerWidgets" key in localStorage
	localStorage.setItem("tickerWidgets", JSON.stringify(defaultTickerWidgets));
}

const saveTickerWidgets = () => {
	// Use the .querySelectorAll() method to get the list of ticker widget container elements
	const priceBoxDivs = container.querySelectorAll(".priceBox");
	// Use Array.prototype.map() to convert the NodeList of ticker widget container elements
	// to an array of ticker widget container data
	const saveTickerWidget = Array.from(priceBoxDivs).map((priceBoxDiv) => {
		// Use the id and coin-id attributes to include the data for the element
		return {
			id: priceBoxDiv.id,
			coin_id: priceBoxDiv.querySelector("coingecko-coin-ticker-widget").getAttribute("coin-id")
		};
	});
	localStorage.setItem("tickerWidgets", JSON.stringify(saveTickerWidget));
}

function setMarqueeWidget() {
	// Retrieve the tickerWidgets array from localStorage
	const marqueeTickerWidgets = JSON.parse(localStorage.getItem("tickerWidgets"));

	// Extract the coin-ids values from the array
	const marqueeCoinIds = marqueeTickerWidgets.map((widget) => widget["coin_id"]);

	// Join the coin-ids values into a string
	const coinIdsString = marqueeCoinIds.join(",");

	// Retrieve the values for the other attributes from localStorage
	const marqueeCurrency = localStorage.getItem("tw_currency");
	const marqueeLocale = localStorage.getItem("tw_locale");

	// Get the coingecko-coin-price-marquee-widget outer element
	const marqueeContainer = document.getElementById("upperMarquee");

	// Check if the coingecko-coin-price-marquee-widget element exists
	const existingMarquee = marqueeContainer.querySelector("coingecko-coin-price-marquee-widget");

	// Create a new element node for the ticker widget container
	const marqueeDiv = document.createElement("coingecko-coin-price-marquee-widget");
	marqueeDiv.setAttribute("coin-ids", coinIdsString);
	marqueeDiv.setAttribute("currency", marqueeCurrency);
	marqueeDiv.setAttribute("locale", marqueeLocale);
	marqueeDiv.setAttribute("background-color", "#ffffff");

	// If the coingecko-coin-price-marquee-widget element exists, replace it with the new element
	if (existingMarquee) {
		existingMarquee.replaceWith(marqueeDiv);
	} else {
		// Otherwise, append the new element to the container
		marqueeContainer.appendChild(marqueeDiv);
	}
}


function handleDragAndDrop(priceBoxDiv) {
	// Get the coin ID for the ticker widget
	const coin_id = priceBoxDiv.querySelector("coingecko-coin-ticker-widget").getAttribute("coin-id");

	// Handle the dragstart event of the ticker widget container
	priceBoxDiv.addEventListener("dragstart", (event) => {
		// Set the ID of the element being dragged as the data transfer data
		event.dataTransfer.setData("text/plain", priceBoxDiv.id);
	});

	// Handle the dragover event of the ticker widget container
	priceBoxDiv.addEventListener("dragover", (event) => {
		event.preventDefault();
	});

	// Handle the drop event of the ticker widget container
	priceBoxDiv.addEventListener("drop", (event) => {
		event.preventDefault();
		// Get the ID of the element being dragged
		const id = event.dataTransfer.getData("text/plain");
		// Get the element being dragged
		const draggedElement = document.getElementById(id);
		// Insert the dragged element before the dropped element
		container.insertBefore(draggedElement, priceBoxDiv);
	});

	// Handle the dragend event of the ticker widget container
	priceBoxDiv.addEventListener("dragend", () => {
		// Save the current order of the ticker widget containers to the localStorage
		saveTickerWidgets();
	});
}

function createTickerWidgetDiv() {
			tw_currency = localStorage.getItem("tw_currency");
			tw_locale = localStorage.getItem("tw_locale");

			// Create a new element node for the ticker widget container
			const priceBoxDiv = document.createElement("div");
			priceBoxDiv.id = (itemId);
			priceBoxDiv.setAttribute("draggable", "true");
			priceBoxDiv.classList.add("priceBox");
			container.appendChild(priceBoxDiv);

			// Create a new ticker widget inner container
			const pbContentDiv = document.createElement("div");
			pbContentDiv.classList.add("pB_content");
			priceBoxDiv.appendChild(pbContentDiv);

			// Add a coingecko-coin-ticker-widget element to the ticker widget container
			const tickerWidget = document.createElement("coingecko-coin-ticker-widget");
			tickerWidget.setAttribute("coin-id", coinId);
			tickerWidget.setAttribute("currency", tw_currency);
			tickerWidget.setAttribute("locale", tw_locale);
			pbContentDiv.appendChild(tickerWidget);

			// Add a remove button to the ticker widget container
			const removeButton = document.createElement("button");
			removeButton.innerHTML = "Remove";
			// Handle the click event of the remove button
			removeButton.addEventListener("click", () => {
				// Remove the ticker widget container from the container
				container.removeChild(priceBoxDiv);

				// Save the array of ticker widget containers to the localStorage
				saveTickerWidgets(coinId);
				
				// Update the coingecko-coin-price-marquee-widget element
				setMarqueeWidget();
				
			});
			priceBoxDiv.appendChild(removeButton);
			
			handleDragAndDrop(priceBoxDiv);

}

// Get the input form and input field
const inputField = document.getElementById("coin-id-input");

// Listen for the arr[i].id output from new_input.js
document.addEventListener("coinId", (event) => {

// Get the coin ID from the event
const coin_id = event.detail;

// Check if the coin ID is already in the tickerWidgets array
const checkTickerWidgets = JSON.parse(localStorage.getItem("tickerWidgets"));
if (checkTickerWidgets.some((widget) => widget["coin_id"] === coin_id)) {

// If the coin ID is already in the array, display a toast notification
const toast = document.getElementById("toast");
toast.textContent = `The ticker widget for "${coin_id}" already exists.`;
toast.style.display = "block";

// Remove the toast notification after 3 seconds
setTimeout(() => {
  toast.textContent = "";
  toast.style.display = "none";
}, 3000);

} else {

// If the coin ID is not in the array, create a new ticker widget using the coin ID

	itemId = `item${Date.now()}`;
	coinId = (coin_id);
	createTickerWidgetDiv();

	// Save the array of ticker widget containers to the localStorage
	saveTickerWidgets(coin_id);

	// Update the coingecko-coin-price-marquee-widget element
	setMarqueeWidget();

	// Clear the input field
	inputField.value = "";
}
});

// Load the ticker widgets from the localStorage when the page is loaded
function updateTickerWidgets() {
	const pbContentDivs = JSON.parse(localStorage.getItem("tickerWidgets"));
	if (pbContentDivs) {
		pbContentDivs.forEach((notpbContentDiv) => {
		
		itemId = (notpbContentDiv.id);
		coinId = (notpbContentDiv.coin_id);

		createTickerWidgetDiv();

		});
	}
	// Update the coingecko-coin-price-marquee-widget element
	setMarqueeWidget();
}

window.addEventListener("load", () => {
	updateTickerWidgets();
});