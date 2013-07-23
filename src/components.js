Crafty.c('System', {
  init: function() {
    this.requires('2D, Canvas, Color');
    this.color('white');
    this.attr({w: 3, h: 3})
  },

  at: function(p) {
    var x0 = Game.width / 2
    var y0 = Game.height / 2
    var distance = p.distance * Game.width / (2*Game.max_range);
    var dx = Math.cos(p.ra) * distance;
    var dy = Math.sin(p.ra) * distance;
    this.attr({x: x0 + dx, y: y0 + dy})
  }
})