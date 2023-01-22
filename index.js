// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
   
  let dateString=req.params.date
  
  
   if (/[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(dateString)) {
    
    let dateUnix=Date.parse(dateString)
    console.log(dateUnix)
    res.json({ unix: dateUnix, utc: new Date(dateString).toUTCString() });


  } else {
    

    let dataObject =new Date(Number(dateString))
    console.log(dataObject);
    let unixToUTC=dataObject.toUTCString() 
  

    res.json({ unix: Number(dateString), utc:unixToUTC});
    
  } 
 /*  A 4 digit number is a valid ISO-8601 for the beginning of that year
  5 digits or more must be a unix time, until we reach a year 10,000 problem
  let dateString=req.params.date_string
  console.log(dateString);
  if (/\d{5,}/.test(dateString)) {
    dateInt = parseInt(dateString);
    Date regards numbers as unix timestamps, strings are processed differently
    res.json({ unix: dateString, utc: new Date(dateInt).toUTCString() });
  }

  let dateObject = new Date(dateString);

  if (dateObject.toString() === "Invalid Date") {
    res.json({ error: "Invaid Date" });
  } else {
    res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
  } */
  
});



// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
