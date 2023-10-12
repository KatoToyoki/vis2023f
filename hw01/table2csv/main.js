let tableData = [];

function CreateTable() {
  let table = document.getElementById("score_table");
  table.innerHTML = "";
  table.appendChild(CreateHeaderRow());

  let studentQ = GenerateStudentQ();
  let counter = 0;

  for (let i = 0; i < studentQ.length; i++) {
    let first = Math.floor(
      Math.random() * (studentQ[i] - studentQ[i] / 3) + studentQ[i] / 3
    );
    let second = studentQ[i] - first;

    for (let j = 0; j < studentQ[i]; j++) {
      table.appendChild(CreateOneRow(counter + 1, tableData, i));
      counter++;
    }
  }

  tableData = tableData.join("\n");
}

function GenerateStudentQ() {
  let studentQ = [];
  let sum = 0;
  for (let i = 0; i < 4; i++) {
    temp = Math.floor(Math.random() * ((120 - sum) / 2 - 1) + 1);
    studentQ.push(temp);
    sum += temp;
  }
  studentQ.push(120 - sum);
  return studentQ;
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

  tableData.push(headerRowContents);

  return PushDataToRow(headerRowContents);
}

function CreateOneRow(index, container, classIndex) {
  let rowData = [];

  rowData.push(index);

  let studentInformation = GenerateClassAndId(classIndex);
  rowData.push(studentInformation[0]);
  rowData.push(studentInformation[1]);

  rowData.push(GenerateName());
  rowData.push(GenerateAccount());
  for (let i = 0; i < 10; i++) {
    rowData.push(Math.floor(Math.random() * 10));
  }

  container.push(rowData.join(","));

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

function GenerateClassAndId(classIndex) {
  const classes = ["資工", "資工碩", "電資AI", "電資資安", "創新AI"];
  const departmentCode = ["590", "598", "C52", "C53", "C71"];

  const year = [111, 112];
  const grade = ["三", "四"];

  let temp = Math.random() < 0.5 ? 0 : 1;

  let theClass = classes[classIndex] + grade[temp];
  let studentID =
    year[temp] +
    departmentCode[classIndex] +
    Math.floor(Math.random() * (999 - 1) + 1)
      .toString()
      .padStart(3, "0");

  return [theClass, studentID];
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
  let length = 10;
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
  for (let i = 0; i < 2; i++) {
    accountName += String.fromCharCode(
      Math.floor(Math.random() * (57 - 48 + 1) + 48)
    );
  }

  return accountName;
}

/**
 * turn table to csv file and download it
 * take references about the covert to csv file and download part
 * https://www.geeksforgeeks.org/how-to-export-html-table-to-csv-using-javascript/
 */
function DownloadCSVFile() {
  // Create CSV file object and feed our
  // csv_data into it
  CSVFile = new Blob([tableData], { type: "text/csv" });

  // Create to temporary link to initiate
  // download process
  var temp_link = document.createElement("a");

  // Download csv file
  temp_link.download = "score.csv";
  var url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;

  // This link should not be displayed
  temp_link.style.display = "none";
  document.body.appendChild(temp_link);

  // Automatically click the link to trigger download
  temp_link.click();
  document.body.removeChild(temp_link);
}
