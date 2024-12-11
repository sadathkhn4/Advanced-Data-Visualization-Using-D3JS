// https://observablehq.com/@sarah37/snapping-range-slider-with-d3-brush@290
function _1(md){return(
md`# Range Sliders with d3.brush

There are two different ones - a simpler one, and one that snaps to integer values. 
The *view* is updated while the brush is being dragged, but it can easily be changed to only update after dragging stops, e.g. if complex calculations follow.

Thanks to [@nitaku](/@nitaku) for adding the option to specify a custom starting range!`
)}

function _2(md){return(
md`
## No Snapping
`
)}

function _myslider(slider){return(
slider(0, 25)
)}

function _4(myslider){return(
myslider
)}

function _5(md){return(
md`You can also specify a custom starting range:`
)}

function _myslider2(slider){return(
slider(0, 25, 10, 20)
)}

function _myslider3(slider){return(
slider(0, 25, undefined, 15)
)}

function _8(md){return(
md`
## With Snapping
This is a range slider that snaps to integer values. I'm using it for years here, but any integer values will work.
`
)}

function _mysnapslider(slider_snap){return(
slider_snap(1990, 2015)
)}

function _10(mysnapslider){return(
mysnapslider
)}

function _11(md){return(
md`As described above, you can also specify a custom starting range:`
)}

function _mysnapslider2(slider_snap){return(
slider_snap(1990, 2015, 1995, 2000)
)}

function _mysnapslider3(slider_snap){return(
slider_snap(1990, 2015, undefined, 1997)
)}

function _14(md){return(
md`
## Using them outside of Observable

A neat trick I've found is to place a div with id \`\`#eventhandler\`\` (or something else) somewhere on the page (can be \`\`display:none\`\`). In the slider code, the line 
\`\`\`svg.node().dispatchEvent(new CustomEvent("input"));\`\`\` 

should be replaced by the following two lines:

\`\`\`let event = new Event("change");
eventHandler.dispatchEvent(event);\`\`\`

This will trigger a change event on the \`\`#eventhandler\`\` div, which can be tracked with d3 just like regular HTML inputs can:
\`\`\`d3.select('#eventhandler').on('change', function() { // do something })\`\`\`

Lastly, to be able to get the values, add the following at the bottom of the slider function:

\`\`\`var getRange = function() {
		var range = d3.brushSelection(gBrush.node()).map(d => Math.round(x.invert(d)))
		return range
}\`\`\`

\`\`\`return {getRange: getRange}\`\`\`

Then, \`\`myslider.getRange()\`\` will always return the currently selected range.
`
)}

function _15(md){return(
md`### Slider functions`
)}

function _slider(layout,d3,DOM){return(
function(min, max, starting_min=min, starting_max=max) {

  var range = [min, max]
  var starting_range = [starting_min, starting_max]

  // set width and height of svg
  var w = layout.width
  var h = layout.height
  var margin = layout.margin

  // dimensions of slider bar
  var width = w - margin.left - margin.right;
  var height = h - margin.top - margin.bottom;

  // create x scale
  var x = d3.scaleLinear()
    .domain(range)  // data space
    .range([0, width]);  // display space
  
  // create svg and translated g
  var svg = d3.select(DOM.svg(w,h))
  const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)
  
  // labels
  var labelL = g.append('text')
    .attr('id', 'labelleft')
    .attr('x', 0)
    .attr('y', height + 5)

  var labelR = g.append('text')
    .attr('id', 'labelright')
    .attr('x', 0)
    .attr('y', height + 5)

  // define brush
  var brush = d3.brushX()
    .extent([[0,0], [width, height]])
    .on('brush', function() {
      var s = d3.event.selection;
      // update and move labels
      labelL.attr('x', s[0])
        .text((x.invert(s[0]).toFixed(2)))
      labelR.attr('x', s[1])
        .text((x.invert(s[1]).toFixed(2)))
      // move brush handles      
      handle.attr("display", null).attr("transform", function(d, i) { return "translate(" + [ s[i], - height / 4] + ")"; });
      // update view
      // if the view should only be updated after brushing is over, 
      // move these two lines into the on('end') part below
      svg.node().value = s.map(function(d) {var temp = x.invert(d); return +temp.toFixed(2)});
      svg.node().dispatchEvent(new CustomEvent("input"));
    })

  // append brush to g
  var gBrush = g.append("g")
      .attr("class", "brush")
      .call(brush)

  // add brush handles (from https://bl.ocks.org/Fil/2d43867ba1f36a05459c7113c7f6f98a)
  var brushResizePath = function(d) {
      var e = +(d.type == "e"),
          x = e ? 1 : -1,
          y = height / 2;
      return "M" + (.5 * x) + "," + y + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6) + "V" + (2 * y - 6) +
        "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y) + "Z" + "M" + (2.5 * x) + "," + (y + 8) + "V" + (2 * y - 8) +
        "M" + (4.5 * x) + "," + (y + 8) + "V" + (2 * y - 8);
  }

  var handle = gBrush.selectAll(".handle--custom")
    .data([{type: "w"}, {type: "e"}])
    .enter().append("path")
    .attr("class", "handle--custom")
    .attr("stroke", "#000")
    .attr("fill", '#eee')
    .attr("cursor", "ew-resize")
    .attr("d", brushResizePath);
    
  // override default behaviour - clicking outside of the selected area 
  // will select a small piece there rather than deselecting everything
  // https://bl.ocks.org/mbostock/6498000
  gBrush.selectAll(".overlay")
    .each(function(d) { d.type = "selection"; })
    .on("mousedown touchstart", brushcentered)
  
  function brushcentered() {
    var dx = x(1) - x(0), // Use a fixed width when recentering.
    cx = d3.mouse(this)[0],
    x0 = cx - dx / 2,
    x1 = cx + dx / 2;
    d3.select(this.parentNode).call(brush.move, x1 > width ? [width - dx, width] : x0 < 0 ? [0, dx] : [x0, x1]);
  }
  
  // select entire range
  gBrush.call(brush.move, starting_range.map(x))
  
  return svg.node()
}
)}

function _slider_snap(layout,d3,DOM){return(
function(min, max, starting_min=min, starting_max=max) {

  var range = [min, max + 1]
  var starting_range = [starting_min, starting_max + 1]

  // set width and height of svg
  var w = layout.width
  var h = layout.height
  var margin = layout.margin

  // dimensions of slider bar
  var width = w - margin.left - margin.right;
  var height = h - margin.top - margin.bottom;

  // create x scale
  var x = d3.scaleLinear()
    .domain(range)  // data space
    .range([0, width]);  // display space
  
  // create svg and translated g
  var svg = d3.select(DOM.svg(w,h))
  const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)
  
  // draw background lines
  g.append('g').selectAll('line')
    .data(d3.range(range[0], range[1]+1))
    .enter()
    .append('line')
    .attr('x1', d => x(d)).attr('x2', d => x(d))
    .attr('y1', 0).attr('y2', height)
    .style('stroke', '#ccc')
  
  // labels
  var labelL = g.append('text')
    .attr('id', 'labelleft')
    .attr('x', 0)
    .attr('y', height + 5)
    .text(range[0])

  var labelR = g.append('text')
    .attr('id', 'labelright')
    .attr('x', 0)
    .attr('y', height + 5)
    .text(range[1])

  // define brush
  var brush = d3.brushX()
    .extent([[0,0], [width, height]])
    .on('brush', function() {
      var s = d3.event.selection;
      // update and move labels
      labelL.attr('x', s[0])
        .text(Math.round(x.invert(s[0])))
      labelR.attr('x', s[1])
        .text(Math.round(x.invert(s[1])) - 1)
      // move brush handles      
      handle.attr("display", null).attr("transform", function(d, i) { return "translate(" + [ s[i], - height / 4] + ")"; });
      // update view
      // if the view should only be updated after brushing is over, 
      // move these two lines into the on('end') part below
      svg.node().value = s.map(d => Math.round(x.invert(d)));
      svg.node().dispatchEvent(new CustomEvent("input"));
    })
    .on('end', function() {
      if (!d3.event.sourceEvent) return;
      var d0 = d3.event.selection.map(x.invert);
      var d1 = d0.map(Math.round)
      d3.select(this).transition().call(d3.event.target.move, d1.map(x))
    })

  // append brush to g
  var gBrush = g.append("g")
      .attr("class", "brush")
      .call(brush)

  // add brush handles (from https://bl.ocks.org/Fil/2d43867ba1f36a05459c7113c7f6f98a)
  var brushResizePath = function(d) {
      var e = +(d.type == "e"),
          x = e ? 1 : -1,
          y = height / 2;
      return "M" + (.5 * x) + "," + y + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6) + "V" + (2 * y - 6) +
        "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y) + "Z" + "M" + (2.5 * x) + "," + (y + 8) + "V" + (2 * y - 8) +
        "M" + (4.5 * x) + "," + (y + 8) + "V" + (2 * y - 8);
  }

  var handle = gBrush.selectAll(".handle--custom")
    .data([{type: "w"}, {type: "e"}])
    .enter().append("path")
    .attr("class", "handle--custom")
    .attr("stroke", "#000")
    .attr("fill", '#eee')
    .attr("cursor", "ew-resize")
    .attr("d", brushResizePath);
    
  // override default behaviour - clicking outside of the selected area 
  // will select a small piece there rather than deselecting everything
  // https://bl.ocks.org/mbostock/6498000
  gBrush.selectAll(".overlay")
    .each(function(d) { d.type = "selection"; })
    .on("mousedown touchstart", brushcentered)
  
  function brushcentered() {
    var dx = x(1) - x(0), // Use a fixed width when recentering.
    cx = d3.mouse(this)[0],
    x0 = cx - dx / 2,
    x1 = cx + dx / 2;
    d3.select(this.parentNode).call(brush.move, x1 > width ? [width - dx, width] : x0 < 0 ? [0, dx] : [x0, x1]);
  }
  
  // select entire starting range
  gBrush.call(brush.move, starting_range.map(x))
  
  return svg.node()
}
)}

function _layout(){return(
{
  width: 400,
  height: 300,
  margin: {
    top: 130,
    bottom: 135,
    left: 40,
    right: 40
  }
}
)}

function _19(md){return(
md`### CSS`
)}

function _20(html){return(
html`
<style>
svg {
	font-family: sans-serif;
}

rect.overlay {
	stroke: black;
}

rect.selection {
	stroke: none;
  fill: steelblue;
  fill-opacity: 0.6;
}

#labelleft, #labelright {
	dominant-baseline: hanging;
  font-size: 12px;
}

#labelleft {
	text-anchor: end;
}

#labelright {
	text-anchor: start;
}
</style>
`
)}

function _d3(require){return(
require('d3@5')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof myslider")).define("viewof myslider", ["slider"], _myslider);
  main.variable(observer("myslider")).define("myslider", ["Generators", "viewof myslider"], (G, _) => G.input(_));
  main.variable(observer()).define(["myslider"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof myslider2")).define("viewof myslider2", ["slider"], _myslider2);
  main.variable(observer("myslider2")).define("myslider2", ["Generators", "viewof myslider2"], (G, _) => G.input(_));
  main.variable(observer("viewof myslider3")).define("viewof myslider3", ["slider"], _myslider3);
  main.variable(observer("myslider3")).define("myslider3", ["Generators", "viewof myslider3"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof mysnapslider")).define("viewof mysnapslider", ["slider_snap"], _mysnapslider);
  main.variable(observer("mysnapslider")).define("mysnapslider", ["Generators", "viewof mysnapslider"], (G, _) => G.input(_));
  main.variable(observer()).define(["mysnapslider"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof mysnapslider2")).define("viewof mysnapslider2", ["slider_snap"], _mysnapslider2);
  main.variable(observer("mysnapslider2")).define("mysnapslider2", ["Generators", "viewof mysnapslider2"], (G, _) => G.input(_));
  main.variable(observer("viewof mysnapslider3")).define("viewof mysnapslider3", ["slider_snap"], _mysnapslider3);
  main.variable(observer("mysnapslider3")).define("mysnapslider3", ["Generators", "viewof mysnapslider3"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("slider")).define("slider", ["layout","d3","DOM"], _slider);
  main.variable(observer("slider_snap")).define("slider_snap", ["layout","d3","DOM"], _slider_snap);
  main.variable(observer("layout")).define("layout", _layout);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["html"], _20);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
