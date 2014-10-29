var dejavu = require('dejavu');

var Price = dejavu.Class.declare({
  $name: "Price",

  _studentPrice: null,
  _employeePrice: null,
  _guestPrice: null,

  initialize: function (student, employee, guest) {
    if(!student) {
      throw new Error("ArgumentNullException: First argument studentPrice");
    }
    this._studentPrice = student;
    this._employeePrice = employee;
    this._guestPrice = guest;
  },

  getStudentPrice: function (price) {
    return this._studentPrice;
  },

  getEmployeePrice: function (price) {
    return this._employeePrice;
  },

  getGuestPrice: function (price) {
    return this._guestPrice;
  },

  toJson: function () {
    return {
      "student": this._studentPrice,
      "employee": this._employeePrice,
      "guest": this._guestPrice
    };
  }

});

module.exports = Price;