// fetch modules
var flatiron = require('flatiron'),
  path = require('path'),
  app = flatiron.app;
var Uri = require('jsuri');
var requester = require('./mensapp-requester.js');
var parser = require('./mensapp-parser.js');
var flow = require('async');

function buildUrl() {
  // define SWT url
  var uri = new Uri("http://studiwerk.cms.rdts.de")
    .setPath("cgi-bin/cms")
    .addQueryParam("_SID", "NEW")
    .addQueryParam("_bereich", "system")
    .addQueryParam("_aktion", "export_speiseplan")
    .addQueryParam("datum", "20141022");
  return uri.toString();
}

function fetchData(flatiron) {
  // use asnyc waterfall for flow control and argument passing
  flow.waterfall([
    function (callback) {
      // request the raw html from the SWT url
      var url = buildUrl();
      requester.request(url, callback);
    },
    function (html, callback) {
      // parse it with the mensapp-parser
      parser.parse(html, callback);
    },
    function (callback) {
      // return something
      flatiron.res.json({'status': 'done'});
      flatiron.res.end();
      console.log("Done.");
      callback(null);
    }
  ]);
}

// function to start the app with flatiron
function startApp(route, port) {
  app.config.file({ file: path.join(__dirname, 'config', 'config.json') });
  app.use(flatiron.plugins.http);
  app.router.get(route, function () {
    // on get start fetching, parsing and storing SWT data
    fetchData(this);
  });
  app.start(port);
}

// start MensAppServer on index route and port 8080
startApp('/', 8080);