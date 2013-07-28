(function(name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else this[name] = definition();
}('NumberFormatter', function() {
  NumberFormatter = {};

  function getPrefix(e) {
    switch(e) {
      case 0: return "";
      case 3: return "k";
      case 6: return "M";
      case 9: return "G";
      case 12: return "T";
      case 15: return "P";
      case 18: return "E";
      case 21: return "Z";
      case 24: return "Y";
    }
    if (e > 24) {
      return getPrefix(e-24) + "Y";
    }
    return "?";
  }

  NumberFormatter.format = function(value, e, sf, unit) {
    var v = value;
    v = v * Math.pow(10, (e % 3));
    e -= (e % 3);
    while (v < 1 && v > 0) {
      v *= 1000;
      e -= 3;
    }
    while (v >= 1000) {
      v /= 1000;
      e += 3;
    }
    var prefix = getPrefix(e);
    var decimals = sf - 1;
    if (v >= 10) decimals--;
    if (v >= 100) decimals--;
    if (decimals == -1) {
      v = Math.round(v / 10) * 10;
    } else if (decimals == -2) {
      v = Math.round(v / 100) * 100;
    }
    if (decimals < 0) decimals = 0;
    return v.toFixed(decimals) + " " + prefix + unit;
  };

  return NumberFormatter;
}));
