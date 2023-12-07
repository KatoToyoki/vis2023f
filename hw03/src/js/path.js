const icon = document.getElementById("icon");
const jsonUrl = "../json/userLocationData.json";
let currentIndex = 0;
let currentFloor = "1F";

function calculatePosition(x, y) {
  const minX = 10.45;
  const maxX = 60.47;
  const minY = -11.64;
  const maxY = 15.91;
  const iconX = ((x - minX) / (maxX - minX)) * 100;
  const iconY = ((y - minY) / (maxY - minY)) * 100;

  return { x: iconX, y: iconY };
}

function updateIconPosition(x, y) {
  console.log(x, y);
  const { x: iconX, y: iconY } = calculatePosition(x, y);
  icon.style.left = `${iconX}%`;
  icon.style.top = `${iconY}%`;
}

function loadjson() {
  fetch(jsonUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.length > 0) {
        const point = data[currentIndex];

        if (point.Floor !== currentFloor) {
          console.log(`Switched to Floor ${point.Floor}`);
          currentFloor = point.Floor;
        }

        updateIconPosition(point.X, point.Y);
        currentIndex++;

        if (currentIndex >= data.length) {
          currentIndex = 0;
        }
      }
    })
    .catch((error) => console.error("Error fetching or parsing JSON:", error));
}

loadjson();

setInterval(loadjson, 1000);
