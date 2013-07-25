define([], function() {
  function hmsToRadians(array) {
    return array[0] * Math.PI / 12;
  }

  function Coordinate(right_ascension, declination, distance) {
    this.ra = hmsToRadians(right_ascension);
    this.distance = distance;
  };

  return Coordinate;
});
