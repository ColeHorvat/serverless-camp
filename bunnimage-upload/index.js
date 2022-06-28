const multipart = require('parse-multipart')
const fetch = require('node-fetch')
const { BlobServiceClient } = require('@azure/storage-blob')
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
        

    let responseMessage = ""
    try {
        //Initialize codename
        let codename = req.headers['codename']
        
        // Parse body
        const boundary = multipart.getBoundary(req.headers['content-type'])
        const body = req.body;
        const parts = multipart.Parse(body, boundary)

        //Determine file type
        let fileType = parts[0].type
        let ext = ""
        
        if(fileType === 'image/png')
            ext = "png"
        else if(fileType === 'image/jpeg')
            ext = "jpeg"
        else if(fileType === 'image/jpg')
            ext = "jpg"

        responseMessage = await uploadFile(parts, ext, codename)
    } catch(err) {
        context.log("Undefined image body")
        responseMessage = "Sorry! No image attached";
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}

async function uploadFile(parsedBody, ext, fileName) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString)
    const containerName = "images"
    const containerClient = blobServiceClient.getContainerClient(containerName)

    const blobName = fileName + "." + ext;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const resp = await blockBlobClient.upload(parsedBody[0].data, parsedBody[0].data.length);
    return "--- Image Uploaded Successfully ---"
}