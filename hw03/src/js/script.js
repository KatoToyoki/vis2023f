function toggleImage(floorId) {
  const floorElement = document.getElementById(floorId);
  const checkbox = floorElement.querySelector(".show-image");
  const img = floorElement.querySelector("img");

  if (checkbox.checked) {
    img.src = `../svg/new${floorId.slice(-1)}F.svg`;
  } else {
    img.src = `../svg/no${floorId.slice(-1)}F.svg`;
  }
}

document.addEventListener("change", function (event) {
  if (event.target.classList.contains("show-image")) {
    const floorId = event.target.closest(".floor").id;
    toggleImage(floorId);
  }
});
