let ctx = document.getElementById("myBarChart");
let myBarChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      // "月曜日",
      // "火曜日",
      // "水曜日",
      // "木曜日",
      "金曜日",
      "土曜日",
      "日曜日",
      "今週の総距離",
    ],
    datasets: [
      {
        label: "走った距離",
        // data: [3, 2, 2, 2.5, 4, 5, 4, 22.5],
        data: [4, 5, 4, 22.5],
        backgroundColor: "rgba(219,39,91,0.5)",
      } /*
      {
        label: "B店 来客数",
        data: [55, 45, 73, 75, 41, 45, 58],
        backgroundColor: "rgba(130,201,169,0.5)",
      },
      {
        label: "C店 来客数",
        data: [33, 45, 62, 55, 31, 45, 38],
        backgroundColor: "rgba(255,183,76,0.5)",
      },*/,
    ],
  },
  options: {
    title: {
      display: true,
      text: "1週間のrunningの記録",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMax: 10,
            suggestedMin: 0,
            stepSize: 10,
            callback: function (value, index, values) {
              return value + "km";
            },
          },
        },
      ],
    },
  },
});