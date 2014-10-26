var dejavu = require('dejavu');
var OpenHours = require('./openhours.js');

var mensaIdToNameMappings = {
  1 : "Tarforst",
  2 : "Forum/Bistro AB - Kleine Karte",
  5 : "Cafeteria Schneidershof - Kleine Karte",
  6 : "Mittagstisch im Irminenfreihof",
  7 : "Schneidershof",
  8 : "Geo-Mensa Petrisberg",
  10 : "Kleine Karte"
};
var mensaIdToTypeMappings = {
  1 : "Uni",
  2 : "Hochschule",
  5 : "Hochschule",
  6 : "",
  7 : "Hochschule",
  8 : "Uni",
  10 : "Kindergarten"
};

// Mensa Class
var Mensa = dejavu.Class.declare({
  $name: "Mensa",

  _name: null,
  _type: null,
  _openHours : null,

  initialize: function (mensaId) {
    this._setName(mensaId);
    this._setType(mensaId);
  },

  _setName: function (mensaId) {
    this._name = mensaIdToNameMappings[mensaId];
  },

  _setType: function (mensaId) {
    this._type = mensaIdToTypeMappings[mensaId];
  },

  setOpenHours: function (rawOpenHours, rawHolidayOpenHours) {
    this._openHours = new OpenHours(rawOpenHours, rawHolidayOpenHours);
  },

  getOpenHours: function () {
    return this._openHours;
  }
});

module.exports = Mensa;