var should = require('should');
var OpenHours = require('../openhours');
var MensaBuilder = require('../mensabuilder');
    
describe('MensaBuilder', function () {

  describe('.initialize', function () {

    it('should...', function () {
    });

  });

  describe('.build', function () {

    it('should build and return a proper mensa', function () {
      var builder = new MensaBuilder(1);
      var mensa = builder.build();
      should(mensa).be.ok;
      var name = mensa.getName();
      should(name).be.ok;
      var type = mensa.getType();
      should(type).be.ok;
      name.should.equal("Tarforst");
      type.should.equal("Uni");
    });

    it('should build and return a mensa with open hours', function () {
      var testOpenHours = new OpenHours(
        "Mo-Do 11:15 Uhr bis 14:15 Uhr, Fr 11:30 Uhr bis 13:30 Uhr",
        "Mo-Do 11:30 Uhr bis 13:45 Uhr, Fr 11:30 Uhr bis 13:30 Uhr"
        );
      var builder = new MensaBuilder(1);
      var mensa = builder
        .addNormalOpenHours("Mo-Do 11:15 Uhr bis 14:15 Uhr, Fr 11:30 Uhr bis 13:30 Uhr")
        .addHolidayOpenHours("Mo-Do 11:30 Uhr bis 13:45 Uhr, Fr 11:30 Uhr bis 13:30 Uhr")
        .build();
      should(mensa).be.ok;
      var openHours = mensa.getOpenHours();
      should(openHours).be.ok;
      openHours.toJson().should.eql(testOpenHours.toJson());
    });

  });

});
