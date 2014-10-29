var should = require('should');
var Price = require('../price');

describe('Price', function () {

  describe('.initialize(student, employee, guest)', function () {

    it('should initialize properly if all arguments are given', function () {
      var price = new Price("0.42", "1.00", "0.99");
      var studentPrice = price.getStudentPrice();
      should(studentPrice).be.ok;
      studentPrice.should.equal("0.42");
      var employeePrice = price.getEmployeePrice();
      should(employeePrice).be.ok;
      employeePrice.should.equal("1.00");
      var guestPrice = price.getGuestPrice();
      should(guestPrice).be.ok;
      guestPrice.should.equal("0.99");
    });

    it('should initialize the student price if other prices are missing', function () {
      var price = new Price("0.42");
      price.getStudentPrice().should.equal("0.42");
      should(price.getEmployeePrice()).not.be.ok;
      should(price.getGuestPrice()).not.be.ok;
    });

    it('should throw an ArgumentNullException if not at least studentprice is given', function() {
      (function () {
        new Price();
      }).should.throw("ArgumentNullException: First argument studentPrice");
    });

  });

  describe('.toJson()', function () {

    it('should return a full fledged JSON object', function () {
      var price = new Price("0.42", "1.00", "0.99");
      price.toJson().should.eql({
        "student": "0.42",
        "employee": "1.00",
        "guest": "0.99"
      });
    });

  });

});