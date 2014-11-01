var dejavu = require('dejavu');
var Food = require('./food.js');
var OpenHours = require('./openhours.js');

// Mensa Class
var Mensa = dejavu.Class.declare({
  $name: "Mensa",

  _name: null,
  _type: null,
  _openHours : null,
  _food: null,

  initialize: function (name, type) {
    this._name = name;
    this._type = type;
  },

  setOpenHours: function (rawOpenHours, rawHolidayOpenHours) {
    this._openHours = new OpenHours(rawOpenHours, rawHolidayOpenHours);
  },

  getOpenHours: function () {
    return this._openHours;
  },

  setFood: function (food) {
    this._food = food;
  },

  getFood: function () {
    return this._food;
  },

  getName: function () {
    return this._name;
  },

  getType: function () {
    return this._type;
  },

  toJson: function () {
    return {
      "name": this._name,
      "type": this._type,
      "openHours": this._openHours.toJson(),
      "food": this._food.toJson()
    };
  }

});

module.exports = Mensa;