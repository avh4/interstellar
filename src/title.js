define([], function() {
  function Title() {

  }

  Title.prototype.start = function(paper, container) {
    var width = paper.width;
    var height = paper.height;
    var bg = paper.image("PIA17171.jpg", 0, 0, width, width / 838 * 958);
    bg.attr({"clip-rect": "0 0 800 600", transform: "t0,-160"});

    var t = paper.text(40, 500, "Interstellar").attr({fill: "white", font: "50px serif", "text-anchor": "start"});

    var button = paper.rect(500, 475, 200, 50, 15)
      .attr({fill: "#7f7f7f", "fill-opacity": .5, "stroke-width": 3});

    paper.text(button.attrs.x + button.attrs.width/2,
      button.attrs.y + button.attrs.height/2, "Start").attr({font: "30px serif"});

    button.node.onmouseover = function () {
      button.attr({fill: "white", "fill-opacity": 1});
    };
    button.node.onmouseout = function () {
      button.attr({fill: "#7f7f7f", "fill-opacity": .5});
    };
    button.node.onclick = function() {
      container.switchTo("game");
    }
  }

  return Title;
})