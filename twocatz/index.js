module.exports = async function (context, req) {
    const fetch = require('node-fetch');
    const ENDPOINT = 'https://bit-cat.azurewebsites.net/cat/says/serverless';
    const NAMES = ['Shreya', 'Emily', 'Fifi', 'Beau', 'Evelyn', 'Julia', 'Daniel', 'Fardeen'];

    let images = []
    let outputNames = []

    for(let i = 0; i < 2; i++) {
        let resp = await fetch(ENDPOINT, {
            method: 'GET',
        }); 
        let data = await resp.arrayBuffer();
        let base64data = Buffer.from(data).toString('base64');
        let rand = Math.floor(NAMES.length * Math.random());

        images.push(base64data);
        outputNames.push(NAMES[rand])
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            cat1: images[0],
            cat2: images[1],
            names: outputNames
        }
    };
}