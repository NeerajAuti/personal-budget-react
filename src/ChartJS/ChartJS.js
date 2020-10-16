import React from "react";
import axios from "axios";
import Chart from "chart.js";

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
  function createChart() {
    var ctx = document.getElementById("myChart").getContext("2d");
    var myPieChart = new Chart(ctx, {
      type: "pie",
      data: dataSource,
    });
    myPieChart.height=340;
  }
  
function ChartJS()
{
    axios.get("http://localhost:3000/budget").then((res) => {
    for (var i = 0; i < res.data.myBudget.length; i++) {
      dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
      dataSource.labels[i] = res.data.myBudget[i].title;
    }
    createChart();
  });
    return(
        <canvas
                id="myChart"
                width="340"
                height="340"
                style={{ display: "inline-block" }}
              ></canvas>
    );
}  

export default ChartJS;