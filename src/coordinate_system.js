define([], function() {
  function CoordinateSystem(width, height, max_range, radius_scale) {
    this.width = width;
    this.height = height;
    this.max_range = max_range;
    this.radius_scale = 5;
    this.scale_factor = width / (2*max_range);
  }

  CoordinateSystem.prototype.x = function(o) {
    var x0 = this.width / 2
    var distance = o.coordinate.distance * this.scale_factor;
    var dx = Math.cos(o.coordinate.ra) * distance;
    return x0 + dx;
  }

  CoordinateSystem.prototype.y = function(o) {
    var y0 = this.height / 2
    var distance = o.coordinate.distance * this.scale_factor;
    var dy = Math.sin(o.coordinate.ra) * distance;
    return y0 + dy;
  }

  CoordinateSystem.prototype.radius = function(r) {
    return r * this.radius_scale;
  }

  return CoordinateSystem;
});
