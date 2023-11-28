const bunnForm = document.getElementById("bunnForm");
const imageInput = document.getElementById("image")
const downloadButton = document.getElementById("button2");
const downloadInput = document.getElementById("downloadusername")

downloadButton.addEventListener("click", async function(event) {
	console.log("Downloading image...")
	let username = downloadInput.value;

	let resource = "https://serverless-camp-2022.azurewebsites.net/api/bunnimage-download?code=CVZtgvbVtumoZKj1aHMc39yYsk3dH3LgnvNItamltG1yAzFujLArug=="
	let options = {
		method: "GET",
		headers: {
			"username": username
		}
	}


	const response = await fetch(resource, options)
	const data = await response.json();
	console.log(data)
	

	window.open(data.downloadUri, "_self")
})

bunnForm.addEventListener('submit', async function(event) {
	event.preventDefault();

	const username = document.getElementById('username').value
	const image = document.getElementById('image').value
	const output = document.getElementById('output')

	const payload = new FormData();
	const file = imageInput.files[0]; // fileInput is the file upload input element
	await payload.append("file", file);
	console.log(file)
	console.log(payload.entries());

	if(image == '')
		alert("No image error...")
	else if(username == null || username == '')
		alert("No name error...")

	let options = {
		method: "POST",
		body: payload,
		headers: {
			'codename': username
		}

	}
	let resource = "https://serverless-camp-2022.azurewebsites.net/api/bunnimage-upload?code=uj5HYqz1r_HZPsOPXVUnU5GAHB08k7gMW01gLPqqcLmvAzFujYIzMA=="
	/* let resource = "http://localhost:7071/api/bunnimage-upload" */
	try {
		const response = await fetch(resource, options)
		const data = await response.text()
		console.log(data)
		output.textContent = "Your image has been stored successfully!"
	} catch (e) {
		console.log(e)
	}
	
})

imageInput.addEventListener('change', function(event) {
	let fileName = imageInput.value.split(/(\\|\/)/g).pop()
	let ext = fileName.split('.')[1]

	if(ext != "jpeg" && ext != "png" && ext != "jpg")
		alert("File type not permitted")
})
