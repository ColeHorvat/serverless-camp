const multipart = require('parse-multipart');
const fetch = require('node-fetch')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    const boundary = multipart.getBoundary(req.headers['content-type']);
    const body = req.body;
    const parts = multipart.Parse(body, boundary);

    let result = await analyzeImage(parts[0].data);
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            result
        }
    };
    console.log(result)
}


async function analyzeImage(img){
    const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';

    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'emotion'

    })

    let response = await fetch(uriBase + '?' + params.toString(), {
        method: 'POST',
        body: img,

        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    })
    
    let data = await response.json()
    return data;
}
// key: 38460f7dda94405380d266fe3fd9a0c0
// endpoint: https://chorvat-face.cognitiveservices.azure.com

//process.env.variable