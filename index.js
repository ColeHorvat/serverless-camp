const bunnForm = document.getElementById("bunnForm");
const imageInput = document.getElementById("image")

bunnForm.addEventListener('submit', function(event) {
	event.preventDefault();
	const username = document.getElementById('username').value
	const image = document.getElementById('image').value
	const output = document.getElementById('output')

	
	if(image == '')
		alert("No image error...")
	else if(username == null || username == '')
		alert("No name error...")
	else
		output.textContent = username + "❤"
})

imageInput.addEventListener('change', function(event) {
	let fileName = imageInput.value.split(/(\\|\/)/g).pop()
	let ext = fileName.split('.')[1]

	if(ext != "jpeg" && ext != "png" && ext != "jpg")
		alert("File type not permitted")
})