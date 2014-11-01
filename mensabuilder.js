var dejavu = require('dejavu');

var OpenHours = require('./openhours');
var Price = require('./price');
var FoodPart = require('./foodpart');
var Food = require('./food');
var Mensa = require('./mensa');

var MensaBuilder = dejavu.Class.declare({
  $name: "MensaBuilder",

  _mensa: null,
  _normalOpenHours: null,
  _holidayOpenHours: null,
  _mensaIdToTypeMappings: {
    1 : "Uni",
    2 : "Hochschule",
    5 : "Hochschule",
    6 : "",
    7 : "Hochschule",
    8 : "Uni",
    10 : "Kindergarten"
  },
  _mensaIdToNameMappings: {
    1 : "Tarforst",
    2 : "Forum/Bistro AB - Kleine Karte",
    5 : "Cafeteria Schneidershof - Kleine Karte",
    6 : "Mittagstisch im Irminenfreihof",
    7 : "Schneidershof",
    8 : "Geo-Mensa Petrisberg",
    10 : "Kleine Karte"
  },

  initialize: function (mensaId) {
    var mensaName = this._mensaIdToNameMappings[mensaId];
    var mensaType = this._mensaIdToTypeMappings[mensaId];
    var mensa = new Mensa(mensaName, mensaType);
    this._mensa = mensa;
  },

  addNormalOpenHours: function (rawOpenHours) {
    this._normalOpenHours = rawOpenHours;
    return this;
  },

  addHolidayOpenHours: function (rawOpenHours) {
    this._holidayOpenHours = rawOpenHours;
    return this;
  },

  build: function () {
    if (this._normalOpenHours) {
      this._mensa.setOpenHours(new OpenHours(this._normalOpenHours, this._holidayOpenHours));
    }
    return this._mensa;
  }

});

module.exports = MensaBuilder;