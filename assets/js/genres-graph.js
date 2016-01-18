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

// append tooltip element
var tooltip = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

// set colorscheme
var color = d3.scale.ordinal()
    .domain(['pop', 'hip hop', 'country', 'rock', 'jazz', 'metal'])
    .range(['#d53e4f', '#fdae61', '#ffffbf', '#abdda4', '#66c2a5', '#3288bd']);

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
      .style('fill', function(d) { return color(d.top_genre); })
      .on('mouseover', mouseover)
      .on('mouseout', mouseout)
      .on('click', function(d) {
        var genre = d.top_genre;
        refreshGenrePlaylist(genre);
      });

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

  // graph label
  graph.append('text')
      .attr('class', 'label')
      .attr('x', 180)
      .attr('y', -7)
      .text('Listener’s Top Genres');
}

function mouseover(d) {
  tooltip.transition()
      .duration(200)
      .style('opacity', 0.9);
  tooltip.html(d.top_genre.toUpperCase())
      .style('left', (d3.event.pageX + 25) + 'px')
      .style('top', (d3.event.pageY - 10) + 'px');
}

function mouseout(d) {
  tooltip.transition()
      .duration(500)
      .style('opacity', 0);
}
