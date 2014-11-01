var should = require('should');
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

  });

});
