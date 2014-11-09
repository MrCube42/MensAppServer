var dejavu = require('dejavu');
var FoodPart = require('./foodpart.js');

var Food = dejavu.Class.declare({
  $name: "Food",

  _description: null,
  _menuPrice: null,

  _parts: null,

  initialize: function (description) {
    this._description = description;
    this._parts = [];
  },

  hasDescription: function () {
    return ((this._description !== null) && (this._description !== undefined));
  },

  getDescription: function () {
    return this._description;
  },

  hasMenuPrice: function () {
    return ((this._menuPrice !== null) && (this._menuPrice !== null));
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
    for (i = 0; i < this._parts.length; i++) {
      foodParts.push(this._parts[i].toJson());
    }
    return {
      "name": this._description,
      "menuPrice": this._menuPrice,
      "foodParts": foodParts
    };
  }

});

module.exports = Food;