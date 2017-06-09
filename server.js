var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var mongo = require('mongodb').MongoClient;
var mongoose = require('mongoose');

var database;
//maiusculo pq instancia
var Message = mongoose.model('Message',{
    msg: String
});

app.use(bodyParser.json());

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Content-Type, Authorization");
    next();
})

app.get('/api/message', GetMessages); //ok

app.post('/api/message', function(req, res){
    console.log(req.body);
    //database.collection('messages').insertOne(req.body);
    var message = new Message(req.body);
    message.save();
    res.status(200); //ok
})

/*mongo.connect("mongodb://localhost:27017/test", function(err,db){
    if(!err){
        console.log("we are connected to mongo");
        database = db;
        //db.collection('messages').insertOne({'msg':'test'});
    }
})*/

mongoose.connect("mongodb://localhost:27017/test", function(err,db){
    if(!err){
        console.log("we are connected to mongo");
        //GetMessages();
        //database = db;
        //db.collection('messages').insertOne({'msg':'test'});
    }
})

function GetMessages(req, res){
    Message.find({}).exec(function(err, result){
        res.send(result);
    })
}

var server = app.listen(5000, function(){
    console.log('listening on port ', server.address().port);
})
