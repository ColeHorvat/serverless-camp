const QueryString = require('qs')
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const queryObject = QueryString.parse(req.body);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: queryObject.MediaUrl0
    };
}