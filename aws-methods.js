var aws      = require('aws-sdk');
var path 	 = require('path');
var queueUrl = "";

aws.config.loadFromPath(__dirname + '/aws-config.json');
var sqs = new aws.SQS();

module.exports.sendMessage=function(message){
    var params = {
        MessageBody: message,
        QueueUrl: queueUrl,
        DelaySeconds: 0
    };

    sqs.sendMessage(params, function(err, data) {
        if(err) {
            console.log(err);
        }  
        else {
            console.log(data);
        } 
    });
}

module.exports.receiveMessage=async function () {
    var params = {
        QueueUrl: queueUrl,
        VisibilityTimeout: 600
    };

    let receiveMessagePromise=sqs.receiveMessage(params).promise();

    let data = await receiveMessagePromise;
    message=data.Messages[0];
    return message;
}

module.exports.deleteMessage=function (rerceipt){
    var params = {
        QueueUrl: queueUrl,
        ReceiptHandle: receipt
    };
    
    sqs.deleteMessage(params, function(err, data) {
        if(err) {
            console.log(err);
        } 
        else {
            console.log(data);
        } 
    });
}