function copyColor(id) {
  let el = document.getElementById(id);
  let colorDiv = el.querySelector(".color");
  let bgColor = window.getComputedStyle(colorDiv).backgroundColor;
  colorDiv.navigator.clipboard.writeText(bgColor);
  console.log(`Copiato testo: ${bgColor}`);
}

function copyElement(element) {
  let classes = element.classList;
  navigator.clipboard.writeText(String(element.outerHTML));
  console.log(element);
}
