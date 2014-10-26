var parserOptions = {
  strict : false,
  normalize : true,
  lowercase : true
}

var sax = require('sax'),
  parser = sax.parser(parserOptions);

parser.onerror = function (e) {
  // an error happened.
  console.log(e);
};
parser.ontext = function (t) {
  // got some text.  t is the string of text.
};
parser.onopentag = function (node) {
  // opened a tag.  node has "name" and "attributes"
  if(node.name==="mensa-1") {
    console.log(node);  
  }
};
parser.onattribute = function (attr) {
  // an attribute.  attr has "name" and "value"
};
parser.onend = function () {
  // parser stream is done, and ready to have more stuff written to it.
  callback(null);
};

var parse = function (rawHtml, callback) {
  parser.write(rawHtml);
  
};

exports.parse = parse;