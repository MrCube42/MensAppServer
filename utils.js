var startswith = function (string, substring) {
  var result = false;
  if (string) {
    result = string.lastIndexOf(substring, 0) === 0;
  }
  return result;
};

exports.startswith = startswith;