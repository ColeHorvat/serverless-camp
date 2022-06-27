const querystring = require('qs')
const fetch = require('node-fetch')
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const queryObject = querystring.parse(req.body);
    let gen = ""
    const songs = {"GenZ":"https://open.spotify.com/track/0SIAFU49FFHwR3QnT5Jx0k?si=1c12067c9f2b4fbf", 
    "GenY":"https://open.spotify.com/track/1Je1IMUlBXcx1Fz0WE7oPT?si=a04bbdf6ec4948b9", 
    "GenX":"https://open.spotify.com/track/4Zau4QvgyxWiWQ5KQrwL43?si=790d9e3ef2ed408d", 
    "BabyBoomers":"https://open.spotify.com/track/4gphxUgq0JSFv2BCLhNDiE?si=1abb329f2dc24f50", 
    "Unknown":"https://open.spotify.com/track/5ygDXis42ncn6kYG14lEVG?si=84b49b41d09d4d11"}


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

    const song = songs[gen]
    const message = "We guessed you're part of this generation: " + gen + "! Happy listening! " + song

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: message
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