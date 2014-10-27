var dejavu = require('dejavu');
var FoodPart = require('./foodpart.js');

var Food = dejavu.Class.declare({
  $name: "Food",

  _name: null,
  _menuPrice: null,

  _parts: null,

  initialize: function (name) {
    this._name = name;
    this._parts = [];
  },

  hasName: function () {
    return this._name !== null;
  },

  getName: function () {
    return this._name;
  },

  hasMenuPrice: function () {
    return this._menuPrice !== null;
  },

  setMenuPrice: function (price) {
    this._menuPrice = price;
  },

  getMenuPrice: function () {
    return this._menuPrice;
  },

  addFoodPart: function (part) {
    this._parts.push(part);
  },

  getFoodParts: function () {
    return this._parts;
  },

  toJson: function () {
    var foodParts = [];
    var i;
    for (i = 0; i < this._parts; i++) {
      foodParts = this._parts[i].toJson();
    }
    return {
      "name": this._name,
      "menuPrice": this._menuPrice,
      "foodParts": foodParts
    };
  }

});

module.exports = Food;