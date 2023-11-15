function _1(md) {
  return md`
# HW2 Medium baseline (4pt)
  `;
}

function _data(FileAttachment) {
  return FileAttachment("data.json").json();
}

function _yCounts() {
  return [];
}

function _years(data) {
  return data.map((item) => item.Year);
}

function _5(yCounts, years, data) {
  yCounts.length = 0;
  var minYear = Math.min(...years);
  var maxYear = Math.max(...years);
  for (var y = minYear; y <= maxYear; y++) {
    yCounts.push({ year: y, gender: "male", count: 0 });
    yCounts.push({ year: y, gender: "female", count: 0 });
  }
  data.forEach((x) => {
    var i = (x.Year - minYear) * 2 + (x.Gender == "男" ? 0 : 1);
    yCounts[i].count++;
  });
  return yCounts;
}

function _plot2(Inputs) {
  return Inputs.form({
    mt: Inputs.range([0, 100], { label: "marginTop", step: 1 }),
    mr: Inputs.range([0, 100], { label: "marginRight", step: 1 }),
    mb: Inputs.range([0, 100], { label: "marginBottom", step: 1 }),
    ml: Inputs.range([0, 100], { label: "marginLeft", step: 1 }),
  });
}

function _7(Plot, plot2, yCounts) {
  return Plot.plot({
    marginTop: plot2.mt,
    marginRight: plot2.mr,
    marginBottom: plot2.mb,
    marginLeft: plot2.ml,

    grid: true,
    y: { label: "count" },
    marks: [
      Plot.ruleY([0]),
      Plot.barY(yCounts, { x: "year", y: "count", tip: true, fill: "gender" }),
    ],
    width: 1000,
  });
}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() {
    return this.url;
  }
  const fileAttachments = new Map([
    [
      "data.json",
      {
        url: new URL("../data.json", import.meta.url),
        mimeType: "application/json",
        toString,
      },
    ],
  ]);
  main.builtin(
    "FileAttachment",
    runtime.fileAttachments((name) => fileAttachments.get(name))
  );
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("yCounts")).define("yCounts", _yCounts);
  main.variable(observer("years")).define("years", ["data"], _years);
  main.variable(observer()).define(["yCounts", "years", "data"], _5);
  main
    .variable(observer("viewof plot2"))
    .define("viewof plot2", ["Inputs"], _plot2);
  main
    .variable(observer("plot2"))
    .define("plot2", ["Generators", "viewof plot2"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot", "plot2", "yCounts"], _7);
  return main;
}
