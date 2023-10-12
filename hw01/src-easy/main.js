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

function WebOnLoad() {
  AppleTable();
}
