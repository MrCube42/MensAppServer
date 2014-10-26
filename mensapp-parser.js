var htmlparser = require('htmlparser2');

var toPrintOut = false;

// function handleText(text) {
// }

// function handleOpenTag(tagname, attribs) {
//   if (tagname === "mensa-1") {
//   }
//   if (tagname === "oeffnungszeit-1") {
//   }
// }

// function handleCloseTag(tagname, callback) {
//   if (tagname === "html") {
//     // this must be the end of the document
//     // so signal to the callback
//     callback();
//   }
// }

var parse = function (rawHtml, callback) {
  // var parser = new htmlparser.Parser({
  //   onopentag: function (tagname, attribs) {
  //     handleOpenTag(tagname, attribs);
  //   },
  //   ontext: function (text) {
  //     handleText(text);
  //   },
  //   onclosetag: function (tagname) {
  //     handleCloseTag(tagname, callback);
  //   }
  // });
  // parser.write(rawHtml);
  // parser.end();

  var handler = new htmlparser.DomHandler(function (error, dom) {
      if (error) {
        console.log("Error occurred: " + error);
      } else {
        console.log(dom);
      }
    });
  var domParser = new htmlparser.Parser(handler);
  domParser.write(rawHtml);
  domParser.done();
  callback(null);
};

exports.parse = parse;