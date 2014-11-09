var dejavu = require('dejavu');

var OpenHours = require('./openhours');
var Price = require('./price');
var FoodPart = require('./foodpart');
var Food = require('./food');
var Mensa = require('./mensa');

var FoodBuilder = dejavu.Class.declare({
  $name: "FoodBuilder",

  _foodPart: [],
  _studentPrice: [],
  _employeePrice: [],
  _guestPrice: [],
  _currentFoodPartIndex: -1,

  initialize: function () {
  },

  addFoodPart: function (foodPartDescription) {
    this._foodPart[++this._currentFoodPartIndex] = foodPartDescription;
    return this;
  },

  setStudentPrice: function (price) {
    this._studentPrice[this._currentFoodPartIndex] = price;
    return this;
  },

  setEmployeePrice: function (price) {
    this._employeePrice[this._currentFoodPartIndex] = price;
    return this;
  },

  setGuestPrice: function (price) {
    this._guestPrice[this._currentFoodPartIndex] = price;
    return this;
  },

  build: function () {
    var i;
    var part;
    var food = new Food();
    for (i = 0; i <= this._currentFoodPartIndex; i++) {
      part = new FoodPart(
        this._foodPart[i],
        new Price(
          this._studentPrice[i],
          this._employeePrice[i],
          this._guestPrice[i]
        )
      );
      food.addFoodPart(part);
    }
    return food;
  }

});

module.exports = FoodBuilder;