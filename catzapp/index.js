let catButton = document.getElementById("catButton")
let catInput = document.getElementById("catInput")
let catImage = document.getElementById("image")

catButton.addEventListener("click", async function (e) {
	const baseUrl = "https://cataas.com/cat/says/"
	let text = catInput.value

	catImage.src = baseUrl + text

})