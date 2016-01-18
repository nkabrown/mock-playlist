// set viewport dimensions
var margin = {top: 20, right: 20, bottom: 50, left: 60},
    width = 570 - margin.right - margin.left,
    height = 550 - margin.top - margin.bottom;

// render viewport and SVG canvas
var graph = d3.select('.graph')
     .attr('width', width + margin.right + margin.left)
     .attr('height', height + margin.top + margin.bottom)
   .append('g')
     .attr('class', 'plot-canvas')
     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);
var xAxis = d3.svg.axis().orient('bottom').scale(x);
var yAxis = d3.svg.axis().orient('left').scale(y);

// load data for graph
d3.csv('../assets/data/genres.csv', function(data) {
  data.forEach(function(d) {
    d.listeners = +d.listeners;
    d.count = +d.count;
  });
  spotifyGenreGraph(data);
});

// graph spotify genre data
function spotifyGenreGraph(data) {
  console.log(data);
  var countRamp = x.domain(d3.extent(data, function(d) { return d.count; }));
  var listenerRamp = y.domain(d3.extent(data, function(d) { return d.listeners; }));
  
  graph.selectAll('circle')
      .data(data)
    .enter().append('circle')
      .attr('r', 10)
      .attr('cx', function(d, i) { return countRamp(d.count); })
      .attr('cy', function(d) { return listenerRamp(d.listeners); })
      .style('fill', '#ff7878')
      .style('stroke', '#ff0000');

  graph.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(xAxis)
      .append('text')
      .attr('y', 0)
      .attr('x', 430)
      .text('Top Genre Count');

  graph.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('x', -60)
      .attr('y', 5)
      .text('Number of Listeners');

}
