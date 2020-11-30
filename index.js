var AWS = require("aws-sdk");

var ddb = new AWS.DynamoDB.DocumentClient({
    region: "us-west-2"
});

exports.handler = async (event, context, callback) => {
    console.log("a")
    console.log(event["queryStringParameters"])
    return await readProperties().then(data => {
        let response = {
            "isBase64Encoded": false,
            "statusCode": 200,
            "headers": {},
            "body": JSON.stringify(data.Items)
        }
        return response
    }).catch((err) => {
        console.error(err);
    })
};

function readProperties() {
    const params = {
        TableName: 'properties-table',
        Limit: 10
    }
    return ddb.scan(params).promise();
}