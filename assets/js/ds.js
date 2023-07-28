function copyColor(id) {
  let el = document.getElementById(id);
  let colorDiv = el.querySelector(".color");
  let bgColor = window.getComputedStyle(colorDiv).backgroundColor;

  navigator.clipboard.writeText(bgColor);
  console.log(`Copiato testo: ${bgColor}`);
}
