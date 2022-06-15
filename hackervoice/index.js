module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const password = req.query.password || (req.body && req.body.password);
    const outputMessage = ((password == "letmein") 
    ? "Access granted."
    : "Access denied."); 
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: outputMessage
    };
}