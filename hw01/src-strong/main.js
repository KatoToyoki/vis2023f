let test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function GetFullScore(Score) {
  let fullScore = Array(10).fill(0);
  for (let i = 0; i < Score.length; i++) {
    for (let j = 0; j < 120; j++) {
      if (Score[i][j] == "9") {
        fullScore[i] += 1;
      }
    }
  }
  console.log(fullScore);
  return fullScore;
}

function DrawHistogram() {
  let order = [
    "作業一",
    "作業二",
    "作業三",
    "作業四",
    "作業五",
    "作業六",
    "作業七",
    "作業八",
    "作業九",
    "作業十",
  ];
  let hwScore = [];
  let fullScore = [];

  d3.csv("../score.csv", function (data) {
    for (let i = 0; i < order.length; i++) {
      hwScore.push(
        data.map(function (d) {
          return d[order[i]];
        })
      );
    }
    fullScore = GetFullScore(hwScore);

    /**
     * take this as reference and modify the code to meet the requirement
     * https://plnkr.co/edit/2xCvrwiXWzrS6gtbmIU7?p=preview&preview
     */
    var color = "steelblue";

    var formatCount = d3.format(",.0f");

    var margin = { top: 20, right: 30, bottom: 30, left: 30 },
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    var max = d3.max(fullScore);
    var min = d3.min(fullScore);

    var data = fullScore.map(function (d, i) {
      return { x: order[i], y: d };
    });

    var yMax = d3.max(data, function (d) {
      return Math.max(fullScore);
    });
    var yMin = d3.min(data, function (d) {
      return Math.min(fullScore);
    });
    var colorScale = d3.scale
      .linear()
      .domain([yMin, yMax])
      .range([d3.rgb(color).brighter(), d3.rgb(color).darker()]);

    var x = d3.scale
      .ordinal()
      .domain(
        data.map(function (d) {
          return d.x;
        })
      )
      .rangeRoundBands([0, width], 0.1);

    var y = d3.scale
      .linear()
      .domain([
        0,
        d3.max(data, function (d) {
          return d.y;
        }),
      ])
      .range([height, 0]);

    var xAxis = d3.svg.axis().scale(x).orient("bottom");

    var svg = d3
      .select("#histogram")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var bar = svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "bar")
      .attr("transform", function (d, i) {
        return "translate(" + x(d.x) + "," + y(d.y) + ")";
      });

    bar
      .append("rect")
      .attr("width", x.rangeBand())
      .attr("height", function (d) {
        return height - y(d.y);
      })
      .attr("fill", function (d) {
        return colorScale(d);
      });

    bar
      .append("text")
      .attr("dy", ".75em")
      .attr("y", -12)
      .attr("x", (x(data[0].x) - x(0)) / 2)
      .attr("text-anchor", "middle")
      .text(function (d) {
        return formatCount(d.y);
      });

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  DrawHistogram();
});
