
var app = function(){
 getRandomComic();
};

function getRandomComic(){
    // keys for API
    var PRIV_KEY = "403c5f3406be455684061d92266dea467b382bdc";
    var API_KEY = "1a11ffc2c79394bdd4e7a7b8d97c43a9";
    // create new date object
    var ts = new Date().getTime();
    // generate random in between 1 and 50000
    var randomNumber = getRandomInt(1, 50000);
    console.log(randomNumber);
    // target api
    var url = "http://gateway.marvel.com:80/v1/public/comics/" + randomNumber + "?apikey=1a11ffc2c79394bdd4e7a7b8d97c43a9";
    // create a hash using md5 function
    var hash = md5(ts + PRIV_KEY + API_KEY);
    // modify url with hash
    url += "&ts="+ts+"&hash="+hash;
    // html divs
    defineHtmlStuff();
    // make request
    makeRequest(url, requestComplete);
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


var md5 = function(value) {
    return CryptoJS.MD5(value).toString();
};

var defineHtmlStuff = function(){
    var startButton = document.querySelector("#start-button");
    var image = document.querySelector("#image");
    var characterMenu = document.querySelector("#character-menu");
    console.log(startButton);
    console.log(image);
    console.log(characterMenu);

    startButton.onclick = function(){
        console.log("startButton clicked");
        makeRequest(url, requestComplete);
    }
};

var makeRequest = function(url, callback){
    // type of request
    var request = new XMLHttpRequest();
    // initiate request
    request.open("GET", url);
    console.log(request);
    // action to be taken when request received
    request.onload = callback;
    // send request
    request.send();
};

var requestComplete = function(){
    // check status
    if(this.status !== 200) return;
    console.log("got the data");
    // assign variable to response
    var jsonString = this.responseText;
    // convert JSON
    var marvel = JSON.parse(jsonString);
    console.log(jsonString);
    console.log(marvel);
    console.log(marvel.data.results[0].thumbnail);
    displayImage(marvel.data.results[0].thumbnail);
};



var displayImage = function(image){
    console.log(image.path);

    document.getElementById('image').innerHTML = "<img src=" + image.path + ".jpg />";

}


window.onload = app;