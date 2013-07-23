Crafty.c('System', {
  init: function() {
    this.requires('2D, Canvas, Color');
    this.color('white');
    this.attr({w: 3, h: 3})
  },

  at: function(p) {
    this.attr({x: 10 + p.distance / Game.max_range * Game.width, y: Game.height / 2})
  }
})