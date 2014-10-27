var dejavu = require('dejavu');

var Price = dejavu.Class.declare({
  $name: "Price",

  _studentPrice: null,
  _employeePrice: null,
  _guestPrice: null,

  initialize: function (student, employee, guest) {
    this._studentPrice = student;
    this._employeePrice = employee;
    this._guestPrice = guest;
  },

  addStudentPrice: function (price) {
    this._studentPrice = price;
  },

  addEmployeePrice: function (price) {
    this._employeePrice = price;
  },

  addGuestPrice: function (price) {
    this._guestPrice = price;
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