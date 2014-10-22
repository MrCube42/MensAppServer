// fetch modules
var flatiron = require('flatiron'),
  path = require('path'),
  app = flatiron.app;
var requester = require('./mensapp-requester.js');
var parser = require('./mensapp-parser.js');

// define SWT base url
var URL = "http://studiwerk.cms.rdts.de/cgi-bin/cms?_SID=NEW&_bereich=system&_aktion=export_speiseplan&datum=20141022";

// function to start the app with flatiron
var startApp = function (route, port) {
  app.config.file({ file: path.join(__dirname, 'config', 'config.json') });

  app.use(flatiron.plugins.http);

  app.router.get(route, function () {
    // on get use the requester to fetch SWT data
    // parse it with the mensapp-parser
    // and log to the console
    requester.request(URL, parser.parse, console);
    // return something
    this.res.json({'status': 'done'});
  });

  app.start(port);
};

// start MensAppServer on index route and port 8080
startApp('/', 8080);