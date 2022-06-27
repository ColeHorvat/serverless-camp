const multipart = require('parse-multipart');
const fetch = require('node-fetch')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    const boundary = multipart.getBoundary(req.headers['content-type']);
    const body = req.body;
    const parts = multipart.Parse(body, boundary);

    let result = await analyzeImage(parts[0].data);
    let emotions = result[0].faceAttributes.emotion;
    let objects = Object.values(emotions)
    let mainEmotion = Object.keys(emotions).find(key => emotions[key] === Math.max(...objects));

    let gif = await findGifs(mainEmotion)

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            gif
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

    console.log(uriBase + '?' + params.toString());
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

async function findGifs(emotion) {
    const GIPHY_KEY = process.env.GIPHY_KEY;
    const uriBase = 'https://api.giphy.com/v1/gifs/translate'

    let params = new URLSearchParams({
        'api_key' : GIPHY_KEY,
        's' : emotion,
    })

    let response = await fetch(uriBase + '?' + params.toString())

    let data = await response.json()
    return data.data.url

}

//process.env.variable