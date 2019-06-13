/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

// var data = [5,10,15,20,25,30,35];

// var data = [{"name": "Burj Khalifa","height": "350"}];

// var colors = ["red","green", "yellow", "blue", "black"];

// var svg = d3.select("#chart-area").append("svg")
//     .attr("width", 800)
//     .attr("height", 400);

// var circles = svg.selectAll("circle").data(data);

// circles.enter()
// .append("circle")
// .attr("cx",function(d,i){
//     console.log(d);
//     return 200;
// })
// .attr("cy",function(d){
//     return 200;
// })
// .attr("r",function(d){
//     return d.height/10;
// })
// .attr("fill",function(d,i){
//     return colors[i%data.length];
// });

console.log("Start");
var colors = ["red", "green", "yellow", "blue", "black"];

var margines = { top: 10, right: 10, bottom: 100, left: 50 };

var width = 400 - margines.left - margines.right;
var height = 400 - margines.top - margines.bottom;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margines.left + margines.right)
    .attr("height", height + margines.top + margines.bottom);

var g = svg.append("g")
    .attr("transform", "translate(" + margines.left + "," + margines.top + ")");

//x scale
var x = d3.scaleBand()
.paddingInner(0.2)
.paddingOuter(0.2);

//y scale
var y = d3.scaleLinear();

//x axis group
var xAsisGroup = g.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + height + ")");

//y axis group
var yAxisGroup = g.append("g")
.attr("class", "y-axis");

d3.json("data/buildings.json").then(function (data) {
    console.log(data);

    data.forEach(function (d) {
        d.height = +d.height;
    });

    //Interval function for updated view
    d3.interval(function () {
        update(data);
    }, 500);

    //Run the visualization for the first time
    update(data);

    //Text label for the x axis
    g.append("text")
        .attr("transform",
            "translate(" + (width / 2) + " ," +
            (height + margines.bottom - 10) + ")")
        .style("text-anchor", "middle")
        .text("Wrold's " + data.length + " Tallest Towers");
});

function update(data) {
    //x scale
    x.domain(data.map(function (d) { return d.name }))
        .range([0, width]);

    //y scale
    y.domain([0, d3.max(data, function (d) {
            return d.height
        })])    // [min,max] value in your data
        .range([height, 0]);   // [min,max] viewport pixels towards y axis

    //x asix
    var xAxisCall = d3.axisBottom(x);
    xAsisGroup.call(xAxisCall)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-20)");

    //y axis
    var yAxisCall = d3.axisLeft(y)
        .tickFormat(function(d){
            return d + "m";
        });
    yAxisGroup.call(yAxisCall);

    var rect = g.selectAll("rect").data(data);
    rect.enter()
        .append("rect")
        .attr("x", function (d, i) {
            //console.log(x.bandwidth());
            return x(d.name);
        })
        .attr("y", function (d, i) {
            return y(d.height);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.height) })
        .attr("fill", "grey");
}

