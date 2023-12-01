function _1(md) {
  return md`
# HW05 Medium baseline
  `;
}

function _2(md) {
  return md`
### Medium baseline--滑鼠移動過去顯示該成員相關資訊(1pt)
  `;
}

function _medium1(d3, all, drag, invalidation) {
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

  node
    .on("mouseover", (event, d) => {
      console.log("Mouseover event:", d);
    })
    .append("title")
    .text((d) => {
      if (d.data.leval == 1) {
        return d.data.Name;
      } else if (d.data.leval == 2) {
        return (
          "組別 : " +
          d.data.Group +
          "\n組長 : " +
          d.data.Teamleadername +
          "\n隊名 : " +
          d.data.Teamname +
          "\n團隊里程數 : " +
          d.data.Team_Mileage
        );
      } else if (d.data.leval == 3) {
        return (
          "系所 : " +
          d.data.Department +
          "\n學號 : " +
          d.data.Classnumber +
          "\n姓名 : " +
          d.data.Name +
          "\n個人里程數 : " +
          d.data.Personal_Mileage +
          "\n作業1成績 : " +
          d.data.Hw1_score +
          "分\n作業2成績 : " +
          d.data.Hw2_score +
          "分\n作業3成績 : " +
          d.data.Hw3_score +
          "分\n作業4成績 : " +
          d.data.Hw4_score +
          "分\n作業5成績 : " +
          d.data.Hw5_score +
          "分\n作業6成績 : " +
          d.data.Hw6_score +
          "分\n作業7成績 : " +
          d.data.Hw7_score +
          "分\n作業8成績 : " +
          d.data.Hw8_score +
          "分\n作業9成績 : " +
          d.data.Hw9_score +
          "分\n作業10成績 : " +
          d.data.Hw10_score +
          "分"
        );
      }
    });

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
### Medium baseline--滑鼠移動過去放大節點與圖片(2pt)
  `;
}

function _medium2(d3, all, drag, invalidation) {
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
    .call(drag(simulation))
    .on("mouseenter", (event, d) => {
      if (d.data.leval === 2 || d.data.leval === 3) {
        const enlargement = 4;
        const newWidth = circleRadius * size_offset * enlargement;
        const newHeight = circleRadius * size_offset * enlargement;

        const xOffset = -(newWidth - circleRadius * size_offset) / 2;
        const yOffset = -(newHeight - circleRadius * size_offset) / 2;

        d3.select(event.currentTarget)
          .select("circle")
          .attr("r", circleRadius * enlargement);
        d3.select(event.currentTarget)
          .select("image")
          .attr("width", newWidth)
          .attr("height", newHeight)
          .attr("x", xOffset)
          .attr("y", yOffset);
      }
    })
    .on("mouseleave", (event, d) => {
      d3.select(event.currentTarget).select("circle").attr("r", circleRadius);
      d3.select(event.currentTarget)
        .select("image")
        .attr("width", circleRadius * size_offset)
        .attr("height", circleRadius * size_offset)
        .attr("x", -(circleRadius * offset))
        .attr("y", -(circleRadius * offset));
    });

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

  node.append("title").text((d) => {
    if (d.data.leval == 1) {
      return d.data.Name;
    } else if (d.data.leval == 2) {
      return (
        "組別 : " +
        d.data.Group +
        "\n組長 : " +
        d.data.Teamleadername +
        "\n隊名 : " +
        d.data.Teamname +
        "\n團隊里程數 : " +
        d.data.Team_Mileage
      );
    } else if (d.data.leval == 3) {
      return (
        "系所 : " +
        d.data.Department +
        "\n學號 : " +
        d.data.Classnumber +
        "\n姓名 : " +
        d.data.Name +
        "\n個人里程數 : " +
        d.data.Personal_Mileage +
        "\n作業1成績 : " +
        d.data.Hw1_score +
        "分\n作業2成績 : " +
        d.data.Hw2_score +
        "分\n作業3成績 : " +
        d.data.Hw3_score +
        "分\n作業4成績 : " +
        d.data.Hw4_score +
        "分\n作業5成績 : " +
        d.data.Hw5_score +
        "分\n作業6成績 : " +
        d.data.Hw6_score +
        "分\n作業7成績 : " +
        d.data.Hw7_score +
        "分\n作業8成績 : " +
        d.data.Hw8_score +
        "分\n作業9成績 : " +
        d.data.Hw9_score +
        "分\n作業10成績 : " +
        d.data.Hw10_score +
        "分"
      );
    }
  });

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
### Medium baseline--點擊節點可以展開或縮放(2pt)
  `;
}

function _medium3(d3, all, drag, invalidation) {
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
    .call(drag(simulation))
    .on("click", toggleNode)
    .on("mouseenter", (event, d) => {
      if (d.data.leval === 2 || d.data.leval === 3) {
        const enlargement = 4;
        const newWidth = circleRadius * size_offset * enlargement;
        const newHeight = circleRadius * size_offset * enlargement;

        const xOffset = -(newWidth - circleRadius * size_offset) / 2;
        const yOffset = -(newHeight - circleRadius * size_offset) / 2;

        d3.select(event.currentTarget)
          .select("circle")
          .attr("r", circleRadius * enlargement);
        d3.select(event.currentTarget)
          .select("image")
          .attr("width", newWidth)
          .attr("height", newHeight)
          .attr("x", xOffset)
          .attr("y", yOffset);
      }
    })
    .on("mouseleave", (event, d) => {
      d3.select(event.currentTarget).select("circle").attr("r", circleRadius);
      d3.select(event.currentTarget)
        .select("image")
        .attr("width", circleRadius * size_offset)
        .attr("height", circleRadius * size_offset)
        .attr("x", -(circleRadius * offset))
        .attr("y", -(circleRadius * offset));
    });

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

  node.append("title").text((d) => {
    if (d.data.leval == 1) {
      return d.data.Name;
    } else if (d.data.leval == 2) {
      return (
        "組別 : " +
        d.data.Group +
        "\n組長 : " +
        d.data.Teamleadername +
        "\n隊名 : " +
        d.data.Teamname +
        "\n團隊里程數 : " +
        d.data.Team_Mileage
      );
    } else if (d.data.leval == 3) {
      return (
        "系所 : " +
        d.data.Department +
        "\n學號 : " +
        d.data.Classnumber +
        "\n姓名 : " +
        d.data.Name +
        "\n個人里程數 : " +
        d.data.Personal_Mileage +
        "\n作業1成績 : " +
        d.data.Hw1_score +
        "分\n作業2成績 : " +
        d.data.Hw2_score +
        "分\n作業3成績 : " +
        d.data.Hw3_score +
        "分\n作業4成績 : " +
        d.data.Hw4_score +
        "分\n作業5成績 : " +
        d.data.Hw5_score +
        "分\n作業6成績 : " +
        d.data.Hw6_score +
        "分\n作業7成績 : " +
        d.data.Hw7_score +
        "分\n作業8成績 : " +
        d.data.Hw8_score +
        "分\n作業9成績 : " +
        d.data.Hw9_score +
        "分\n作業10成績 : " +
        d.data.Hw10_score +
        "分"
      );
    }
  });

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

  function toggleNode(event, d) {
    if (d.data.leval == 1) {
      var trans = true;
      nodes.forEach((node) => {
        if (node.data.leval == 2) {
          node.collapsed = !node.collapsed;
          trans = node.collapsed;
        } else if (node.data.leval == 3 && trans) {
          node.collapsed = trans;
        }
      });
    } else if (d.data.leval == 2) {
      var G = d.data.Group;
      nodes.forEach((node) => {
        if (node.data.leval > 2 && node.data.Group == G) {
          node.collapsed = !node.collapsed;
        }
      });
    }
    update();
  }

  function update() {
    node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);
    node.style("display", (d) => (d.collapsed ? "none" : null));
    link.style("display", (d) => (d.target.collapsed ? "none" : null));
  }
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
      "simple.json",
      {
        url: new URL("../simple.json", import.meta.url),
        mimeType: "application/json",
        toString,
      },
    ],
    [
      "output.json",
      {
        url: new URL("../output.json", import.meta.url),
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
    .variable(observer("medium1"))
    .define("medium1", ["d3", "all", "drag", "invalidation"], _medium1);
  main.variable(observer()).define(["md"], _4);
  main
    .variable(observer("medium2"))
    .define("medium2", ["d3", "all", "drag", "invalidation"], _medium2);
  main.variable(observer()).define(["md"], _6);
  main
    .variable(observer("medium3"))
    .define("medium3", ["d3", "all", "drag", "invalidation"], _medium3);
  main
    .variable(observer("simple"))
    .define("simple", ["FileAttachment"], _simple);
  main.variable(observer("all")).define("all", ["FileAttachment"], _all);
  main.variable(observer("drag")).define("drag", ["d3"], _drag);
  return main;
}
