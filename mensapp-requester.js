var http = require('http');

var request = function (url, callback) {
  http.get(url, function (response) {
    var bodyarr = [];

    response.on('data', function (chunk) {
      bodyarr.push(chunk);
    });

    // after full html has been loaded, start parsing
    response.on('end', function () {
      var rawHtml = bodyarr.join('').toString();
      callback(null, rawHtml);
    });

  }).on('error', function (e) {
    console.log("Got error " + e.message);
  });
};

exports.request = request;