const querystring = require('qs')
const CosmosClient = require('@azure/cosmos').CosmosClient
const config = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY, 
    databaseId: "SecretStorer",
    containerId: "secrets",
    partitionKey: {kind: "Hash", paths: ["/secrets"]}
}

async function create(client, databaseId, containerId) {
    const partitionKey = config.partitionKey

    const { database } = await client.databases.createIfNotExists({
        id: databaseId
    })
    
    const { container } = await client
    .database(databaseId)
    .containers.createIfNotExists(
        { id: containerId, partitionKey },
        { offerThroughput: 400}
    )
}

async function createDocument(newItem){
    const { endpoint, key, databaseId, containerId } = config;

    const client = new CosmosClient({ endpoint, key });

    const database = client.database(databaseId);
    const container = database.container(containerId);

    // Make sure Tasks database is already setup. If not, create it.
    await create(client, databaseId, containerId);

    const querySpec = {
        query: "SELECT * FROM c"
    }

    const {resources: items} = await container.items
    .query(querySpec)
    .fetchAll()

    const { resource: createdItem } = await container.items.create(newItem);
    
    return items
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');


    const queryObject = querystring.parse(req.body)
    let message = queryObject.Body
    let document = {"message": message}
    let items = await createDocument(document)

    let random_num = Math.floor(items.length * Math.random())

    let responseMessage = `Thanks 😊! Stored your secret "${message}". 😯 Someone confessed that: ${JSON.stringify(items[random_num].message)}`


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}

