// set the dimensions and margins of the graph
var margin = {top: 50, right: 30, bottom: 90, left: 500},
    width = 1500 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("https://raw.githubusercontent.com/Konnysmouth/HASS-assignment3/main/Lease%20Commence%20Data%20and%20Resale%20Price.csv", function(data) {

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.Lease_Commence_Date; }))
  .padding(0.1);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))

  .selectAll("text")
    .attr("font-family", "Helvetica Neue")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .attr("fill", "#dad4c8")
    .style("text-anchor", "end")
    
    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + 50)
    .attr("font-family", "Helvetica Neue")
    .attr("fill", "#dad4c8")
    .attr("stroke", "#dad4c8")
    .attr("stroke-width",".5")
    .text("LEASE COMMENCE DATE ■");
    


// Add Y axis
var y = d3.scaleLinear()
  .domain([200000, 900000])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y))
  .selectAll("text")
  .attr("font-family", "Helvetica Neue")
  .attr("fill", "#dad4c8")

  svg.append("text")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("y", 6)
  .attr("dy", "-4em")
  .attr("transform", "rotate(-90)")
  .attr("font-family", "Helvetica Neue")
  .attr("fill", "#dad4c8")
  .attr("stroke", "#dad4c8")
  .attr("stroke-width",".5")
  .text("HDB RESALE PRICE ■");

// Bars
svg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.Lease_Commence_Date); })
    .attr("width", x.bandwidth())
    .attr("fill", "#dad4c8")
    // no bar at the beginning thus:
    .attr("height", function(d) { return height - y(0); }) // always equal to 0
    .attr("y", function(d) { return y(0); })

// Animation
svg.selectAll("rect")
  .transition()
  .duration(1200)
  .attr("y", function(d) { return y(d.Resale_Price); })
  .attr("height", function(d) { return height - y(d.Resale_Price); })
  .delay(function(d,i){console.log(i) ; return(i*300)})



})