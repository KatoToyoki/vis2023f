function AppleTable() {
  let table = document.getElementById("apple");
  table.appendChild(AppleIconRow());
}

function AppleIconRow() {
  let row = document.createElement("tr");

  for (let i = 10; i >= 0; i--) {
    let col = document.createElement("td");

    col.textContent = i;

    col.appendChild(document.createElement("hr"));

    let img = document.createElement("img");
    img.src = `../images/${i}.svg`;
    img.width = "80";
    col.appendChild(img);

    row.appendChild(col);
  }

  return row;
}

function ReadCSV(table, header) {
  d3.csv("../score.csv", function (data) {
    let mapData = [null].concat(data);

    let rows = table.selectAll("tr").data(mapData).enter().append("tr");

    let cols = rows
      .selectAll("td")
      .data(function (container) {
        return header.map(function (key) {
          console.log(key, container[key]);
          if (key.includes("作業")) {
            let img = `<img src="../images/${container[key]}.svg" width="40"/>`;
            return { key: key, value: img };
          } else {
            return { key: key, value: container[key] };
          }
        });
      })
      .enter()
      .append("td")
      .html(function (d) {
        return d.value;
      });
  });
}

function CSVtoTable() {
  let headerRowContents = [
    "序號",
    "班級",
    "學號",
    "姓名",
    "GitHub",
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

  let table = d3.select("#score_table").append("table");
  table
    .append("tr")
    .selectAll("td")
    .data(headerRowContents)
    .enter()
    .append("td")
    .text(function (col) {
      return col;
    });

  ReadCSV(table, headerRowContents);
}

document.addEventListener("DOMContentLoaded", function () {
  AppleTable();
  CSVtoTable();
});
