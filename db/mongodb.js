var ads =[
	 {
	"id": 1,
	"title": "Message 1",
	"templateFile": "./templates/templateA.html",
	"text": ["FirstText", "SecondText", "ThirdText", "ForthText"],
	"pics": ["/images/A1.png", "/images/A2.png"],
	"duration": 5000,
	"timeFrames": [
		{
			"timeFrameNum": 1,
			"dateBegin": "02/04/2017",
			"dateEnd": "02/09/2017",
			"days": ["Sat", "Sun"],
			"timeBegin": "06:00",
			"timeEnd": "23:00"
		},
		{
			"timeFrameNum": 2,
			"dateBegin": "01/01/2016",
			"dateEnd": "12/31/2016",
			"days": ["Wed"],
			"timeBegin": "13:00",
			"timeEnd": "20:00"
		}],
	"screens": ["1", "2"]
},
	{
		"id": 2,
		"title": "Message 2",
		"templateFile": "./templates/templateB.html",
		"text": ["FirstText", "SecondText", "ThirdText", "ForthText", "FifthText", "SixthText", "SeventhText", "EighthText", "NinethText", "TenthText"],
		"pics": ["/images/B1.png"],
		"duration": 5000,
		"timeFrames": [
			{
				"timeFrameNum": 1,
				"dateBegin": "02/04/2017",
				"dateEnd": "02/09/2017",
				"days": ["Tue", "Wed", "Sat", "Sun"],
				"timeBegin": "10:00",
				"timeEnd": "22:00"
			}],
		"screens": ["1", "3"]
	},
	{
		"id": 3,
		"title": "Message 3",
		"templateFile": "./templates/templateC.html",
		"text": [],
		"pic": [],
		"duration": 5000,
		"timeFrames": [
			{
				"timeFrameNum": 1,
				"dateBegin": "05/01/2016",
				"dateEnd": "06/15/2016",
				"days": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				"timeBegin": "08:00",
				"timeEnd": "22:00"
			}],
		"screens": ["2", "3"]
	},
	{
		"id": 4,
		"title": "Message 4",
		"templateFile": "./templates/templateA.html",
		"text": ["FirstText", "SecondText"],
		"pics": [],
		"duration": 5000,
		"timeFrames": [
			{
				"timeFrameNum": 1,
				"dateBegin": "03/29/2016",
				"dateEnd": "04/15/2016",
				"days": ["Mon"],
				"timeBegin": "15:00",
				"timeEnd": "19:00"
			}],
		"screens": ["1"]
	},
	{
		"id": 5,
		"title": "Message 5",
		"templateFile": "./templates/templateB.html",
		"text": ["FirstText", "SecondText", "ThirdText", "ForthText", "FifthText", "SixthText", "SeventhText"],
		"pics": ["/images/C1.png", "/images/C2.png"],
		"duration": 5000,
		"timeFrames": [
			{
				"timeFrameNum": 1,
				"dateBegin": "04/01/2016",
				"dateEnd": "04/30/2016",
				"days": ["Mon", "Tue", "Wed"],
				"timeBegin": "01:00",
				"timeEnd": "23:00"
			}],
		"screens": ["3"]
	}
]

//require node modules (see package.json)
var mongodb = require('mongodb');
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/AdsDatabase';



MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    }

    var adsCollection = db.collection('Ads');
    adsCollection.insert(ads);

    db.close();
});
