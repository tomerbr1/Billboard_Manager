var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');


var index = require('./routes/index');
var ads = require('./routes/ads');

var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'src')));

//routing
app.use('/', index);
app.use('/api/v1/', ads);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Define the server
var server = app.listen(8080, function() {
    var host = 'localhost';
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});
 
module.exports = app;

/* app.listen(8080);

var adsArray=[];



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
            adsArray.push(doc);
        });
        console.log("/getAds function sent:");
        console.log(adsArray);
        res.send(adsArray);
        adsArray=[];
    })
}); */







