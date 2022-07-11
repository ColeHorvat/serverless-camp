const fetch = require('node-fetch');
module.exports = async function (context, req) {
    
    const ENDPOINT = 'https://bit-cat.azurewebsites.net/cat/says/serverless';
    const NAMES = ['Shreya', 'Emily', 'Fifi', 'Beau', 'Evelyn', 'Julia', 'Daniel', 'Fardeen'];

    let images = []
    let outputNames = []

    
    const name1 = req.query.name1
    const name2 = req.query.name2
    const name3 = req.query.name3
    const name4 = req.query.name4

    outputNames = [name1, name2, name3, name4]


    for(let i = 0; i < 4; i++) {
/*         let resp = await fetch(ENDPOINT, {
            method: 'GET',
        });  */
        /* let data = await resp.arrayBuffer(); */
       /*  let base64data = Buffer.from(data).toString('base64'); */
        images.push( await getCatPic(outputNames[i]) );

    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            cat1: images[0],
            cat2: images[1],
            cat3: images[2],
            cat4: images[3],
            names: outputNames
        }
    };
}

async function getCatPic(name) {
    const response = await fetch("https://cataas.com/cat/says/" + name, {
        method: 'GET',
    })

    const data = await response.arrayBuffer();
    const base64data = Buffer.from(data).toString('base64');

    return base64data
}