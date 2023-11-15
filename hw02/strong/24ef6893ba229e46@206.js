function _1(md) {
  return md`
# HW2 Strong baseline (2pt)
  `;
}

function _data(FileAttachment) {
  return FileAttachment("../data.json").json();
}

function _title() {
  return [
    "牡羊座",
    "金牛座",
    "雙子座",
    "巨蟹座",
    "獅子座",
    "處女座",
    "天秤座",
    "天蠍座",
    "射手座",
    "摩羯座",
    "水瓶座",
    "雙魚座",
  ];
}

function _4(md) {
  return md`
## Histogram
  `;
}

function _5(Plot, d3, title, data) {
  return Plot.plot({
    y: {
      grid: true,
      label: "Count",
    },
    x: {
      tickValues: d3.range(0, 12),
      tickFormat: (i) => title[i],
    },
    color: {
      domain: ["男", "女"],
    },
    marks: [
      Plot.rectY(
        data,
        Plot.binX(
          {
            y: "count",
            title: (d) => {
              const constellationName = title[d[0].Constellation];
              const gender = d[0].Gender;
              const count = d.length; // Assuming each 'd' element is one data point
              return `Constellation: ${constellationName}, Gender: ${gender}, Count: ${count}`;
            },
          },
          {
            x: "Constellation",
            interval: 1,
            fill: "Gender",
            tip: true,
          }
        )
      ),
      Plot.gridY({ interval: 1, stroke: "white", strokeOpacity: 0 }),
    ],
    width: 900, // if not long enought, the bottom's text will not reveal all
  });
}

function _6(md) {
  return md`
## Bar Chart
  `;
}

function _yCounts() {
  return [];
}

function _constellation(data) {
  return data.map((item) => item.Constellation);
}

function _9(yCounts, constellation, data) {
  yCounts.length = 0;
  var minConstellation = Math.min(...constellation);
  var maxConstellation = Math.max(...constellation);
  for (var y = minConstellation; y <= maxConstellation; y++) {
    yCounts.push({ constellation: y, gender: "male", count: 0 });
    yCounts.push({ constellation: y, gender: "female", count: 0 });
  }
  data.forEach((x) => {
    var i =
      (x.Constellation - minConstellation) * 2 + (x.Gender == "男" ? 0 : 1);
    yCounts[i].count++;
  });
  return yCounts;
}

function _10(Plot, d3, title, yCounts) {
  return Plot.plot({
    y: {
      grid: true,
      label: "Count",
    },
    x: {
      tickValues: d3.range(0, 2),
      tickFormat: (i) => title[i],
    },
    color: {
      domain: ["male", "female"],
    },
    marks: [
      Plot.ruleY([0]),
      Plot.barY(yCounts, {
        x: (d) => d.constellation,
        y: "count",
        fill: "gender",
        tip: true,
        title: (d) =>
          `Constellation: ${title[d.constellation]}, Gender: ${
            d.gender
          }, Count: ${d.count}`,
        width: 0.4,
      }),
    ],
    width: 900,
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
        url: new URL(
          "./files/2259824662fb612853b8873b8814ace51e8cbac39ba881850d66e26df63f1897b01d1bd3459af6529669fd912da9dd607a30666a93278d7fdfa10bbe22b8913d.json",
          import.meta.url
        ),
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
  main.variable(observer("title")).define("title", _title);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["Plot", "d3", "title", "data"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("yCounts")).define("yCounts", _yCounts);
  main
    .variable(observer("constellation"))
    .define("constellation", ["data"], _constellation);
  main.variable(observer()).define(["yCounts", "constellation", "data"], _9);
  main.variable(observer()).define(["Plot", "d3", "title", "yCounts"], _10);
  return main;
}
