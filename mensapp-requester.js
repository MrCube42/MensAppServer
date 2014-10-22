var http = require('http');

var request = function (url, parse, logger) {
  http.get(url, function (response) {

    console.log("Requested " + url);
    console.log("Got reponse " + response.statusCode);
    var bodyarr = [];

    response.on('data', function (chunk) {
      bodyarr.push(chunk);
    });

    // after full html has been loaded, start parsing
    response.on('end', function () {
      var rawHtml = bodyarr.join('').toString();
      console.log("Done reading!");
      parse(rawHtml, logger);
    });

  }).on('error', function (e) {
    console.log("Got error " + e.message);
  });

};

exports.request = request;