var should = require('should');
var Price = require('../price');
var FoodPart = require('../foodpart');

describe('FoodPart', function () {

  var testPrice = null;
  beforeEach(function(){
    testPrice = new Price("0.42", "1.00", "0.99");
    should(testPrice).be.ok;
  })

  describe('.initialize(food, price)', function () {

    it('should initialize both food and price if given', function () {
      var foodPart = new FoodPart("Tagessuppe", testPrice);
      should(foodPart).be.ok;
      var food = foodPart.getFood();
      should(food).be.ok;
      var price = foodPart.getPrice();
      should(price).be.ok;
      foodPart.getFood().should.equal("Tagessuppe");
      foodPart.getPrice().should.equal(testPrice);
      foodPart.getPrice().getStudentPrice().should.equal("0.42");
    });

  });

  describe('.toJson()', function () {

    it('should return a full fledged JSON object', function () {
      var foodPart = new FoodPart("Tagessuppe", testPrice);
      should(foodPart).be.ok;
      foodPart.toJson().should.eql({
        "food": "Tagessuppe",
        "price": {
          "student": "0.42",
          "employee": "1.00",
          "guest": "0.99"
        }
      });
    });

  });

});