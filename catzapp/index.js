let catButton = document.getElementById("catButton")
let catInput = document.getElementById("catInput")
let catImage = document.getElementById("image")
let image1 = document.getElementById("image1")
let image2 = document.getElementById("image2")
let image3 = document.getElementById("image3")
let image4 = document.getElementById("image4")

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

	let functionUrl = baseUrl + '&' + params.toString()

	let response = await fetch(functionUrl, {
		method: 'GET',
	})

	let data = await response.json()
	let baseSrc = "data:image/png; base64,"
	
	image1.src =  baseSrc + data.cat1
	image2.src =  baseSrc + data.cat2
	image3.src =  baseSrc + data.cat3
	image4.src =  baseSrc + data.cat4

})