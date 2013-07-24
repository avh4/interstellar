define(["stellar_class"], function(StellarClass) {
  function System(name, classString, coordinate, planets) {
    this.name = name;
    var cl = new StellarClass(classString);
    this.coordinate = coordinate;
    this.color = cl.color();
    this.radius = cl.radius();
  };

  return System;
})
