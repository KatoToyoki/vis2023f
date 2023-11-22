function _1(md) {
  return md`
# HW04 Sunburst
  `;
}

function _artist(FileAttachment) {
  return FileAttachment("artist@1.csv").csv();
}

function _3(__query, artist, invalidation) {
  return __query(
    artist,
    {
      from: { table: "artist" },
      sort: [],
      slice: { to: null, from: null },
      filter: [],
      select: { columns: null },
    },
    invalidation,
    "artist"
  );
}

function _innerCircleQuestion(artist) {
  return Object.keys(artist[0])[1];
}

function _outerCircleQuestion(artist) {
  return Object.keys(artist[0])[16];
}

function _color(d3) {
  return d3
    .scaleOrdinal()
    .domain([
      "工作室",
      "替代空間",
      "美術館",
      "減少包裝材及文宣印製",
      "使用無毒媒材、再生材料、廢物利用素材等",
      "工作場所、活動展場的節約能源",
    ])
    .range(["#A4AE76", "#607F46", "#4C917F", "#4B8157", "#EEA35D", "#6BA87A"])
    .unknown("#d3d3d3");
}

function _7(htl) {
  return htl.html`<style>
.tooltip {
  padding: 8px 12px;
  color: white;
  border-radius: 6px;
  border: 2px solid rgba(255,255,255,0.5);
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.2);
  pointer-events: none;
  transform: translate(-50%, -100%);
  font-family: "noto-sans", light;
  background: rgba(182,163,145,0.8);
  transition: 0.2s opacity ease-out, 0.1s border-color ease-out;
}
</style>`;
}

function _data(
  artist,
  innerCircleQuestion,
  outerCircleQuestion,
  buildHierarchy
) {
  // to get the data from inner and outer
  var inner = artist.map((row) => row[innerCircleQuestion]);
  var outer = artist.map((row) => row[outerCircleQuestion]);

  // combine inner and outer to a new array
  var combinedAnswers = inner.map(
    (innerAns, index) => innerAns + "-" + outer[index]
  );

  // format the answer
  var reformattedAnswers = combinedAnswers
    .map((item) => {
      const [prefix, values] = item.split("-");
      const splitValues = values.split(";").map((value) => value.trim());
      return splitValues.map((value) => `${prefix}-${value}`);
    })
    .reduce((acc, curr) => acc.concat(curr), []);

  // count the quantity of each answer
  var answerCounts = {};
  reformattedAnswers.forEach((reformattedAns) => {
    answerCounts[reformattedAns] = (answerCounts[reformattedAns] || 0) + 1;
  });

  // convert to .csv
  var csvData = Object.entries(answerCounts).map(([answer, count]) => [
    answer,
    String(count),
  ]);

  return buildHierarchy(csvData);
}

function _breadcrumb(
  d3,
  breadcrumbWidth,
  breadcrumbHeight,
  sunburst,
  breadcrumbPoints,
  color
) {
  const svg = d3
    .create("svg")
    .attr("viewBox", `0 0 ${breadcrumbWidth * 10} ${breadcrumbHeight}`)
    .style("font", "12px sans-serif")
    .style("margin", "5px");

  const g = svg
    .selectAll("g")
    .data(sunburst.sequence)
    .join("g")
    .attr("transform", (d, i) => `translate(${i * breadcrumbWidth}, 0)`);

  g.append("polygon")
    .attr("points", breadcrumbPoints)
    .attr("fill", (d) => color(d.data.name))
    .attr("stroke", "white");

  g.append("text")
    .attr("x", (breadcrumbWidth + 10) / 2)
    .attr("y", 15)
    .attr("dy", "0.35em")
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .text((d) => {
      if (d.data.name === "減少包裝材及文宣印製") {
        return "減少包裝";
      } else if (d.data.name === "使用無毒媒材、再生材料、廢物利用素材等") {
        return "使用再生材料";
      } else if (d.data.name === "工作場所、活動展場的節約能源") {
        return "節約能源";
      } else if (d.data.name.length > 6) {
        return "其他答案";
      }
      return d.data.name;
    });

  svg
    .append("text")
    .text(sunburst.percentage > 0 ? sunburst.percentage + "%" : "")
    .attr("x", (sunburst.sequence.length + 0.5) * breadcrumbWidth)
    .attr("y", breadcrumbHeight / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", "middle");

  return svg.node();
}

function _sunburst(
  partition,
  data,
  d3,
  radius,
  innerCircleQuestion,
  outerCircleQuestion,
  width,
  color,
  arc,
  mousearc
) {
  const root = partition(data);
  const svg = d3.create("svg");
  const element = svg.node();
  element.value = { sequence: [], percentage: 0.0 };

  const fo = svg
    .append("foreignObject")
    .attr("x", `${radius + 50}px`)
    .attr("y", -10)
    .attr("width", radius * 2)
    .attr("height", 350);

  const div = fo
    .append("xhtml:div")
    .style("color", "#555")
    .style("font-size", "25px")
    .style("font-family", "Arial");

  d3.selectAll("div.tooltip").remove();
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", `tooltip`)
    .style("position", "absolute")
    .style("opacity", 0);

  const label = svg.append("text").attr("text-anchor", "middle");

  label // for inner
    .append("tspan")
    .attr("class", "question1")
    .attr("x", 0)
    .attr("y", 0)
    .attr("dx", `${radius * 2 + 50}px`)
    .attr("dy", "-6em")
    .attr("font-size", "2.5em")
    .attr("fill", "#BBB")
    .text(innerCircleQuestion);

  label // for outer
    .append("tspan")
    .attr("class", "question2")
    .attr("x", 0)
    .attr("y", 0)
    .attr("dx", `${radius * 2 + 50}px`)
    .attr("dy", "-4em")
    .attr("font-size", "2.5em")
    .attr("fill", "#BBB")
    .text(outerCircleQuestion);

  label // answer
    .append("tspan")
    .attr("class", "sequence")
    .attr("x", 0)
    .attr("y", 0)
    .attr("dx", `${radius * 2 + 50}px`)
    .attr("dy", "-1em")
    .attr("font-size", "2.5em")
    .text("");

  label // percentage
    .append("tspan")
    .attr("class", "percentage")
    .attr("x", 0)
    .attr("y", 0)
    .attr("dx", 0)
    .attr("dy", "0em")
    .attr("font-size", "5em")
    .attr("fill", "#555")
    .text("");

  label // quantity
    .append("tspan")
    .attr("class", "dataValue")
    .attr("x", 0)
    .attr("y", 0)
    .attr("dx", 0)
    .attr("dy", "2em")
    .attr("font-size", "2em")
    .attr("fill", "#555")
    .text("");

  svg
    .attr("viewBox", `${-radius} ${-radius} ${width * 2.2} ${width}`)
    .style("max-width", `${width * 2}px`)
    .style("font", "12px sans-serif");

  const path = svg
    .append("g")
    .selectAll("path")
    .data(
      root.descendants().filter((d) => {
        return d.depth && d.x1 - d.x0 > 0.001;
      })
    )
    .join("path")
    .attr("fill", (d) => color(d.data.name))
    .attr("d", arc);

  svg
    .append("g")
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("mouseleave", () => {
      path.attr("fill-opacity", 1);
      element.value = { sequence: [], percentage: 0.0 };
      element.dispatchEvent(new CustomEvent("input"));
    })
    .selectAll("path")
    .data(
      root.descendants().filter((d) => {
        return d.depth && d.x1 - d.x0 > 0.001;
      })
    )
    .join("path")
    .attr("d", mousearc)
    .on("mouseover", (_evt, d) => {
      if (d.data.name === "減少包裝材及文宣印製") {
        tooltip
          .style("opacity", 1)
          .html(
            `減少包裝 &nbsp; <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"/></svg>`
          )
          .style("border-color", color(d.data.name));
      } else if (d.data.name === "使用無毒媒材、再生材料、廢物利用素材等") {
        tooltip
          .style("opacity", 1)
          .html(
            `再生材料 &nbsp; <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M174.7 45.1C192.2 17 223 0 256 0s63.8 17 81.3 45.1l38.6 61.7 27-15.6c8.4-4.9 18.9-4.2 26.6 1.7s11.1 15.9 8.6 25.3l-23.4 87.4c-3.4 12.8-16.6 20.4-29.4 17l-87.4-23.4c-9.4-2.5-16.3-10.4-17.6-20s3.4-19.1 11.8-23.9l28.4-16.4L283 79c-5.8-9.3-16-15-27-15s-21.2 5.7-27 15l-17.5 28c-9.2 14.8-28.6 19.5-43.6 10.5c-15.3-9.2-20.2-29.2-10.7-44.4l17.5-28zM429.5 251.9c15-9 34.4-4.3 43.6 10.5l24.4 39.1c9.4 15.1 14.4 32.4 14.6 50.2c.3 53.1-42.7 96.4-95.8 96.4L320 448v32c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-64-64c-9.4-9.4-9.4-24.6 0-33.9l64-64c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2v32l96.2 0c17.6 0 31.9-14.4 31.8-32c0-5.9-1.7-11.7-4.8-16.7l-24.4-39.1c-9.5-15.2-4.7-35.2 10.7-44.4zm-364.6-31L36 204.2c-8.4-4.9-13.1-14.3-11.8-23.9s8.2-17.5 17.6-20l87.4-23.4c12.8-3.4 26 4.2 29.4 17L182 241.2c2.5 9.4-.9 19.3-8.6 25.3s-18.2 6.6-26.6 1.7l-26.5-15.3L68.8 335.3c-3.1 5-4.8 10.8-4.8 16.7c-.1 17.6 14.2 32 31.8 32l32.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32.2 0C42.7 448-.3 404.8 0 351.6c.1-17.8 5.1-35.1 14.6-50.2l50.3-80.5z"/></svg>`
          )
          .style("border-color", color(d.data.name));
      } else if (d.data.name === "工作場所、活動展場的節約能源") {
        tooltip
          .style("opacity", 1)
          .html(
            `節約能源 &nbsp; <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2l0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4l0 0c19.8 27.1 39.7 54.4 49.2 86.2H272zM192 512c44.2 0 80-35.8 80-80V416H112v16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z"/></svg>`
          )
          .style("border-color", color(d.data.name));
      } else {
        tooltip
          .style("opacity", 1)
          .html(
            `${d.data.name} &nbsp; <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M407 47c9.4-9.4 24.6-9.4 33.9 0l17.2 17.2c1.9-.1 3.9-.2 5.8-.2h32c11.2 0 21.9 2.3 31.6 6.5L543 55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L564 101.9c7.6 12.2 12 26.7 12 42.1c0 10.2 7.4 18.8 16.7 23c27.9 12.5 47.3 40.5 47.3 73c0 26.2-12.6 49.4-32 64v32c0 8.8-7.2 16-16 16H560c-8.8 0-16-7.2-16-16V320H480v16c0 8.8-7.2 16-16 16H432c-8.8 0-16-7.2-16-16V318.4c-11.8-2.4-22.7-7.4-32-14.4c-1.5-1.1-2.9-2.3-4.3-3.5c-17-14.7-27.7-36.4-27.7-60.5c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 44.7 26.2 83.2 64 101.2V352c0 17.7 14.3 32 32 32h32v64c0 17.7-14.3 32-32 32H352c-17.7 0-32-14.3-32-32V372c-19.8 7.7-41.4 12-64 12s-44.2-4.3-64-12v76c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V329.1L45.9 369.7c-5.4 12.1-19.6 17.6-31.7 12.2S-3.3 362.4 2.1 350.3L24 300.9c5.3-11.9 8-24.7 8-37.7C32 155.7 117.2 68 223.8 64.1l.2-.1h7.2H256h32c41.7 0 83.4 12.1 117.2 25.7c1.7-1.8 3.5-3.6 5.3-5.2L407 81c-9.4-9.4-9.4-24.6 0-33.9zm73 185a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm88 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48zM480 144a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm48 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/></svg>`
          )
          .style("border-color", color(d.data.name));
      }
    })
    .on("mousemove", (evt, d) => {
      tooltip
        .style("top", evt.pageY - 10 + "px")
        .style("left", evt.pageX + 10 + "px");
    })
    .on("mouseout", () => {
      tooltip.style("opacity", 0);
    })
    .on("mouseenter", (event, d) => {
      // Get the ancestors of the current segment, minus the root

      //introduce
      if (d.data.name === "工作室") {
        div.html(
          "<ul><li>定義：藝術家創作藝術品的私人空間。它可以是一個房間、一棟建築或任何專為藝術製作而設的場所。</li><li>功能：用於藝術家進行創作，例如繪畫、雕塑或任何其他形式的藝術。</li><li>特色：它是一個私密的空間，藝術家可以在這裡自由地實驗、嘗試並發展他們的技巧和創意。</li></ul>"
        );
      } else if (d.data.name === "替代空間") {
        div.html(
          "<ul><li>定義：非傳統和非商業的展示空間。可以是臨時或長期的存在，但不同於傳統的美術館和畫廊。</li><li>功能：提供一個展示非主流、實驗性或邊緣藝術的場所。這些空間通常更加開放、靈活，能夠接受更多風格和形式的藝術品。</li><li>特色：是藝術家、策展人或社群自組、自發的，對於藝術家來說，這樣的空間提供了更多的自由和可能性。</li></ul>"
        );
      } else if (d.data.name === "美術館") {
        div.html(
          "<ul><li>定義：為了展示、保護和研究藝術品而設立的公共或私人機構。</li><li>功能：除了展示藝術品，美術館也負責藝術品的保護、修復、研究和教育等功能。</li><li>特色：通常有較為正式和嚴謹的運作模式。它們可能有長期或特定主題的展覽，且會對藝術品有一定的選擇和評價標準。</li></ul>"
        );
      } else {
        div.html("");
      }

      // dataValue
      label
        .style("visibility", null)
        .select(".dataValue")
        .text("計數：" + d.value);

      // question
      if (d.depth - 1 === 0) {
        label
          .style("visibility", null)
          .select(".question1")
          .attr("fill", "#000");
        label
          .style("visibility", null)
          .select(".question2")
          .attr("fill", "#BBB");
      } else if (d.depth - 1 === 1) {
        label
          .style("visibility", null)
          .select(".question1")
          .attr("fill", "#BBB");
        label
          .style("visibility", null)
          .select(".question2")
          .attr("fill", "#000");
      }

      const sequence = d.ancestors().reverse().slice(1);
      // Highlight the ancestors
      path.attr("fill-opacity", (node) =>
        sequence.indexOf(node) >= 0 ? 1.0 : 0.3
      );

      label
        .style("visibility", null)
        .select(".sequence")
        .attr("fill", (sequence) => color(d.data.name))
        .text(d.data.name);
      const percentage = ((100 * d.value) / root.value).toPrecision(3);
      label
        .style("visibility", null)
        .select(".percentage")
        .text(percentage + "%");

      element.value = { sequence, percentage };
      element.dispatchEvent(new CustomEvent("input"));
    });

  return element;
}

function _plot2(Inputs) {
  return Inputs.form({
    Size: Inputs.range([200, 640], { label: "Size", step: 1 }),
  });
}

function _12(md) {
  return md`
### 結論

1. 大部分的問券填寫者都與藝術行業相關（不論是直接間接）
2. 節約能源、再生材料、減少包裝佔大多數的減少碳排放行為
3. 大部分藝術工作者都會減少包裝的行動來減少碳排放量
4. 美術館的藝術工作者也會節約工作場所的能源，而再生材料相較於其他場所來說則不是他們的前三名
  `;
}

function _breadcrumbPoints(breadcrumbWidth, breadcrumbHeight) {
  return function breadcrumbPoints(d, i) {
    const tipWidth = 10;
    const points = [];
    points.push("0,0");
    points.push(`${breadcrumbWidth},0`);
    points.push(`${breadcrumbWidth + tipWidth},${breadcrumbHeight / 2}`);
    points.push(`${breadcrumbWidth},${breadcrumbHeight}`);
    points.push(`0,${breadcrumbHeight}`);
    if (i > 0) {
      points.push(`${tipWidth},${breadcrumbHeight / 2}`);
    }
    return points.join(" ");
  };
}

function _buildHierarchy() {
  return function buildHierarchy(csv) {
    const root = { name: "root", children: [] };
    for (let i = 0; i < csv.length; i++) {
      const sequence = csv[i][0];
      const size = +csv[i][1];
      if (isNaN(size)) {
        continue;
      }
      const parts = sequence.split("-");
      let currentNode = root;
      for (let j = 0; j < parts.length; j++) {
        const children = currentNode["children"];
        const nodeName = parts[j];
        let childNode = null;
        if (j + 1 < parts.length) {
          let foundChild = false;
          for (let k = 0; k < children.length; k++) {
            if (children[k]["name"] == nodeName) {
              childNode = children[k];
              foundChild = true;
              break;
            }
          }
          if (!foundChild) {
            childNode = { name: nodeName, children: [] };
            children.push(childNode);
          }
          currentNode = childNode;
        } else {
          childNode = { name: nodeName, value: size };
          children.push(childNode);
        }
      }
    }
    return root;
  };
}

function _partition(d3, radius) {
  return (data) =>
    d3.partition().size([2 * Math.PI, radius * radius])(
      d3
        .hierarchy(data)
        .sum((d) => d.value)
        .sort((a, b) => b.value - a.value)
    );
}

function _mousearc(d3, radius) {
  return d3
    .arc()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .innerRadius((d) => Math.sqrt(d.y0))
    .outerRadius(radius);
}

function _arc(d3, radius) {
  return d3
    .arc()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .padAngle(1 / radius)
    .padRadius(radius)
    .innerRadius((d) => Math.sqrt(d.y0))
    .outerRadius((d) => Math.sqrt(d.y1) - 1);
}

function _width(plot2) {
  return plot2.Size;
}

function _radius(width) {
  return width / 2;
}

function _breadcrumbWidth() {
  return 75;
}

function _breadcrumbHeight() {
  return 30;
}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() {
    return this.url;
  }
  const fileAttachments = new Map([
    [
      "artist@1.csv",
      {
        url: new URL("../artist.csv", import.meta.url),
        mimeType: "text/csv",
        toString,
      },
    ],
  ]);
  main.builtin(
    "FileAttachment",
    runtime.fileAttachments((name) => fileAttachments.get(name))
  );
  main.variable(observer()).define(["md"], _1);
  main
    .variable(observer("artist"))
    .define("artist", ["FileAttachment"], _artist);
  main.variable(observer()).define(["__query", "artist", "invalidation"], _3);
  main
    .variable(observer("innerCircleQuestion"))
    .define("innerCircleQuestion", ["artist"], _innerCircleQuestion);
  main
    .variable(observer("outerCircleQuestion"))
    .define("outerCircleQuestion", ["artist"], _outerCircleQuestion);
  main.variable(observer("color")).define("color", ["d3"], _color);
  main.variable(observer()).define(["htl"], _7);
  main
    .variable(observer("data"))
    .define(
      "data",
      [
        "artist",
        "innerCircleQuestion",
        "outerCircleQuestion",
        "buildHierarchy",
      ],
      _data
    );
  main
    .variable(observer("breadcrumb"))
    .define(
      "breadcrumb",
      [
        "d3",
        "breadcrumbWidth",
        "breadcrumbHeight",
        "sunburst",
        "breadcrumbPoints",
        "color",
      ],
      _breadcrumb
    );
  main
    .variable(observer("viewof sunburst"))
    .define(
      "viewof sunburst",
      [
        "partition",
        "data",
        "d3",
        "radius",
        "innerCircleQuestion",
        "outerCircleQuestion",
        "width",
        "color",
        "arc",
        "mousearc",
      ],
      _sunburst
    );
  main
    .variable(observer("sunburst"))
    .define("sunburst", ["Generators", "viewof sunburst"], (G, _) =>
      G.input(_)
    );
  main
    .variable(observer("viewof plot2"))
    .define("viewof plot2", ["Inputs"], _plot2);
  main
    .variable(observer("plot2"))
    .define("plot2", ["Generators", "viewof plot2"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _12);
  main
    .variable(observer("breadcrumbPoints"))
    .define(
      "breadcrumbPoints",
      ["breadcrumbWidth", "breadcrumbHeight"],
      _breadcrumbPoints
    );
  main
    .variable(observer("buildHierarchy"))
    .define("buildHierarchy", _buildHierarchy);
  main
    .variable(observer("partition"))
    .define("partition", ["d3", "radius"], _partition);
  main
    .variable(observer("mousearc"))
    .define("mousearc", ["d3", "radius"], _mousearc);
  main.variable(observer("arc")).define("arc", ["d3", "radius"], _arc);
  main.variable(observer("width")).define("width", ["plot2"], _width);
  main.variable(observer("radius")).define("radius", ["width"], _radius);
  main
    .variable(observer("breadcrumbWidth"))
    .define("breadcrumbWidth", _breadcrumbWidth);
  main
    .variable(observer("breadcrumbHeight"))
    .define("breadcrumbHeight", _breadcrumbHeight);
  return main;
}
