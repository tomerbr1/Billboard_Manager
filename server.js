var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.listen(8080);

var messagesByScreen=[];

//var fs = require('fs');
//var obj = fs.readFileSync('./data/data.json', 'utf8');

//MongoDB
var mongojs = require('mongojs');

//var path=require('path');
//require node modules (see package.json)
var mongodb = require('mongodb');
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/AdsDatabase';

var adsCollection;

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

MongoClient.connect(url, function (err, db) //connecting to mongoDB
{
    if (err)
    {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    }
    else
    {
        adsCollection = db.collection('Ads');
    }
});

//default handler for client request
app.get('/', function(req, res){
    console.log("sent index.html file");
    res.sendFile(__dirname + "/index.html");
});


//default handler for request with screen path
app.get('/screen=:number', function (req, res) {
    res.sendFile("index.html", { root: './'});
});

//allow client to receive data files from server
app.get(/\.js|\.html|\.jpg|\.png/, function(req, res){
    res.sendFile(__dirname+req.url);
});

//handler for request with screen parameter
app.get('/getAds', function (req, res) {
    adsCollection.find().toArray(function (err, docs)
    {
        docs.forEach(function (doc)
        {
            messagesByScreen.push(doc);
        });
        console.log("/getAds function sent:");
        console.log(messagesByScreen);
        res.send(messagesByScreen);
        messagesByScreen=[];
    })
});







