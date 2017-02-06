var data;
var screenNum;

console.log("last edited: 5/2 20:15");

$(document).ready(function () {
    getAds();
    console.log("we arrived to showAd!");

});

var durationTime = 3000; //default time to wait between each iteration when no ads are displayed

//main function to iterate in ads received from server and check their validation
var showAd = function(j) {
    var foundFlag = false; //flag to mention we found a valid timeFrame, so we can show the message itself.
    var foundDate = false;
    console.log("Message title: " + data[j].title); //DEBUG

    $.each(data[j].timeFrames, function () {
            if (dateCheck(this)){
                foundDate = true;
                console.log("found date")
            }
            else
                console.log("not found date")
    });

    //if date found valid, check if message's screen is the same as in url query
    if (foundDate){
        for (i = 0 ; i < data[j].screens.length ; i ++){
            console.log("SCREEN: " + data[j].screens[i]);
            if (data[j].screens[i] == screenNum) {
                foundFlag = true;
                break;
            }
        }
    }

    //if screen is the same too, display the message for it's duration
    if (foundFlag) {
        $("#ad").load(data[j].templateFile, function () {
            for (var i = 0; i < data[j].text.length; i++) {
                $("#text" + i).html(data[j].text[i]);
                console.log("text" + i + ":"  + data[j].text[i])
            }
            for (var i = 0; i < data[j].pics.length; i++) {
                $("#img" + i).attr('src', "." + data[j].pics[i]);
            }
        });
        setTimeout(showAd,data[j].duration,(j+1)%data.length);
    }
    else{
        setTimeout(showAd,2000,(j+1)%data.length);
        $("#ad").empty();
    }
};

function dateCheck(msg) {
    var daysArray = {"Sun": false, "Mon": false, "Tue": false, "Wed": false, "Thu": false, "Fri": false, "Sat": false};

    //set the timeFrame's days as true in local daysArray
    for (var i = 0; i < msg.days.length; i++)
        daysArray[msg.days[i]] = true;

    var currentDate = new Date();
    if (daysArray[currentDate.toString().split(' ')[0]]) //get day's name ('Sun', 'Mon') from currentDate and check it's boolean value in daysArray
    {

        //Parse dates from dateBegin & dateEnd string and represent them as current num of milliseconds passed since 1/1/1970 00:00
        var dateBegin = Date.parse(msg.dateBegin + ' 00:00:00');
        var dateEnd = Date.parse(msg.dateEnd + ' 23:59:59');
        var dateToday = Date.parse(currentDate.toString());

        //Check if today's date is between dateBegin and dateEnd's seconds
        if (dateToday <= dateEnd && dateToday >= dateBegin) {
            console.log("Current date is between dates!"); //DEBUG
            /*
             Parse times from timeBegin and timeEnd strings and represent them as num of milliseconds
             in order to compare between them and the current time,
             while using arbitrary date for the comparision.
             */
            var
                timeBegin = new Date(Date.parse('01/01/1970' + " " + msg.timeBegin));
            var timeEnd = new Date(Date.parse('01/01/1970' + " " + msg.timeEnd));
            var timeToday = new Date(Date.parse('01/01/1970' + " " + currentDate.getHours() + ":" + currentDate.getMinutes()));

            if (timeToday <= timeEnd && timeToday >= timeBegin) {
                console.log("timeToday " + msg.timeFrameNum + " is in range!"); //DEBUG
                return(true);
            }
            else{
                return(false);
            }
        }
        ;
    }
}

//Refresh data from server using ajax
function getAds() {
    $.get("/getAds", function(adsData){
        data = adsData;
        console.log("data on client =" +data);
        var messagesLength = data.length;
        console.log("message length: " + messagesLength);
        screenNum = getScreenNum();
        console.log("screenNum = " + screenNum);
        showAd(0);
        });
    };


//Retrieve 'screen' parameter's value from url query
function getScreenNum() {
    var url = window.location.pathname;
    var getQuery = url.split('=')[1];
    console.log("getQuery = " + getQuery);

    // if the value equal null - set a default value "1".
    if (getQuery == null){
        console.log("getQuery is null! changing to 1");
        getQuery="1";
    }
    return getQuery;

}