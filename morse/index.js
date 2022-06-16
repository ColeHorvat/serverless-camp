module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const morse = require("morse-code-converter")
    
    const text = (req.query.plaintext || (req.body && req.body.plaintext));
    let code = "";

    if(typeof text === 'undefined' || text=== "")
        code = "Please enter some text to convert!"
    else
        code = morse.textToMorse(text);
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: code
    };
}