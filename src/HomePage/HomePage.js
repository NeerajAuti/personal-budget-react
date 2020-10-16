import React from "react";
import axios from "axios";
import Chart from "chart.js";
import * as d3 from "d3";
const dataSource = {
  datasets: [
    {
      data: [],
      backgroundColor: [
        "#ffcd56",
        "#ff6384",
        "#36a2eb",
        "#fd6b19",
        "#99ff33",
        "#ff9900",
        "#00ffcc",
        "#99ff99",
        "#cc66ff",
        "#cc6699",
        "#3366cc",
        "#660066",
      ],
    },
  ],
  labels: [],
};
const data = [];
function createChart() {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myPieChart = new Chart(ctx, {
    type: "pie",
    data: dataSource,
  });
}

function create_d3jsChart(data) {
  // set the dimensions and margins of the graph
  var width = 350;
  var height = 350;
  var margin = 50;

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin;

  // append the svg object to the div called 'd3jsChart'
  var svg = d3
    .select("#d3jsChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // Create dummy data
  //var data = {A: 9, B: 20, c:30, d:8, e:12, f:3, g:7, h:14}

  // set the color scale
  var color = d3
    .scaleOrdinal()
    .domain([
      "Eat out",
      "Grocery",
      "Internet Bill",
      "Mobile Bill",
      "Netflix & other entertainment",
      "Rent",
      "University Tuition fees",
      "Utilities",
    ])
    .range(d3.schemeDark2);

  // Compute the position of each group on the pie:
  var pie = d3
    .pie()
    .sort(null) // Do not sort group by size
    .value(function (d) {
      return d.value;
    });
    console.log(data);
  var data_ready = pie(data);

  // The arc generator
  var arc = d3
    .arc()
    .innerRadius(radius * 0.5) // This is the size of the donut hole
    .outerRadius(radius * 0.8);

  // Another arc that won't be drawn. Just for labels positioning
  var outerArc = d3
    .arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
    .selectAll("allSlices")
    .data(data_ready)
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", function (d) {
      return color(d.data.key);
    })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 0.7);

  // Add the polylines between chart and labels:
  svg
    .selectAll("allPolylines")
    .data(data_ready)
    .enter()
    .append("polyline")
    .attr("stroke", "black")
    .style("fill", "none")
    .attr("stroke-width", 1)
    .attr("points", function (d) {
      var posA = arc.centroid(d); // line insertion in the slice
      var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
      var posC = outerArc.centroid(d); // Label position = almost the same as posB
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
      posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
      return [posA, posB, posC];
    });

  // Add the polylines between chart and labels:
  svg
    .selectAll("allLabels")
    .data(data_ready)
    .enter()
    .append("text")
    .text(function (d) {
      console.log(d.data.key);
      return d.data.key;
    })
    .attr("transform", function (d) {
      var pos = outerArc.centroid(d);
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
      return "translate(" + pos + ")";
    })
    .style("text-anchor", function (d) {
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      return midangle < Math.PI ? "start" : "end";
    });
}

function HomePage() {
  axios.get("/budget-data.json").then((res) => {
    for (var i = 0; i < res.data.myBudget.length; i++) {
      dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
      dataSource.labels[i] = res.data.myBudget[i].title;
      //data[res.data.myBudget[i].title] = res.data.myBudget[i].budget;
      var data1 = {};
      data1["key"] = res.data.myBudget[i].title;
      data1["value"] = res.data.myBudget[i].budget;
      data.push(data1);
    }
    createChart();
    create_d3jsChart(data);
  });
  return (
    <main id="main">
      <div className="container center">
        <div className="page-area">
          <article className="text-box">
            <h1>Stay on track</h1>
            <p>
              Do you know where you are spending your money? If you really stop
              to track it down, you would get surprised! Proper budget
              management depends on real data... and this app will help you with
              that!
            </p>
          </article>

          <article className="text-box">
            <h1>Alerts</h1>
            <p>
              What if your clothing budget ended? You will get an alert. The
              goal is to never go over the budget.
            </p>
          </article>

          <article className="text-box">
            <h1>Results</h1>
            <p>
              People who stick to a financial plan, budgeting every expense, get
              out of debt faster! Also, they to live happier lives... since they
              expend without guilt or fear... because they know it is all good
              and accounted for.
            </p>
          </article>

          <article className="text-box">
            <h1>Free</h1>
            <p>
              This app is free!!! And you are the only one holding your data!
            </p>
          </article>

          <article className="text-box">
            <h1>Stay on track</h1>
            <p>
              Do you know where you are spending your money? If you really stop
              to track it down, you would get surprised! Proper budget
              management depends on real data... and this app will help you with
              that!
            </p>
          </article>

          <article className="text-box">
            <h1>Alerts</h1>
            <p>
              What if your clothing budget ended? You will get an alert. The
              goal is to never go over the budget.
            </p>
          </article>
          <article className="text-box">
            <h1>New Chart</h1>
              <div id="d3jsChart"></div>
          </article>

          <article className="text-box">
            <h1>Chart</h1>
            <p>
              <canvas
                id="myChart"
                width="340"
                height="340"
                style={{ display: "inline-block" }}
              ></canvas>
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
