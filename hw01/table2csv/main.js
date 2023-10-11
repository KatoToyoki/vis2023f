function CreateTable() {
  let table = document.getElementById("score_table");
  table.innerHTML = "";

  table.appendChild(CreateHeaderRow());

  for (let i = 0; i < 120; i++) {
    table.appendChild(CreateOneRow(i + 1));
  }
}

function CreateHeaderRow() {
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

  return PushDataToRow(headerRowContents);
}

function CreateOneRow(index) {
  let rowData = [];

  rowData.push(index);
  rowData.push("資工四");
  rowData.push(109590 + index.toString().padStart(3, "0"));
  rowData.push(GenerateName());
  rowData.push(GenerateAccount());
  for (let i = 0; i < 10; i++) {
    rowData.push(Math.floor(Math.random() * 10));
  }

  return PushDataToRow(rowData);
}

function PushDataToRow(data) {
  let row = document.createElement("tr");
  for (let i = 0; i < 15; i++) {
    let col = document.createElement("td");
    col.textContent = data[i];
    row.appendChild(col);
  }

  return row;
}

function GenerateName() {
  let name = "";
  for (let i = 0; i < 3; i++) {
    /*
     * generate one chinese word
     * https://cnodejs.org/topic/5af184f10a36e5312d6ece55
     */
    name += String.fromCodePoint(Math.round(Math.random() * 20901) + 19968);
  }
  return name;
}

function GenerateAccount() {
  let length = Math.floor(Math.random() * (10 - 4 + 1) + 4);
  let accountName = "";

  /*
   * convert ASCII to char
   * https://stackoverflow.com/questions/94037/convert-character-to-ascii-code-in-javascript
   */
  accountName += String.fromCharCode(
    Math.floor(Math.random() * (90 - 65 + 1) + 65)
  );
  for (let i = 0; i < length - 3; i++) {
    accountName += String.fromCharCode(
      Math.floor(Math.random() * (122 - 97 + 1) + 97)
    );
  }
  accountName += String.fromCharCode(
    Math.floor(Math.random() * (57 - 48 + 1) + 48)
  );

  return accountName;
}
