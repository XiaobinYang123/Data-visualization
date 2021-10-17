var colorLegend = function (selection, props) {
  var colorScale = props.colorScale;
  var circleRadius = props.circleRadius;
  var spacing = props.spacing;
  var textOffset = props.textOffset;

  var groups = selection.selectAll('g')
    .data(colorScale.domain());
  var groupsEnter = groups
    .enter().append('g')
      .attr('class', 'tick');
  groupsEnter
    .merge(groups)
      .attr('transform', function (d, i) { return ("translate(0, " + (i * spacing) + ")"); }
      );
  groups.exit().remove();

  groupsEnter.append('circle')
    .merge(groups.select('circle'))
      .attr('r', circleRadius)
      .attr('fill', colorScale);

  groupsEnter.append('text')
    .merge(groups.select('text'))
      .text(function (d) { return d; })
      .attr('dy', '0.32em')
      .attr('x', textOffset);
};

// var svg = d3.select('svg');

// var width = +svg.attr('width');
// var height = +svg.attr('height');

// var render = function (data) {
//   var title = 'A Week of Temperature Around the World';
  
//   var xValue = function (d) { return d.timestamp; };
//   var xAxisLabel = 'Time';
  
//   var yValue = function (d) { return d.temperature; };
//   var yAxisLabel = 'Temperature';
  
//   var colorValue = function (d) { return d.city; };
  
//   var margin = { top: 60, right: 160, bottom: 88, left: 105 };
//   var innerWidth = width - margin.left - margin.right;
//   var innerHeight = height - margin.top - margin.bottom;
  
//   var xScale = d3.scaleTime()
//     .domain(d3.extent(data, xValue))
//     .range([0, innerWidth])
//     .nice();
  
//   var yScale = d3.scaleLinear()
//     .domain(d3.extent(data, yValue))
//     .range([innerHeight, 0])
//     .nice();
  
//   var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  
//   var g = svg.append('g')
//     .attr('transform', ("translate(" + (margin.left) + "," + (margin.top) + ")"));
  
//   var xAxis = d3.axisBottom(xScale)
//     .tickSize(-innerHeight)
//     .tickPadding(15);
  
//   var yAxis = d3.axisLeft(yScale)
//     .tickSize(-innerWidth)
//     .tickPadding(10);
  
//   var yAxisG = g.append('g').call(yAxis);
//   yAxisG.selectAll('.domain').remove();
  
//   yAxisG.append('text')
//       .attr('class', 'axis-label')
//       .attr('y', -60)
//       .attr('x', -innerHeight / 2)
//       .attr('fill', 'black')
//       .attr('transform', "rotate(-90)")
//       .attr('text-anchor', 'middle')
//       .text(yAxisLabel);
  
//   var xAxisG = g.append('g').call(xAxis)
//     .attr('transform', ("translate(0," + innerHeight + ")"));
  
//   xAxisG.select('.domain').remove();
  
//   xAxisG.append('text')
//       .attr('class', 'axis-label')
//       .attr('y', 80)
//       .attr('x', innerWidth / 2)
//       .attr('fill', 'black')
//       .text(xAxisLabel);
  
//   var lineGenerator = d3.line()
//     .x(function (d) { return xScale(xValue(d)); })
//     .y(function (d) { return yScale(yValue(d)); })
//     .curve(d3.curveBasis);
  
//   var lastYValue = function (d) { return yValue(d.values[d.values.length - 1]); };
  
//   var nested = d3.nest()
//     .key(colorValue)
//     .entries(data)
//     .sort(function (a, b) { return d3.descending(lastYValue(a), lastYValue(b)); }
//     );
  
//   console.log(nested);
  
//   colorScale.domain(nested.map(function (d) { return d.key; }));
  
//   g.selectAll('.line-path').data(nested)
//     .enter().append('path')
//       .attr('class', 'line-path')
//       .attr('d', function (d) { return lineGenerator(d.values); })
//       .attr('stroke', function (d) { return colorScale(d.key); });
  
//   g.append('text')
//       .attr('class', 'title')
//       .attr('y', -10)
//       .text(title);
  
//   svg.append('g')
//     .attr('transform', "translate(790,121)")
//     .call(colorLegend, {
//       colorScale: colorScale,
//       circleRadius: 13,
//       spacing: 30,
//       textOffset: 15
//     });
// };

// d3.csv('https://vizhub.com/curran/datasets/data-canvas-sense-your-city-one-week.csv')
//   .then(function (data) {
//     data.forEach(function (d) {
//       d.temperature = +d.temperature-20;
//       d.timestamp = new Date(d.timestamp);
//     });
//     render(data);
//   });

//https://stats.oecd.org/sdmx-json/data/DP_LIVE/.INDPROD.TOT.IDX2015.M/OECD?contentType=csv&detail=code&separator=comma&csv-lang=en&startPeriod=2019-Q4&endPeriod=2021-Q2
  const locations = ["CAN","NOR","USA", "KOR", "ITA" ]

  const svg = d3.select('svg');
  const width = +svg.attr('width');
  const height = +svg.attr('height');

  var render = function (data) {
  var title = 'Industrial Production Output';
  
  var xValue = function (d) { return d.timestamp; };
  var xAxisLabel = 'Time';
  
  var yValue = function (d) { return d.value; };
  var yAxisLabel = 'Value';
  
  var colorValue = function (d) { return d.LOCATION; };
  
  var margin = { top: 60, right: 160, bottom: 88, left: 105 };
  var innerWidth = width - margin.left - margin.right;
  var innerHeight = height - margin.top - margin.bottom;
  
  var xScale = d3.scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();
  
  var yScale = d3.scaleLinear()
    .domain([-40, 40]) //[d3.max(data, yValue), d3.min(data, yValue)]
    .range([innerHeight, 0])
    .nice();
  
  var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  
  var g = svg.append('g')
    .attr('transform', ("translate(" + (margin.left) + "," + (margin.top) + ")"));
  
    var xAxis = d3.axisBottom(xScale)
      .tickSize(-innerHeight/2)
      .tickPadding(15);

    // var xAxisTop = d3.axisTop(xScale)
    // .tickSize(-innerHeight/2)
    // .tickPadding(15)
  
  var yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10);

  var yAxisG = g.append('g').call(yAxis);
  yAxisG.selectAll('.domain').remove();
  
  yAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', -60)
      .attr('x', -innerHeight / 2)
      .attr('fill', 'black')
      .attr('transform', "rotate(-90)")
      .attr('text-anchor', 'middle')
      .text(yAxisLabel);

  
  var xAxisG = g.append('g').call(xAxis)
    .attr('transform', ("translate(0," + innerHeight/2+ ")"));


  xAxisG.select('.domain').remove();

  // xAxisG.append('text')
  //     .attr('class', 'axis-label')
  //     .attr('y', 80)
  //     .attr('x', innerWidth / 2)
  //     .attr('fill', 'black')
  //     .text(xAxisLabel);
  
  var lineGenerator = d3.line()
    .x(function (d) { return xScale(xValue(d)); })
    .y(function (d) { return yScale(yValue(d)); })
    .curve(d3.curveBasis);
  
  var lastYValue = function (d) { return yValue(d.values[d.values.length - 1]); };
  
  var nested = d3.nest()
    .key(colorValue)
    .entries(data)
    .sort(function (a, b) { return d3.descending(lastYValue(a), lastYValue(b)); }
    );
  
  console.log(nested);
  
  colorScale.domain(nested.map(function (d) { return d.key; }));
  
  g.selectAll('.line-path').data(nested)
    .enter().append('path')
      .attr('class', 'line-path')
      .attr('d', function (d) { return lineGenerator(d.values); })
      .attr('stroke', function (d) { return colorScale(d.key); });
  
  g.append('text')
      .attr('class', 'title')
      .attr('y', -10)
      .text(title);
  
  svg.append('g')
    .attr('transform', "translate(1500,121)")
    .call(colorLegend, {
      colorScale: colorScale,
      circleRadius: 13,
      spacing: 30,
      textOffset: 15
    });
};

 d3.csv('https://stats.oecd.org/sdmx-json/data/DP_LIVE/.INDPROD.TOT.IDX2015.M/OECD?contentType=csv&detail=code&separator=comma&csv-lang=en&startPeriod=2019-Q2&endPeriod=2021-Q2')
   .then(function (data) {
      data = data.filter(item=>locations.includes(item.LOCATION))
      data.forEach(function (d) {
        d.value= +d.Value-100;
        d.timestamp = new Date(d.TIME+'-04');
    });
    console.log(data)
    render(data);
   });
