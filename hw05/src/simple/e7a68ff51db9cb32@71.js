function _1(md) {
  return md`
# HW05 Simple baseline
  `;
}

function _2(md) {
  return md`
### Simple baseLine --實作 Force-directed tree 呈現小組情況(1pt)
  `;
}

function _simple1(d3, all, invalidation) {
  const width = 1000;
  const height = 1200;

  const root = d3.hierarchy(all);
  const links = root.links();
  const nodes = root.descendants();

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3
        .forceLink(links)
        .id((d) => d.id)
        .distance(100)
        .strength(1)
    )
    .force("charge", d3.forceManyBody().strength(-400))
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  const link = svg
    .append("g")
    .attr("stroke", "#00f")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line");

  const linkForce = d3
    .forceLink(links)
    .id((d) => d.id)
    .distance(1000)
    .strength(1);

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  const node = svg
    .append("g")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .attr("transform", (d) => `translate(${d.x},${d.y})`);

  const circleRadius = 20;
  node
    .append("circle")
    .attr("r", circleRadius)
    .attr("fill", "white")
    .attr("stroke", (d) => colorScale(d.depth))
    .attr("stroke-width", 3);

  nodes.forEach((node) => {
    node.y = 0;
  });

  simulation.force(
    "y",
    d3
      .forceY()
      .strength(0.1)
      .y((d) => d.depth * 100)
  );

  simulation.on("tick", () => {
    node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);
  });

  invalidation.then(() => simulation.stop());

  return svg.node();
}

function _4(md) {
  return md`
### Simple baseLine--使節點可以被拖拉移動(1pt)
  `;
}

function _simple2(d3, all, drag, invalidation) {
  const width = 1000;
  const height = 1200;

  const root = d3.hierarchy(all);
  const links = root.links();
  const nodes = root.descendants();

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3
        .forceLink(links)
        .id((d) => d.id)
        .distance(100)
        .strength(1)
    )
    .force("charge", d3.forceManyBody().strength(-400))
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  const link = svg
    .append("g")
    .attr("stroke", "#00f")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line");

  const linkForce = d3
    .forceLink(links)
    .id((d) => d.id)
    .distance(1000)
    .strength(1);

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  const node = svg
    .append("g")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .attr("transform", (d) => `translate(${d.x},${d.y})`)
    .call(drag(simulation));

  const circleRadius = 20;
  node
    .append("circle")
    .attr("r", circleRadius)
    .attr("fill", "white")
    .attr("stroke", (d) => colorScale(d.depth))
    .attr("stroke-width", 3);

  nodes.forEach((node) => {
    node.y = 0;
  });

  simulation.force(
    "y",
    d3
      .forceY()
      .strength(0.1)
      .y((d) => d.depth * 100)
  );

  simulation.on("tick", () => {
    node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);
  });

  invalidation.then(() => simulation.stop());

  return svg.node();
}

function _6(md) {
  return md`
### Simple baseLine--將個人圖片放入節點圓圈中(1pt)
  `;
}

function _simple3(d3, all, drag, invalidation) {
  const width = 1000;
  const height = 1200;

  const root = d3.hierarchy(all);
  const links = root.links();
  const nodes = root.descendants();

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3
        .forceLink(links)
        .id((d) => d.id)
        .distance(100)
        .strength(1)
    )
    .force("charge", d3.forceManyBody().strength(-400))
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  const link = svg
    .append("g")
    .attr("stroke", "#00f")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line");

  const linkForce = d3
    .forceLink(links)
    .id((d) => d.id)
    .distance(1000)
    .strength(1);

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  const node = svg
    .append("g")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .attr("transform", (d) => `translate(${d.x},${d.y})`)
    .call(drag(simulation));

  const circleRadius = 20;
  node
    .append("circle")
    .attr("r", circleRadius)
    .attr("fill", "white")
    .attr("stroke", (d) => colorScale(d.depth))
    .attr("stroke-width", 3);

  const size_offset = 1.2;

  const offset = size_offset / 2;

  node
    .append("image")
    .attr("x", -(circleRadius * offset))
    .attr("y", -(circleRadius * offset))
    .attr("width", circleRadius * size_offset)
    .attr("height", circleRadius * size_offset)
    .attr("href", (d) => d.data.image_url);

  nodes.forEach((node) => {
    node.y = 0;
  });

  simulation.force(
    "y",
    d3
      .forceY()
      .strength(0.1)
      .y((d) => d.depth * 100)
  );

  simulation.on("tick", () => {
    node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);
  });

  invalidation.then(() => simulation.stop());

  return svg.node();
}

function _simple(FileAttachment) {
  return FileAttachment("simple.json").json();
}

function _all(FileAttachment) {
  return FileAttachment("output.json").json();
}

function _drag(d3) {
  return (simulation) => {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };
}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() {
    return this.url;
  }
  const fileAttachments = new Map([
    [
      "output.json",
      {
        url: new URL("../output.json", import.meta.url),
        mimeType: "application/json",
        toString,
      },
    ],
    [
      "simple.json",
      {
        url: new URL("../simple.json", import.meta.url),
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
  main.variable(observer()).define(["md"], _2);
  main
    .variable(observer("simple1"))
    .define("simple1", ["d3", "all", "invalidation"], _simple1);
  main.variable(observer()).define(["md"], _4);
  main
    .variable(observer("simple2"))
    .define("simple2", ["d3", "all", "drag", "invalidation"], _simple2);
  main.variable(observer()).define(["md"], _6);
  main
    .variable(observer("simple3"))
    .define("simple3", ["d3", "all", "drag", "invalidation"], _simple3);
  main
    .variable(observer("simple"))
    .define("simple", ["FileAttachment"], _simple);
  main.variable(observer("all")).define("all", ["FileAttachment"], _all);
  main.variable(observer("drag")).define("drag", ["d3"], _drag);
  return main;
}
