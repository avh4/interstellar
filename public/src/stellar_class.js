define([], function() {
  function StellarClass(string) {
    this.cl = string[0];
  }

  StellarClass.prototype.color = function() {
    switch(this.cl) {
      case "O": return '#9bb0ff'; // blue
      case "B": return '#bbccff'; // blue-white
      case "A": return '#f8f7ff'; // white
      case "F": return '#fcf4d8'; // yellow-white
      case "G": return '#fff2a1'; // yellow
      case "K": return '#ffe46f'; // orange
      case "M": return '#ffa040'; // red
      case "L": return '#ff6060'; // red-brown
      case "T": return '#ff4080'; // brown
      case "Y": return '#9366B4'; // dark brown
      case "D": return '#F0F0F0'; // white dwarf
    }
    return "#444444";
  }

  StellarClass.prototype.radius = function() {
    switch(this.cl) {
      case "O": return 6.6;
      case "B": return 1.8;
      case "A": return 1.4;
      case "F": return 1.15;
      case "G": return 0.96;
      case "K": return 0.7;
      case "M": return 0.6; // estimate
      case "L": return 0.5; // estimate
      case "T": return 0.4; // estimate
      case "Y": return 0.3; // estimate
      case "D": return 0.1; // estimate
    }
  }

  return StellarClass;
});
