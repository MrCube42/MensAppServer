var parserOptions = {
  strict : false,
  normalize : true,
  lowercase : true
};
var sax = require('sax'),
  parser = sax.parser(parserOptions);

var Mensa = require('./mensa.js');
var OpenHours = require('./openhours.js');

var saxStack = [];

var mensaNumber = 1;
var mensaId = "mensa-" + mensaNumber;
var mensaFound = false;

var parse = function (rawHtml, callback) {
  var mensa = new Mensa(mensaNumber);

  // nest event handlers inside function to use callback
  parser.ontext = function (text) {
    // got some text. t is the string of text.
    var tagName = saxStack.pop();
    if (tagName === "oeffnungszeit-1") {
      mensa.setOpenHours(text);
    }
    saxStack.push(tagName);
  };
  parser.onopentag = function (node) {
    // opened a tag.  node has "name" and "attributes"
    var tagName = node.name;
    if (mensaFound) {
      saxStack.push(tagName);
    } else if (tagName === mensaId) {
      mensaFound = true;
      saxStack.push(tagName);
    }
  };
  parser.onclosetag = function (tagName) {
    saxStack.pop();
    if (tagName === mensaId) {
      parser.close();
      callback(null);
    }
  };

  // start parsing
  parser.write(rawHtml);
};

exports.parse = parse;