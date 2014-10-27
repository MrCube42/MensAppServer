var parserOptions = {
  strict : false,
  normalize : true,
  lowercase : true
};
var sax = require('sax'),
  parser = sax.parser(parserOptions);
var utils = require('./utils.js');

var Price = require('./price.js');
var FoodPart = require('./foodpart.js');
var Food = require('./food.js');
var Mensa = require('./mensa.js');
var OpenHours = require('./openhours.js');

var saxStack = [];

var mensaNumber = 1;
var mensaId = "mensa-" + mensaNumber;
var mensaFound = false;

var foodFound = false;

var parse = function (rawHtml, callback) {
  var mensa = new Mensa(mensaNumber);

  var food = null;
  var prices = [];
  var foodPart;// = new FoodPart();

  // nest event handlers inside function to use callback
  parser.ontext = function (text) {
    // peek by: pop + push afterwards
    var tagName = saxStack.pop();
    if (tagName === "oeffnungszeit-1") {
      mensa.setOpenHours(text);
    }
    if (tagName === "oeffnungszeit-2") {
      mensa.getOpenHours().setHolidayOpenHours(text);
    }
    if(foodFound) {
      // console.log(tagName);
      // console.log(text);
      if(tagName === "text") {
        // food = text;
        food = new Food();
        foodPart = new FoodPart(text);
        console.log
        food.addFoodPart(foodPart);
        console.log(food.toJson());
      }
      // if(utils.startswith(tagName, "preis")) {
      //   prices.push(prices);
      //   if(prices.length === 3) {
      //     mensa.setFood(new Food(food, new Price(prices[0], prices[1], prices[2])));
      //     console.log(mensa.toJson());
      //   }
      // }
      
      if(tagName === "preis-1") {
        foodPart = new FoodPart("test");
        foodPart.setPrice(new Price(text));
        console.log(foodPart.toJson());
      }
      else if (tagName === "preis-2") {
        foodPart.getPrice().addEmployeePrice(text);
        console.log(foodPart.toJson());
      }
      else if (tagName === "preis-3") {
        foodPart.getPrice().addGuestPrice(text);
        console.log(foodPart.toJson());
      }
    }
    saxStack.push(tagName);
  };
  parser.onopentag = function (node) {
    // console.log(saxStack);
    // opened a tag.  node has "name" and "attributes"
    var tagName = node.name;
    if (mensaFound) {
      saxStack.push(tagName);
      if(utils.startswith(tagName, "zeile-")) {
        foodFound = true;
      }
    } else if (tagName === mensaId) {
      mensaFound = true;
      saxStack.push(tagName);
    }
  };
  parser.onclosetag = function (tagName) {
    if (tagName === mensaId) {
      parser.close();
      callback(null);
    }
    if(mensaFound) {
      saxStack.pop();
    }
  };

  // start parsing
  parser.write(rawHtml);
};

exports.parse = parse;