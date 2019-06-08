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

console.log("start");
var colors = ["red","green", "yellow", "blue", "black"];

d3.json("data/buildings.json").then(function (data) {
    console.log(data);

    data.forEach(function(d) {
        d.height = +d.height;
    });

    var scaling = d3.scaleLinear()
    .domain([0,350])
    .range([0,200]);

    var svg = d3.select("#chart-area").append("svg")
        .attr("width", 300)
        .attr("height", 200);
    
        var circles = svg.selectAll("line").data(data);

        circles.enter()
        .append("line")
        .attr("x1",function(d,i){
            //console.log(d.height);
            return (i+1)*30;
        })
        .attr("y1",function(d,i){
            return 0;
        })
        .attr("x2",function(d,i){
            return (i+1)*30;
        })
        .attr("y2",function(d,i){
            console.log("Y=",scaling(d.height));
            return scaling(d.height);
        })
        .attr("stroke", function(d,i){
            return colors[i%5];
        })
        .attr("stroke-width","20");
}).catch(function(data){
    console.log("Error!!!");
});
