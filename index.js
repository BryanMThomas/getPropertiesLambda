var AWS = require("aws-sdk");

var ddb = new AWS.DynamoDB.DocumentClient({region: "us-west-2"});

exports.handler = async (event, context, callback) => {
 await readProperties().then(data => {
     data.Items.forEach(function(item){
         console.log(item.address)
     })
 }).catch((err) => {
     console.error(err);
 })
};

function readProperties(){
    const params = {
        TableName: 'properties-table',
        Limit: 10
    }
    return ddb.scan(params).promise();
}
