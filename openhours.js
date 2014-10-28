var dejavu = require('dejavu');

// OpenHours Class
var OpenHours = dejavu.Class.declare({
  $name: "OpenHours",

  _normal : null,
  _holiday : null,

  initialize: function (rawOpenHours, rawHolidayOpenHours) {
    if (!rawOpenHours) {
      throw new Error("ArgumentNullException: First argument rawOpenHours");
    }
    this._normal = this._parseOpenHours(rawOpenHours);
    if (rawHolidayOpenHours) {
      this._holiday = this._parseOpenHours(rawHolidayOpenHours);
    }
  },

  getNormalOpenHours: function () {
    return this._normal;
  },

  getHolidayOpenHours: function () {
    return this._holiday;
  },

  hasHolidayOpenHours: function () {
    return (this._holiday !== null);
  },

  _parseOpenHours: function (openHours) {
    var result = [];
    var entries = openHours.split(",");
    var i;
    for (i = 0; i < entries.length; i++) {
      result.push(entries[i].trim());
    }
    return result;
  },

  toJson: function () {
    return {
      "normal": this._normal,
      "holiday": this._holiday
    };
  }

});

module.exports = OpenHours;