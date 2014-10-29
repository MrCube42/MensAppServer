var dejavu = require('dejavu');

var FoodPart = dejavu.Class.declare({
  $name: "FoodPart",

  _food: null,
  _price: null,

  initialize: function (food, price) {
    this._food = food;
    this._price = price;
  },

  getFood: function () {
    return this._food;
  },

  getPrice: function () {
    return this._price;
  },

  toJson: function () {
    var priceJson = null;
    if (this._price) {
      priceJson = this._price.toJson();
    }
    return {
      "food": this._food,
      "price": priceJson
    };
  }

});

module.exports = FoodPart;