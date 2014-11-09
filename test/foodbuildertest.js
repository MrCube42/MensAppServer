var should = require('should');
var OpenHours = require('../openhours');
var FoodBuilder = require('../foodbuilder');
    
describe('FoodBuilder', function () {

  describe('.build', function () {

    it('should build and return a mensa with priced food', function() {
      var builder = new FoodBuilder();
      builder
        .addFoodPart("Tagessuppe")
        .setStudentPrice("0.42")
        .setEmployeePrice("1.00")
        .setGuestPrice("0.99");
      builder
        .addFoodPart("Rindfleischsauce")
        .setStudentPrice("0.01")
        .setEmployeePrice("0.02")
        .setGuestPrice("0.03");
      var food = builder.build();
      var json = food.toJson();
      should(json).be.ok;
      json.should.eql({
        "name": null,
        "menuPrice": null,
        "foodParts": [
          {
            "food": "Tagessuppe",
            "price": {
              "student": "0.42",
              "employee": "1.00",
              "guest": "0.99"
            }
          },
          {
            "food": "Rindfleischsauce",
            "price": {
              "student": "0.01",
              "employee": "0.02",
              "guest": "0.03"
            }
          }
        ]
      });
    });

  });

});
