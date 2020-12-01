var AWS = require("aws-sdk");

var ddb = new AWS.DynamoDB.DocumentClient({
    region: "us-west-2"
});

exports.handler = async (event, context, callback) => {
    console.log(event["queryStringParameters"])
    let responseObj = {};

    return await readProperties().then(data => {
        let response = {
            "isBase64Encoded": false,
            "statusCode": 200,
            "headers": {},
            "body": JSON.stringify(filterResults(event["queryStringParameters"], data.Items))
        }
        return response
    }).catch((err) => {
        console.error(err);
    })
};

function readProperties() {
    //Returns ten items from the properties dynamo db table
    const params = {
        TableName: 'properties-table',
        Limit: 10,
    }
    return ddb.scan(params).promise();
}

function filterResults(queryStrings, items) {
    let returnArr = []
    if (queryStrings) { //check for querystrings

        items.forEach(item => {
            if (queryStrings.hasOwnProperty('listingStatus') && item['listingStatus'] != queryStrings['listingStatus']) {
                return;
            }
            returnArr.push(item)
        })
    } else {
        //return all items if no querystrings are present
        return items;
    }
    return returnArr;
}