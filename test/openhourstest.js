var should = require('should');
var OpenHours = require('../openhours');

describe('OpenHours', function () {

  describe('.initialize(rawOpenHours, rawHolidayOpenHours), .getNormalOpenHours() and .getHolidayOpenHours()', function () {

    it('should initialize both open hours if both are given', function () {
      var normalOpenHoursInput = "Mo-Do 11:15 Uhr bis 14:15 Uhr, Fr 11:30 Uhr bis 13:30 Uhr";
      var holidayOpenHoursInput = "Mo-Do 11:30 Uhr bis 13:45 Uhr, Fr 11:30 Uhr bis 13:30 Uhr";
      var openHours = new OpenHours(normalOpenHoursInput, holidayOpenHoursInput);
      var normal = openHours.getNormalOpenHours();
      var holiday = openHours.getHolidayOpenHours();
      normal.should.be.ok;
      holiday.should.be.ok;
      openHours.hasHolidayOpenHours().should.be.true;
    });

    it('should initialize the just normal open hours if holiday missing', function () {
      var normalOpenHoursInput = "Mo-Do 11:15 Uhr bis 14:15 Uhr, Fr 11:30 Uhr bis 13:30 Uhr";
      var openHours = new OpenHours(normalOpenHoursInput);
      var normal = openHours.getNormalOpenHours();
      var holiday = openHours.getHolidayOpenHours();
      normal.should.be.ok;
      should(holiday).not.be.ok;
      openHours.hasHolidayOpenHours().should.be.false;
    });

    it('should throw argument exception if normal open hours are missing', function () {
      (function () {
        new OpenHours();
      }).should.throw("ArgumentNullException: First argument rawOpenHours");
    });

    it('should parse normal open hours properly', function () {
      var openHours = new OpenHours("Mo-Do 11:15 Uhr bis 14:15 Uhr, Fr 11:30 Uhr bis 13:30 Uhr");
      var normal = openHours.getNormalOpenHours();
      normal.length.should.equal(2);
      normal[0].should.equal("Mo-Do 11:15 Uhr bis 14:15 Uhr");
      normal[1].should.equal("Fr 11:30 Uhr bis 13:30 Uhr");
      normal.should.eql(["Mo-Do 11:15 Uhr bis 14:15 Uhr", "Fr 11:30 Uhr bis 13:30 Uhr"]);
    });

    it('should parse normal open hours and holiday open hours properly', function () {
      var openHours = new OpenHours(
        "Mo-Do 11:15 Uhr bis 14:15 Uhr, Fr 11:30 Uhr bis 13:30 Uhr",
        "Mo-Do 11:30 Uhr bis 13:45 Uhr, Fr 11:30 Uhr bis 13:30 Uhr"
        );
      var holiday = openHours.getHolidayOpenHours();
      holiday.length.should.equal(2);
      holiday[0].should.equal("Mo-Do 11:30 Uhr bis 13:45 Uhr");
      holiday[1].should.equal("Fr 11:30 Uhr bis 13:30 Uhr");
      holiday.should.eql(["Mo-Do 11:30 Uhr bis 13:45 Uhr", "Fr 11:30 Uhr bis 13:30 Uhr"]);
    });
  });

  describe('.toJson()', function () {

    it('should return a full fledged JSON object', function () {
      var openHours = new OpenHours(
        "Mo-Do 11:15 Uhr bis 14:15 Uhr, Fr 11:30 Uhr bis 13:30 Uhr",
        "Mo-Do 11:30 Uhr bis 13:45 Uhr, Fr 11:30 Uhr bis 13:30 Uhr"
      );
      openHours.toJson().should.eql({
        "normal": ["Mo-Do 11:15 Uhr bis 14:15 Uhr", "Fr 11:30 Uhr bis 13:30 Uhr"],
        "holiday": ["Mo-Do 11:30 Uhr bis 13:45 Uhr", "Fr 11:30 Uhr bis 13:30 Uhr"],
      });

    });

  });
});