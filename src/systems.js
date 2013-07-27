var System = require('./system');

var MS = 1;
var MJ = 0.0009546 * MS;

module.exports = function() {
  return [
  new System("Solar System",    "G", [ 0,  0,  0], 0,  0     ,     0, 1    , 8),
  new System("Alpha Centauri",  "G", [14, 29, 43], 0,  4.2421, -3678, 2.130, 1),
  new System("Barnard's Star",  "M", [17, 57, 49], 0,  5.9630,  -798, 0.144, 0),
  new System("WISE 1049-5319",  "L", [10, 49, 16], 0,  6.52  , -2759, 70*MJ, 0),
  new System("Wolf 359",        "M", [10, 56, 29], 0,  7.7825, -3842, 0.09 , 0),
  new System("Lalande 21185",   "M", [11,  3, 20], 0,  8.2905,  -580, 0.46 , (1)),
  new System("Sirius",          "A", [ 6, 45,  9], 0,  8.5828,  -546, 2.998, 0),
  new System("Luyten 726-8",    "M", [ 1, 39,  1], 0,  8.7280,  3321, 0.202, (2)),
  new System("Ross 154",        "M", [18, 49, 49], 0,  9.6813,   637, 0.17 , 0),
  new System("Ross 248",        "M", [23, 41, 55], 0, 10.322 ,   111, 0.136, 0),
  new System("WISE 1506+7027",  "T", [15,  6, 50], 0, 10.521 , -1241, 40*MJ, 0),
  new System("Epsilon Eridani", "K", [ 3, 32, 56], 0, 10.522 ,  -975, 0.82 , 2),
  new System("Lacaille 9352",   "M", [23,  5, 52], 0, 10.742 ,  6768, 0.503, 0),
  new System("Ross 128",        "M", [11, 47, 44], 0, 10.919 ,   605, 0.15 , 0),
  new System("WISE 0350-5658",  "Y", [ 3, 50,  0], 0, 11.208 ,  -125, 10*MJ, 0),
  new System("EZ Aquarii",      "M", [22, 38, 33], 0, 11.266 ,  2314, 0.32 , 0),
]}