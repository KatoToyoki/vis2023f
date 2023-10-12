function CSVtoTable() {
  let reader = new FileReader();
  let table = document.getElementById("score_table");
  reader.readAsText("../score.csv");
}
