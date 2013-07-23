Crafty.c('System', {
  init: function() {
    this.requires('2D, Canvas, Color');
    this.color('white');
    this.attr({w: 3, h: 3})
  },

  from: function(system) {
    this.at(system.p)
    switch(system.cl) {
      case "A": this.color('#f8f7ff'); break;
      case "D": this.color('#F0F0F0'); break;
      case "F": this.color('#fcf4d8'); break;
      case "G": this.color('#fff2a1'); break;
      case "K": this.color('#ffe46f'); break;
      case "L": this.color('#ff6060'); break;
      case "M": this.color('#ffa040'); break;
      case "T": this.color('#ff4080'); break;
      case "Y": this.color('#9366B4'); break;
    }
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