var should = require('should');
var Price = require('../price');
var FoodPart = require('../foodpart');
var Food = require('../food');

describe('Food', function () {

  describe('.initialize', function () {

    it('should return food without description and menuprice', function (){
      var food = new Food();
      should(food).be.ok;
      food.hasDescription().should.be.false;
      food.hasMenuPrice().should.be.false;
      var parts = food.getFoodParts();
      should(parts).should.be.ok;
      parts.length.should.equal(0);
    });

    it('should return food with description if given', function () {
      var food = new Food("test");
      should(food).be.ok;
      food.hasDescription().should.be.true;
      var description = food.getDescription();
      should(description).be.ok;
      description.should.equal("test");
      food.hasMenuPrice().should.be.false;
      var parts = food.getFoodParts();
      should(parts).should.be.ok;
      parts.length.should.equal(0);
    });

  });

  describe('.setMenuPrice', function() {

    it('should return a the student price if set', function () {
      var food = new Food();
      food.setMenuPrice(new Price("0.42"));
      food.hasMenuPrice().should.be.true;
      var menuPrice = food.getMenuPrice();
      should(menuPrice).be.ok;
      menuPrice.getStudentPrice().should.equal("0.42");
    });

  });

});