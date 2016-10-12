var Numbers = require('../models/numbers.js');
var querystring = require('querystring');
var https       = require('https');
var path = require('path');
var username = 'psy';
var apikey   = 'f9b5445c5ff69131747344fa646e957a4492ec9ee5caac037edd0b59d4474953';

// import coupon code and bluebird - Promises library
var couponCode = require('coupon-code');
var Promise = require('bluebird');

// generate a coupon code for inviting friends
      //  check the uniqueness of the coupon and return a promise
var count = 0;
function check(code){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      count ++;
      // first resolve with false, on second try resolve with true
      if(count == 1){
        console.log(code + " is not unique");
        resolve(false);
      }
      else{
        console.log(code + " is unique");
        resolve(true);

      }
    }, 1000); // set time out to 1 second(1000 milliseconds)
  });
}


// generate unique code
var  generateUniqueCode = Promise.method(function(){
  var code = couponCode.generate();
  return check(code)
    .then(function(result){
      if(result){
        return code;
      } else{
        return generateUniqueCode();
      }
    });
});

// log out the generated code



module.exports = {
  add: function(req, res) {
    var newNumber = new Numbers({ number: req.body.phone });
    generateUniqueCode().then(function(code){
         newNumber.save(function (err, fluffy) {
      if (err) {
        return console.error(err);
      }
      var to = req.body.phone;
      var message = code;
      var post_data = querystring.stringify({
        'username' : username,
        'to'       : to,
        'message'  : message
      });
      var post_options = {
        host   : 'api.africastalking.com',
        path   : '/version1/messaging',
        method : 'POST',

        rejectUnauthorized : false,
        requestCert        : true,
        agent              : false,

        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Content-Length': post_data.length,
          'Accept': 'application/json',
          'apikey': apikey
        }
      };
      var post_req = https.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          var jsObject   = JSON.parse(chunk);
          var recipients = jsObject.SMSMessageData.Recipients;
          if ( recipients.length > 0 ) {
            for (var i = 0; i < recipients.length; ++i ) {
              var logStr  = 'number=' + recipients[i].number;
              logStr     += ';cost='   + recipients[i].cost;
              logStr     += ';status=' + recipients[i].status; // status is either "Success" or "error message"
              console.log(logStr);
            }
          } else {
            console.log('Error while sending: ' + jsObject.SMSMessageData.Message);
          }
        });
      });

      // Add post parameters to the http request
      post_req.write(post_data);

      post_req.end();
      
      res.redirect('/');
    });
    })
   
  }
};
