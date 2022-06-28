const { BlobServiceClient } = require('@azure/storage-blob')
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
const account = "colecampstorage"

module.exports = async function (context, myTimer) {

    context.log('--- Starting Deletion ---');
    const blobServiceClient = await BlobServiceClient.fromConnectionString(connectionString)
    const deleteContainer = "images"
    const blobContainerClient = await blobServiceClient.getContainerClient(deleteContainer)

    for await (const blob of blobContainerClient.listBlobsFlat()) {
        context.log('Deleting blob: ' + blob.name)
        await blobContainerClient.deleteBlob(blob.name)
    }
    context.log('Just deleted all your blobs!', timeStamp);   
};