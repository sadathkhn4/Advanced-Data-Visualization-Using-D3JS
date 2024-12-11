import define1 from "./9a81be7abac02efa@290.js";
import define2 from "./64e74b1cb96692d4@386.js";

function _1(md){return(
md`# Word Movement between Clusters Over the Years`
)}

function _chart3(d3,startDate,endDate,grand,customChordLayout,stretchedChord,colors_arr,$0,$1,sliderUI)
{

  
    ////////////////////////////////////////////////////////////
    //////////////////////// Set-up ////////////////////////////
    ////////////////////////////////////////////////////////////
    
    const screenWidth = window.innerWidth; 
    const mobileScreen = screenWidth > 500 ? false : true;
    
    var margin = {left: 50, top: 10, right: 0, bottom: 10},
    	width = Math.min(screenWidth, 800) - margin.left - margin.right,
    	height = (mobileScreen ? 300 : Math.min(screenWidth, 800)*5/6) - margin.top - margin.bottom;
    			
    // var svg = d3.select("#chart").append("svg")
    // 			.attr("width", (width + margin.left + margin.right))
    // 			.attr("height", (height + margin.top + margin.bottom));
  
    const svg = d3.create("svg")
        .attr("width", (screenWidth))
        .attr("height", (height + margin.top + margin.bottom));
    			
    var wrapper = svg.append("g").attr("class", "chordWrapper")
    			.attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");;
    			
    var outerRadius = Math.min(width, height) /1.5 - (mobileScreen ? 80 : 100),
    	innerRadius = outerRadius * 0.95,
    	opacityDefault = 0.5, //default opacity of chords
    	opacityLow = 0.00; //hover opacity of those chords not hovered over
    	
    //How many pixels should the two halves be pulled apart
    var pullOutSize = (mobileScreen? 20 : 50)
    
    //////////////////////////////////////////////////////
    //////////////////// Titles on top ///////////////////
    //////////////////////////////////////////////////////
    
    var titleWrapper = svg.append("g").attr("class", "chordTitleWrapper"),
    	titleOffset = mobileScreen ? 15 : 40,
    	titleSeparate = mobileScreen ? 30 : 0;
    
    //Title	top left
    titleWrapper.append("rect")
      .attr("class", "title-background")
      .attr("x", (width/2 + margin.left - outerRadius - titleSeparate - 5 ))
      .attr("y", titleOffset - 20) // Adjust y position if necessary to cover the text fully
      .attr("width", 70) // Adjust width as needed
      .attr("height", 30) // Adjust height as needed
      .style("fill", "#00A1DE") // Set the background color
      .style("opacity", 0.30);
    titleWrapper.append("text")
    	.attr("class","title left")
    	.style("font-size", mobileScreen ? "12px" : "20px" )
    	.attr("x", (width/2 + margin.left - outerRadius - titleSeparate))
    	.attr("y", titleOffset)
    	.text(startDate);
    titleWrapper.append("line")
    	.attr("class","titleLine left")
    	.attr("x1", (width/2 + margin.left - outerRadius - titleSeparate)*0.6)
    	.attr("x2", (width/2 + margin.left - outerRadius - titleSeparate)*1.4)
    	.attr("y1", titleOffset+8)
    	.attr("y2", titleOffset+8);
    //Title	top right
    titleWrapper.append("rect")
      .attr("class", "title-background")
      .attr("x", (width/2 + margin.left + outerRadius + titleSeparate))
      .attr("y", titleOffset - 20) // Adjust y position if necessary to cover the text fully
      .attr("width", 70) // Adjust width as needed
      .attr("height", 30) // Adjust height as needed
      .style("fill", "#00A1DE") // Set the background color
      .style("opacity", 0.30);
    //Title top right
    titleWrapper.append("text")
    	.attr("class","title right")
    	.style("font-size", mobileScreen ? "12px" : "20px" )
    	.attr("x", (width/2 + margin.left + outerRadius + titleSeparate+5))
    	.attr("y", titleOffset)
    	.text(endDate);
    titleWrapper.append("line")
    	.attr("class","titleLine right")
    	.attr("x1", (width/2 + margin.left - outerRadius - titleSeparate)*0.6 + 2*(outerRadius + titleSeparate))
    	.attr("x2", (width/2 + margin.left - outerRadius - titleSeparate)*1.4 + 2*(outerRadius + titleSeparate))
    	.attr("y1", titleOffset+8)
    	.attr("y2", titleOffset+8);
    	
    ////////////////////////////////////////////////////////////
    /////////////////// Animated gradient //////////////////////
    ////////////////////////////////////////////////////////////

    var defs = wrapper.append("defs");
    var linearGradient = defs.append("linearGradient")
    	.attr("id","animatedGradient")
    	.attr("x1","0%")
    	.attr("y1","0%")
    	.attr("x2","100%")
    	.attr("y2","0")
    	.attr("spreadMethod", "reflect");
    
    linearGradient.append("animate")
    	.attr("attributeName","x1")
    	.attr("values","0%;100%")
    //	.attr("from","0%")
    //	.attr("to","100%")
    	.attr("dur","7s")
    	.attr("repeatCount","indefinite");
    
    linearGradient.append("animate")
    	.attr("attributeName","x2")
    	.attr("values","100%;200%")
    //	.attr("from","100%")
    //	.attr("to","200%")
    	.attr("dur","7s")
    	.attr("repeatCount","indefinite");
    
    linearGradient.append("stop")
    	.attr("offset","5%")
    	.attr("stop-color","#E8E8E8");
    linearGradient.append("stop")
    	.attr("offset","45%")
    	.attr("stop-color","#A3A3A3");
    linearGradient.append("stop")
    	.attr("offset","55%")
    	.attr("stop-color","#A3A3A3");
    linearGradient.append("stop")
    	.attr("offset","95%")
    	.attr("stop-color","#E8E8E8");
    	
    ////////////////////////////////////////////////////////////
    ////////////////////////// Data ////////////////////////////
    ////////////////////////////////////////////////////////////
    
    var Names = [
      "-1",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "",
      "-1",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      ""
    ];

    // const colors_arr = [
    //   "#FF5733", // Red
    //   "#FFC300", // Yellow
    //   "#33FF57", // Green
    //   "#3366FF", // Blue
    //   "#FF33E0", // Pink
    //   "#FF6F33", // Orange
    //   "#8B33FF", // Purple
    //   "#33FFC7", // Turquoise
    //   "#B533FF", // Violet
    //   "#FF3333", // Crimson
    //   "#33FF99", // Sea green
    //   "#FF33A6", // Fuchsia
    //   "#33FFEC", // Cyan
    //   "#7A33FF", // Indigo
    //   "#FFDD33", // Gold
    //   "#33FF61", // Spring green
    //   "#FF33C4", // Hot pink
    //   "#3366FF", // Cobalt
    //   "#FFA933", // Tangerine
    // ];

    //const colors_arr = d3.schemeTableau10;
    
    var respondents = 746, //Total number of respondents (i.e. the number that make up the total group
    	emptyPerc = 0.5, //What % of the circle should become empty
    	emptyStroke = Math.round(respondents*emptyPerc); 

    var matrix = grand;
    matrix[19][39]=emptyStroke;
    matrix[39][19]=emptyStroke;
    //Calculate how far the Chord Diagram needs to be rotated clockwise to make the dummy
    //invisible chord center vertically
    var offset = (2 * Math.PI) * (emptyStroke/(respondents + emptyStroke))/4;
    
    //Custom sort function of the chords to keep them in the original order
    var chord = customChordLayout() //d3.layout.chord()
    	.padding(.02)
    	.sortChords(d3.descending) //which chord should be shown on top when chords cross. Now the biggest chord is at the bottom
    	.matrix(matrix);
    
    var arc = d3.arc()
    	.innerRadius(innerRadius)
    	.outerRadius(outerRadius+5)
    	.startAngle(startAngle) //startAngle and endAngle now include the offset in degrees
    	.endAngle(endAngle);
    
    var path = stretchedChord() //Call the stretched chord function 
    	.radius(innerRadius)
    	.startAngle(startAngle)
    	.endAngle(endAngle)
    	.pullOutSize(pullOutSize);
  
    ////////////////////////////////////////////////////////////
    //////////////////// Draw outer Arcs ///////////////////////
    ////////////////////////////////////////////////////////////
    
    var g = wrapper.selectAll("g.group")
    	.data(chord.groups)
    	.enter().append("g")
    	.attr("class", "group")
    	.on("mouseout", fade(opacityDefault))
      .on("mouseover", fade(opacityLow));
    
    g.append("path")
    	.style("stroke", function(d,i) { return (Names[i] === "" ? "none" : "#00A1DE"); })
    	.style("fill", function(d,i) { return (Names[i] === "" ? "none" : "#00A1DE"); })
    	.style("pointer-events", function(d,i) { return (Names[i] === "" ? "none" : "auto"); })
    	.attr("d", arc)
    	.attr("transform", function(d, i) { //Pull the two slices apart
    				d.pullOutSize = pullOutSize * ( d.startAngle + 0.001 > Math.PI ? -1 : 1);
    				return "translate(" + d.pullOutSize + ',' + 0 + ")";
    	});
    
    ////////////////////////////////////////////////////////////
    ////////////////////// Append Names ////////////////////////
    ////////////////////////////////////////////////////////////
    
    //The text also needs to be displaced in the horizontal directions
    //And also rotated with the offset in the clockwise direction
    g.append("text")
    	.each(function(d) { d.angle = ((d.startAngle + d.endAngle) / 2) + offset;})
    	.attr("dy", ".35em")
    	.attr("class", "titles")
    	.style("font-size", mobileScreen ? "8px" : "10px" )
    	.attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
    	.attr("transform", function(d,i) { 
    		var c = arc.centroid(d);
    		return "translate(" + (c[0] + d.pullOutSize) + "," + c[1] + ")"
    		+ "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
    		+ "translate(" + 20 + ",0)"
    		+ (d.angle > Math.PI ? "rotate(180)" : "")
    	})
      .text(function(d,i) { return Names[i]; })
      .call(wrapChord, 100);
    
    ////////////////////////////////////////////////////////////
    //////////////////// Draw inner chords /////////////////////
    ////////////////////////////////////////////////////////////
     
    wrapper.selectAll("path.chord")
    	.data(chord.chords)
    	.enter().append("path")
    	.attr("class", "chord")
    	.style("stroke", "none")
    	// .style("fill", "url(#animatedGradient)") //An SVG Gradient to give the impression of a flow from left to right
    	.style("fill", function(d) { return colors_arr[(d.target.index > 19) ? d.target.index - 20 : d.target.index]; })
      .style("opacity", function(d) { return (Names[d.source.index] === "" ? 0 : opacityDefault); }) //Make the dummy strokes have a zero opacity (invisible)
    	.style("pointer-events", function(d,i) { return (Names[d.source.index] === "" ? "none" : "auto"); }) //Remove pointer events from dummy strokes
    	.attr("d", path)
      // .on ("mouseover", hoverChord('darkorange'))
      // .on("mouseout", hoverChord('reset'));

  
      //.on ("mouseout", )
    	// .on("mouseover", fadeOnChord())
    	// .on("mouseout", fade(opacityDefault));	

    function hoverChord(t){
      return function(e, r){

        let selected_chord = wrapper.selectAll("path.chord").filter(function(t) { //hover chord group functionality
              return r.source.index === t.source.index && r.target.index === t.target.index && Names[t.source.index] !== "";
          }).transition("fadeOnArc");
        if (t == "reset") {
          // selected_chord.attr("style", "fill: url(#animatedGradient); opacity:" + opacityDefault + ";" );
          selected_chord.attr("style", "fill:" + colors_arr[(r.target.index > 19) ? r.target.index - 20 : r.target.index] + ";" + "opacity:" + opacityDefault + ";" );
        }
        else{
          selected_chord
            .attr("style", "fill:"+t);
        }

        let selected_group = wrapper.selectAll("path.chord").filter(function(t) { //hover chord group functionality
              return r.source.index !== t.source.index && r.target.index === t.target.index && Names[t.source.index] !== "";
          }).transition("fadeOnArc");
        let unselected_group = wrapper.selectAll("path.chord").filter(function(t) { //hover chord group functionality
              return r.target.index !== t.target.index && Names[t.source.index] !== "";
          }).transition("fadeOnArc");

        // selected_group.attr("style", "fill: url(#animatedGradient); opacity:" + opacityDefault + ";" );
        // unselected_group.attr("style", "fill: url(#animatedGradient); opacity:" + opacityLow + ";");
        selected_group.attr("style", "fill:" + colors_arr[(r.target.index > 19) ? r.target.index - 20 : r.target.index] + ";" + "opacity:" + opacityDefault + ";" );
        unselected_group.attr("style", "fill:" + colors_arr[(r.target.index > 19) ? r.target.index - 20 : r.target.index] + ";" + "opacity:" + opacityLow + ";");
      }
    }
    
    ////////////////////////////////////////////////////////////
    ////////////////// Extra Functions /////////////////////////
    ////////////////////////////////////////////////////////////
    
    //Include the offset in de start and end angle to rotate the Chord diagram clockwise
    function startAngle(d) { return d.startAngle + offset; }
    function endAngle(d) { return d.endAngle + offset; }

    var movementDict = {};

  // FADE Function
    // Returns an event handler for fading a given chord group
    function fade(t) {
      return function(e, r) {
          wrapper.selectAll("path.chord").filter(function(t) { //hover chord group functionality
              $0.value = (r.index>19) ? r.index - 20 -1 : r.index - 1;
              $1.value = (r.index>19) ? 0 : 1;
              return t.source.index !== r.index && t.target.index !== r.index && "" !== Names[t.source.index]
          }).transition("fadeOnArc").style("opacity", t);
          //console.log(t.source.index);
          var ind = Names[r.index][0]+Names[r.index][1];
          var curr_cluster = ind[1]===':' ? ind[0] : ind;
            var movementArray = (r.index < 20) ? grand[r.index].slice(20,39) : grand[r.index].slice(0,19);
            //console.log(movementArray);
            movementDict = {};
            for (var i = -1; i <= 17; i++) {
                movementDict[i] = movementArray[i + 1]; // Adjust index to start from 0
            }
            //console.log(movementDict);
            var hoverLegend = ["MOVEMENT", "Cluster: # Words"];
            for (var i = -1; i <= 17; i++) {
              if(movementDict[i]>0){
                hoverLegend.push(i + " : " + movementDict[i]);
              }
            }
            legendTextStat.text("");
            legendTextStat
              //.style("white-space", "pre-line")
              //.text(hoverLegend.join("\n"))
              .each(function (d, i) {
                //var lines = wordwrap(dataSet[i].legendLabel)
                var lines = hoverLegend;
                for (var i = 0; i < lines.length; i++) {
                  d3.select(this).append("tspan")
                      .attr("dy",13)
                      .attr("x",function(d) { 
                         //return d.children1 || d._children1 ? -10 : 10; })
                        return 10; })
                        .text(lines[i])
                }
              })

            // Get current mouse position
            const x = e.pageX;
            const y = e.pageY;
    
            // // Show tooltip
            // tooltip.style("display", "block")
            //        .style("left", x + "px")
            //        .style("top", y + "px")
            //        .text("This is a circle")
           
      }
      // if(t===opacityDefault){
      //   tooltip.style("display", "none");
      // }
    }
    
    // Fade function when hovering over chord
    function fadeOnChord() {
      return function(d, i){
        var chosen = d;
        console.log(chosen);
        wrapper.selectAll("path.chord")
          .transition()
          .style("opacity", function(d) {
            return d.source.index === chosen.source.index && d.target.index === chosen.target.index ? opacityDefault : opacityLow;
          });
      }
    }//fadeOnChord

    
    /*Taken from http://bl.ocks.org/mbostock/7555321
    //Wraps SVG text*/
    function wrapChord(text, width) {
      text.each(function() {
    	var text = d3.select(this),
    		words = text.text().split(/\s+/).reverse(),
    		word,
    		line = [],
    		lineNumber = 0,
    		lineHeight = 1.1, // ems
    		y = 0,
    		x = 0,
    		dy = parseFloat(text.attr("dy")),
    		tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
    
    	while (word = words.pop()) {
    	  line.push(word);
    	  tspan.text(line.join(" "));
    	  if (tspan.node().getComputedTextLength() > width) {
    		line.pop();
    		tspan.text(line.join(" "));
    		line = [word];
    		tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
    	  }
    	}
      });
    }//wrapChord

  // Calculate the dimensions of the legend box
  var legendWidth = 50; // Adjust width as needed
  var legendHeight = 400; // Adjust height based on the number of items

  var legendStatX = screenWidth - 300;
  // Create a container for the legend box
  var legend = svg.append("g")
      .attr("class", "legend")
      .attr("transform",  "translate(" + legendStatX + ", 350)"); // Adjust position as needed
  
  var legendTextStat = legend
    .append("text")
    .attr('class', 'stats-legend')
    //.attr("text-anchor", "middle") //center the text on it's origin
    .style("fill", "black")
    .style("font-family", "Arial, sans-serif") // Font family
    .style("font-size", "12px"); // Font size

  function wordwrap(text) {
    var lines=text.split(",")
    return lines
  }
  
  
  // svg.selectAll("g.stats-legend")
  //   .attr('innerHTML', "helas");
  
  // Append a background rectangle for the legend box
  legend.insert("rect", "text")
      .attr("x", -10) // Adjust x-coordinate to add padding
      .attr("y", -10) // Adjust y-coordinate to add padding
      .attr("width", legendWidth + 10) // Adjust width to cover text and add padding
      .attr("height", legendHeight + 10) // Adjust height to cover text and add padding
      .style("fill", "#00A1DE") // Background color
      .style("opacity", 0);
      //.style("stroke", "black"); // Border color

  // Define the legend data
  var legendData = [
      "CLUSTER LEGEND:",
      "-1: not classified",
      "0: countries",
      "1: UN",
      "2: electricity generation",
      "3: international nuclear",
      "4: science college",
      "5: foreign policy",
      "6: relating to reactor plants + waste policy + Korea",
      "7: mining",
      "8: nuclear process terminology",
      "9: names of nuclear reactors",
      "10: nuclear reactor materials + waste",
      "11: relating to multinational corporations",
      "12: China",
      "13: nuclear technology + policy + organizations",
      "14: nuclear plant names",
      "15: relating to nuclear acronyms + nuclear terms",
      "16: nuclear reactor technologies",
      "17: nuclear reactor types"
  ];


  var legendX = screenWidth - 300; 
  // Create a container for the legend
  var legendContainer = svg.append("g")
      .attr("class", "legend")
      .attr("transform", "translate(" + legendX + ", 20)"); // Adjust position as needed
  
  // Append text elements for each category in the legend container
  var legendTexts = legendContainer.selectAll("text")
      .data(legendData)
      .enter()
      .append("text")
      .attr("x", 0) // Adjust x-coordinate as needed
      .attr("y", function(d, i) { return 13 + (i * 13); }) // Adjust y-coordinate as needed
      .text(function(d) { return d; })
      .attr("fill", "black") // Font color
      .style("font-family", "Arial, sans-serif") // Font family
      .style("font-size", "12px"); // Font size
  
  // Optionally, add background color and padding to the legend
  legendContainer.insert("rect", "text")
      .attr("x", -5) // Adjust x-coordinate to add padding
      .attr("y", -5) // Adjust y-coordinate to add padding
      .attr("width", 300) // Adjust width to cover text and add padding
      .attr("height", legendData.length * 13 + 20) // Adjust height to cover text and add padding
      .style("fill", "#00A1DE") // Background color
      .style("opacity", 0.15);
      // .style("stroke", "black"); // Border color

  //SLIDER
  var slide = svg
    .append("g")
    .attr("class", "slider-group")
    .attr("transform", "translate(50, 50)");

  slide.append(slidein);

  var slidein = sliderUI();

  // Create a div element for the tooltip
  // const tooltip = d3.select("body").append("div")
  //     .attr("class", "tooltip")
  //     .style("position", "absolute")
  //     .style("display", "none")
  //     .style("background-color", "black")
  //     .style("color", "pink")
  //     .style("padding", "5px")
  //     .style("border-radius", "5px");

  return svg.node();
}


function _mysnapslider(slider_snap){return(
slider_snap(0,49)
)}

function _key(Swatches,word_chart){return(
Swatches(word_chart.scales.color)
)}

function _word_chart(BubbleChart,changedWords){return(
BubbleChart(changedWords, {
  label: d => d.Term ,
  value: d => 100,
  group: d => d.FinalCluster,
  title: d => `${d.Term}\n${d.FinalCluster}`,
  link: d => "",
  width: 700,
  // colors: colors_arr
})
)}

function _6(startDate,endDate,htl){return(
htl.html`<p style="font:18px Arial; color:blue;">
    Selected Date Range: <b>${startDate.toLocaleString()}</b> to <b>${endDate}</b>
</p>`
)}

function _sliderUI(d3,startDate,endDate,html){return(
function(){
  d3.select("#labelleft").html(startDate).attr('dominant-baseline','baseline').attr('color','green');
  //d3.select("#labelleft").attr('dominant-baseline','baseline');
  //d3.select("#labelleft").attr('position','relative');
  d3.select("#labelleft").attr('color','green');
  
  d3.select("#labelright").html(endDate);
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
  
}
)}

function _8(md){return(
md`# d3.layout.chord.sort.js`
)}

function _customChordLayout(d3){return(
function() {
	var ε = 1e-6, ε2 = ε * ε, π = Math.PI, τ = 2 * π, τε = τ - ε, halfπ = π / 2, d3_radians = π / 180, d3_degrees = 180 / π;
    var chord = {}, chords, groups, matrix, n, padding = 0, sortGroups, sortSubgroups, sortChords;
    function relayout() {
      var subgroups = {}, groupSums = [], groupIndex = d3.range(n), subgroupIndex = [], k, x, x0, i, j;
      chords = [];
      groups = [];
      k = 0, i = -1;
      while (++i < n) {
        x = 0, j = -1;
        while (++j < n) {
          x += matrix[i][j];
        }
        groupSums.push(x);
        subgroupIndex.push(d3.range(n).reverse());
        k += x;
      }
      if (sortGroups) {
        groupIndex.sort(function(a, b) {
          return sortGroups(groupSums[a], groupSums[b]);
        });
      }
      if (sortSubgroups) {
        subgroupIndex.forEach(function(d, i) {
          d.sort(function(a, b) {
            return sortSubgroups(matrix[i][a], matrix[i][b]);
          });
        });
      }
      k = (τ - padding * n) / k;
      x = 0, i = -1;
      while (++i < n) {
        x0 = x, j = -1;
        while (++j < n) {
          var di = groupIndex[i], dj = subgroupIndex[di][j], v = matrix[di][dj], a0 = x, a1 = x += v * k;
          subgroups[di + "-" + dj] = {
            index: di,
            subindex: dj,
            startAngle: a0,
            endAngle: a1,
            value: v
          };
        }
        groups[di] = {
          index: di,
          startAngle: x0,
          endAngle: x,
          value: (x - x0) / k
        };
        x += padding;
      }
      i = -1;
      while (++i < n) {
        j = i - 1;
        while (++j < n) {
          var source = subgroups[i + "-" + j], target = subgroups[j + "-" + i];
          if (source.value || target.value) {
            chords.push(source.value < target.value ? {
              source: target,
              target: source
            } : {
              source: source,
              target: target
            });
          }
        }
      }
      if (sortChords) resort();
    }
    function resort() {
      chords.sort(function(a, b) {
        return sortChords((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2);
      });
    }
    chord.matrix = function(x) {
      if (!arguments.length) return matrix;
      n = (matrix = x) && matrix.length;
      chords = groups = null;
      return chord;
    };
    chord.padding = function(x) {
      if (!arguments.length) return padding;
      padding = x;
      chords = groups = null;
      return chord;
    };
    chord.sortGroups = function(x) {
      if (!arguments.length) return sortGroups;
      sortGroups = x;
      chords = groups = null;
      return chord;
    };
    chord.sortSubgroups = function(x) {
      if (!arguments.length) return sortSubgroups;
      sortSubgroups = x;
      chords = null;
      return chord;
    };
    chord.sortChords = function(x) {
      if (!arguments.length) return sortChords;
      sortChords = x;
      if (chords) resort();
      return chord;
    };
    chord.chords = function() {
      if (!chords) relayout();
      return chords;
    };
    chord.groups = function() {
      if (!groups) relayout();
      return groups;
    };
    return chord;
  }
)}

function _stretchedChord(){return(
function() {
     
    var target = d3_target, 
    source = d3_source,
    radius = d3_svg_chordRadius, 
    startAngle = d3_svg_arcStartAngle, 
    endAngle = d3_svg_arcEndAngle,
    pullOutSize = 0;
    
  var π = Math.PI,
    halfπ = π / 2;

    function subgroup(self, f, d, i) {
    var subgroup = f.call(self, d, i), 
      r = radius.call(self, subgroup, i), 
      a0 = startAngle.call(self, subgroup, i) - halfπ, 
      a1 = endAngle.call(self, subgroup, i) - halfπ;
      return {
        r: r,
        a0: [a0],
        a1: [a1],
        p0: [ r * Math.cos(a0), r * Math.sin(a0)],
        p1: [ r * Math.cos(a1), r * Math.sin(a1)]
      };
    }

    function arc(r, p, a) {
    var sign = (p[0] >= 0 ? 1 : -1);
    return "A" + r + "," + r + " 0 " + +(a > π) + ",1 " + (p[0] + sign*pullOutSize) + "," + p[1];
    }


    function curve(p1) {
    var sign = (p1[0] >= 0 ? 1 : -1);
    return "Q 0,0 " + (p1[0] + sign*pullOutSize) + "," + p1[1];
    }
  
  /*
  M = moveto
  M x,y
  Q = quadratic Bézier curve
  Q control-point-x,control-point-y end-point-x, end-point-y
  A = elliptical Arc
  A rx, ry x-axis-rotation large-arc-flag, sweep-flag  end-point-x, end-point-y
  Z = closepath
  M251.5579641956022,87.98204731514328
  A266.5,266.5 0 0,1 244.49937503334525,106.02973926358392
  Q 0,0 -177.8355222451483,198.48621369706098
  A266.5,266.5 0 0,1 -191.78901944612068,185.0384338992728
  Q 0,0 251.5579641956022,87.98204731514328
  Z
  */  
    function chord(d, i) {
    var s = subgroup(this, source, d, i), 
      t = subgroup(this, target, d, i);
          
  return "M" + (s.p0[0] + pullOutSize) + "," + s.p0[1] + 
      arc(s.r, s.p1, s.a1 - s.a0) + 
      curve(t.p0) + 
      arc(t.r, t.p1, t.a1 - t.a0) + 
      curve(s.p0) + 
      "Z";
   }//chord

    chord.radius = function(v) {
      if (!arguments.length) return radius;
      radius = d3_functor(v);
      return chord;
    };
    chord.pullOutSize = function(v) {
      if (!arguments.length) return pullOutSize;
      pullOutSize = v;
      return chord;
    };
    chord.source = function(v) {
      if (!arguments.length) return source;
      source = d3_functor(v);
      return chord;
    };
    chord.target = function(v) {
      if (!arguments.length) return target;
      target = d3_functor(v);
      return chord;
    };
    chord.startAngle = function(v) {
      if (!arguments.length) return startAngle;
      startAngle = d3_functor(v);
      return chord;
    };
    chord.endAngle = function(v) {
      if (!arguments.length) return endAngle;
      endAngle = d3_functor(v);
      return chord;
    };


  function d3_svg_chordRadius(d) {
      return d.radius;
  }

  function d3_source(d) {
    return d.source;
  }
    
  function d3_target(d) {
      return d.target;
  }

  function d3_svg_arcStartAngle(d) {
      return d.startAngle;
  }
    
  function d3_svg_arcEndAngle(d) {
      return d.endAngle;
  }

  function d3_functor(v) {
    return typeof v === "function" ? v : function() {
      return v;
    };
  }

  return chord;

}
)}

function _script(FileAttachment){return(
FileAttachment("script@5.js")
)}

function _12(md){return(
md`# SRNL Dataset`
)}

function _data(FileAttachment){return(
FileAttachment("cluster_data.csv").csv()
)}

function _initialData(data,endDate){return(
data.filter(function(entry) {
    return (entry.Date === endDate);
})
)}

function _finalData(data,startDate){return(
data.filter(function(entry) {
    return (entry.Date === startDate);
})
)}

function _initialToFinal(initialData,finalData)
{
  //let from5 = Array.from({length: 19}, ()=>0);
  let initialOut = Array.from({ length: 19 }, () => Array.from({ length: 19 }, () => 0));
  // let initialOutData = initialData.filter(function(entry) {
  //     return (entry.Cluster === "5");
  // });
  initialData.forEach(function(entry) {
    // Find the corresponding entry in finalData based on the Term
    var finalEntry = finalData.find(function(finalEntry) {
      return finalEntry.Term === entry.Term;
    });
    
    // If a corresponding final entry is found, update initialOut array
    if (finalEntry) {
      var cluster = parseInt(finalEntry.Cluster);
      if (!isNaN(cluster) && cluster >= -1 && cluster <= 17) {
        initialOut[parseInt(entry.Cluster) + 1][cluster + 1]++; // Increment the count in initialOut array
      }
    }
  });
  
  return initialOut;
}


function _mirrorInitialToFinal(initialToFinal){return(
initialToFinal.slice().reverse().map(row => row.slice().reverse())
)}

function _checkInitialToFinal(data,startDate){return(
data.filter(function(entry) {
    return (entry.Cluster === "16" && entry.Date===startDate);
})
)}

function _finalToInitial(finalData,initialData)
{
  //let from5 = Array.from({length: 19}, ()=>0);
  let finalOut = Array.from({ length: 19 }, () => Array.from({ length: 19 }, () => 0));
  // let initialOutData = initialData.filter(function(entry) {
  //     return (entry.Cluster === "5");
  // });
  finalData.forEach(function(entry) {
    // Find the corresponding entry in finalData based on the Term
    var initialEntry = initialData.find(function(initialEntry) {
      return initialEntry.Term === entry.Term;
    });
    
    // If a corresponding final entry is found, update initialOut array
    if (initialEntry) {
      var cluster = parseInt(initialEntry.Cluster);
      if (!isNaN(cluster) && cluster >= -1 && cluster <= 17) {
        finalOut[parseInt(entry.Cluster) + 1][cluster + 1]++; // Increment the count in initialOut array
      }
    }
  });
  
  return finalOut;
}


function _checkFinalToInitial(data,endDate){return(
data.filter(function(entry) {
    return (entry.Cluster === "-1" && entry.Date===endDate);
})
)}

function _23(md){return(
md`### Combining to make a big matrix`
)}

function _grand(initialToFinal,finalToInitial)
{
  // Initialize a 39x39 matrix with all zeros
  var combinedMatrix = Array.from({ length: 40 }, () => Array.from({ length: 40 }, () => 0));
  
  // Fill the top-right section with alpha values
  for (let i = 0; i < 19; i++) {
      for (let j = 20; j < 39; j++) {
          combinedMatrix[i][j] = initialToFinal[i][j - 20];
      }
  }
  
  // Fill the bottom-left section with beta values
  for (let i = 20; i < 39; i++) {
      for (let j = 0; j < 19; j++) {
          combinedMatrix[i][j] = finalToInitial[i - 20][j];
      }
  }

  //dummy
  //combinedMatrix[19][38] = 
  //combinedMatrix[38][19] = 
  
  return combinedMatrix;
}


function _startDate(uniqueDates,mysnapslider){return(
uniqueDates[mysnapslider[0]]
)}

function _endDate(uniqueDates,mysnapslider){return(
uniqueDates[mysnapslider[1]-1]
)}

function _allDates(data){return(
data.map(function(d) { return d.Date; })
)}

function _uniqueDates(allDates){return(
Array.from(new Set(allDates))
)}

function _changedWords(finalData,current_Chord,flag,initialData)
{
  const clusterXTerms = finalData.filter(item => item.Cluster === String(current_Chord));
  var mappedTerms ={};

  var data1 = (flag == 0) ? initialData : finalData;
  var data2 = (flag == 1) ? initialData : finalData;
  
  data1.forEach(function(entry) {
    // Find the corresponding entry in finalData based on the Term
    var finalEntry = data2.find(function(finalEntry) {
      return finalEntry.Term === entry.Term;
    });
    
    // If a corresponding final entry is found, update initialOut array
    if (finalEntry) {
      // Step 2: Map filtered terms to their corresponding clusters in finalData
      mappedTerms = clusterXTerms.map(term => {
        if(flag==0){
          const finalCluster = data1.find(item => item.Term === term.Term);
          
            return {
              Term: term.Term,
              InitialCluster: term.Cluster,
              FinalCluster: finalCluster ? finalCluster.Cluster : null
            };
          }
        else{
            const finalCluster = data1.find(item => item.Term === term.Term);
            return {
              
              Term: term.Term,
              FinalCluster: term.Cluster,
             InitialCluster : finalCluster ? finalCluster.Cluster : null
            };
          
        }
      });
    }
  });

  
  return mappedTerms;
}


function _current_Chord(){return(
"0"
)}

function _colors_arr(){return(
[
      "#FF5733", // Red
      "#FFC300", // Yellow
      "#33FF57", // Green
      "#3366FF", // Blue
      "#FF33E0", // Pink
      "#FF6F33", // Orange
      "#8B33FF", // Purple
      "#33FFC7", // Turquoise
      "#B533FF", // Violet
      "#FF3333", // Crimson
      "#33FF99", // Sea green
      "#FF33A6", // Fuchsia
      "#33FFEC", // Cyan
      "#7A33FF", // Indigo
      "#FFDD33", // Gold
      "#33FF61", // Spring green
      "#FF33C4", // Hot pink
      "#3366FF", // Cobalt
      "#FFA933", // Tangerine
    ]
)}

function _flag(){return(
0
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["cluster_data.csv", {url: new URL("./files/8cc301454621847760e20f0dac374beb0575fe63fa51eb3f378c844eab6fade2fbf6b0877c938863e1731a0fcf6726197b114def5c52aebb51b8d1f3015e367b.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["script@5.js", {url: new URL("./files/9be89638a02edda9ab1232781849e55048df36d0e49141a3ddb6289b27cce5444cc541f36a2e4eaa0c429d1e532cfd2469bb5271eb2e7a59fa9cc3ea5a21df7a.js", import.meta.url), mimeType: "application/javascript", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart3")).define("chart3", ["d3","startDate","endDate","grand","customChordLayout","stretchedChord","colors_arr","mutable current_Chord","mutable flag","sliderUI"], _chart3);
  main.variable(observer("viewof mysnapslider")).define("viewof mysnapslider", ["slider_snap"], _mysnapslider);
  main.variable(observer("mysnapslider")).define("mysnapslider", ["Generators", "viewof mysnapslider"], (G, _) => G.input(_));
  main.variable(observer("key")).define("key", ["Swatches","word_chart"], _key);
  main.variable(observer("word_chart")).define("word_chart", ["BubbleChart","changedWords"], _word_chart);
  main.variable(observer()).define(["startDate","endDate","htl"], _6);
  main.variable(observer("sliderUI")).define("sliderUI", ["d3","startDate","endDate","html"], _sliderUI);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("customChordLayout")).define("customChordLayout", ["d3"], _customChordLayout);
  main.variable(observer("stretchedChord")).define("stretchedChord", _stretchedChord);
  main.variable(observer("script")).define("script", ["FileAttachment"], _script);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("initialData")).define("initialData", ["data","endDate"], _initialData);
  main.variable(observer("finalData")).define("finalData", ["data","startDate"], _finalData);
  main.variable(observer("initialToFinal")).define("initialToFinal", ["initialData","finalData"], _initialToFinal);
  main.variable(observer("mirrorInitialToFinal")).define("mirrorInitialToFinal", ["initialToFinal"], _mirrorInitialToFinal);
  main.variable(observer("checkInitialToFinal")).define("checkInitialToFinal", ["data","startDate"], _checkInitialToFinal);
  main.variable(observer("finalToInitial")).define("finalToInitial", ["finalData","initialData"], _finalToInitial);
  main.variable(observer("checkFinalToInitial")).define("checkFinalToInitial", ["data","endDate"], _checkFinalToInitial);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("grand")).define("grand", ["initialToFinal","finalToInitial"], _grand);
  main.define("initial startDate", ["uniqueDates","mysnapslider"], _startDate);
  main.variable(observer("mutable startDate")).define("mutable startDate", ["Mutable", "initial startDate"], (M, _) => new M(_));
  main.variable(observer("startDate")).define("startDate", ["mutable startDate"], _ => _.generator);
  main.define("initial endDate", ["uniqueDates","mysnapslider"], _endDate);
  main.variable(observer("mutable endDate")).define("mutable endDate", ["Mutable", "initial endDate"], (M, _) => new M(_));
  main.variable(observer("endDate")).define("endDate", ["mutable endDate"], _ => _.generator);
  main.variable(observer("allDates")).define("allDates", ["data"], _allDates);
  main.variable(observer("uniqueDates")).define("uniqueDates", ["allDates"], _uniqueDates);
  const child1 = runtime.module(define1);
  main.import("slider_snap", child1);
  const child2 = runtime.module(define2);
  main.import("BubbleChart", child2);
  main.import("Swatches", child2);
  main.variable(observer("changedWords")).define("changedWords", ["finalData","current_Chord","flag","initialData"], _changedWords);
  main.define("initial current_Chord", _current_Chord);
  main.variable(observer("mutable current_Chord")).define("mutable current_Chord", ["Mutable", "initial current_Chord"], (M, _) => new M(_));
  main.variable(observer("current_Chord")).define("current_Chord", ["mutable current_Chord"], _ => _.generator);
  main.variable(observer("colors_arr")).define("colors_arr", _colors_arr);
  main.define("initial flag", _flag);
  main.variable(observer("mutable flag")).define("mutable flag", ["Mutable", "initial flag"], (M, _) => new M(_));
  main.variable(observer("flag")).define("flag", ["mutable flag"], _ => _.generator);
  return main;
}
