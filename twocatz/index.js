module.exports = async function (context, req) {
    const fetch = require('node-fetch');
    const ENDPOINT = 'https://bit-cat.azurewebsites.net/cat/says/serverless';

    const resp = await fetch(ENDPOINT, {
        method: 'GET',
    });
    const data = await resp.arrayBuffer();
    const base64data = Buffer.from(data).toString('base64');
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { base64data }
    };
}