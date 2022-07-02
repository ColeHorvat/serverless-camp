const { BlobServiceClient } = require('@azure/storage-blob')
//const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
const connectionString = "DefaultEndpointsProtocol=https;AccountName=colecampstorage;AccountKey=TzR2HvWg3ems0OUt6LpO9KxyO4edPUGk+Z0OO5avkBSWTRGC45/46ITItFoEfFqH7dm2mygRkGcA+AStJqP6vg==;EndpointSuffix=core.windows.net"
const account = "colecampstorage"

module.exports = async function (context, myTimer) {

    context.log("--- Starting Deletion ---");
    context.log(connectionString)
    const blobServiceClient = await BlobServiceClient.fromConnectionString(connectionString)
    const deleteContainer = "images"
    const blobContainerClient = await blobServiceClient.getContainerClient(deleteContainer)

    for await (const blob of blobContainerClient.listBlobsFlat()) {
        await blobContainerClient.deleteBlob(blob.name)
    }
    context.log("Just deleted all your blobs!");   
};