const querystring = require('qs')
const fetch = require('node-fetch')
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const queryObject = querystring.parse(req.body);
    let gen = ""

    let img = await getImage(queryObject.MediaUrl0);
    let result = await analyzeImage(img);

    let age = result[0].faceAttributes.age;

    if(age < 5 && age < 25)
        gen = "GenZ";
    else if(age > 24 && age < 41)
        gen = "GenY";
    else if(age > 40 && age < 57)
        gen = "GenX";
    else if(age > 56 && age < 76)
        gen = "BabyBoomers";
    else
        gen = "Unknown";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: gen
    };
}

async function getImage(url) {
    let resp = await fetch(url, { 
        method: 'GET',
    })

    let data = await resp.arrayBuffer();
    return data
}

async function analyzeImage(img){
    const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';

    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'age'

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