define(['number_formatter'], function(NumberFormatter) {
  function PercentageMenu(x, y, system) {
    var percentages = { travel: 0, planetaryMining: 0, stellarMining: 0 };
    Kinetic.Group.call(this);
    var menuSize = 100;
    this.add(new Kinetic.Circle({radius: menuSize/2, fill: "#333", opacity: 0.6}));
    this.add(new Kinetic.Circle({radius: menuSize/2, stroke: "#888"}));
    this.add(new Kinetic.Text({
      x: -menuSize/2, 
      y: -7 -15,
      width: menuSize,
      align: "center",
      fill: "white",
      text: system.name
    }));
    // this.add(new Kinetic.Text({
    //   x: -menuSize/2, 
    //   y: -7,
    //   width: menuSize,
    //   align: "center",
    //   fill: "grey",
    //   text: "mass: " + NumberFormatter.format(system.mass_g_e33, 33, 5, "g")
    // }));
    // this.add(new Kinetic.Text({
    //   x: -menuSize/2, 
    //   y: -7 +15,
    //   width: menuSize,
    //   align: "center",
    //   fill: "grey",
    //   text: "radiation: " + NumberFormatter.format(system.output_W_e26, 26, 3, "W")
    // }));
  }

  PercentageMenu.prototype = Object.create(Kinetic.Group.prototype);

  return PercentageMenu;
});
