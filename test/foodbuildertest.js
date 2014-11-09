var should = require('should');
var OpenHours = require('../openhours');
var FoodBuilder = require('../foodbuilder');
    
describe('FoodBuilder', function () {

  describe('.initialize', function () {

    it('should...', function () {
    });

  });

  describe('.build', function () {

    // it('should build and return a proper mensa', function () {
    //   var builder = new MensaBuilder(1);
    //   var mensa = builder.build();
    //   should(mensa).be.ok;
    //   var name = mensa.getName();
    //   should(name).be.ok;
    //   var type = mensa.getType();
    //   should(type).be.ok;
    //   name.should.equal("Tarforst");
    //   type.should.equal("Uni");
    // });

    // it('should build and return a mensa with open hours', function () {
    //   var testOpenHours = new OpenHours(
    //     "Mo-Do 11:15 Uhr bis 14:15 Uhr, Fr 11:30 Uhr bis 13:30 Uhr",
    //     "Mo-Do 11:30 Uhr bis 13:45 Uhr, Fr 11:30 Uhr bis 13:30 Uhr"
    //     );
    //   var builder = new MensaBuilder(1);
    //   var mensa = builder
    //     .addNormalOpenHours("Mo-Do 11:15 Uhr bis 14:15 Uhr, Fr 11:30 Uhr bis 13:30 Uhr")
    //     .addHolidayOpenHours("Mo-Do 11:30 Uhr bis 13:45 Uhr, Fr 11:30 Uhr bis 13:30 Uhr")
    //     .build();
    //   should(mensa).be.ok;
    //   var openHours = mensa.getOpenHours();
    //   should(openHours).be.ok;
    //   openHours.toJson().should.eql(testOpenHours.toJson());
    // });

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
