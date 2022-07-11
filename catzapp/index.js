let catButton = document.getElementById("catButton")
let catInput = document.getElementById("catInput")
let catImage = document.getElementById("image")

catButton.addEventListener("click", async function (e) {
	const name1 = document.getElementById("name1").value
	const name2 = document.getElementById("name2").value
	const name3 = document.getElementById("name3").value
	const name4 = document.getElementById("name4").value
	const baseUrl = "https://serverless-camp-2022.azurewebsites.net/api/twocatz?code=I0K-pA5q6IWoEqgo3RiB9i2kW9Iv_fU62SM8TH7_xevyAzFuypJ53w=="

	let params = new URLSearchParams({
        'name1': name1,
        'name2': name2,
		'name3': name3,
		'name4': name4,

    })


	catImage.src = baseUrl + text

})