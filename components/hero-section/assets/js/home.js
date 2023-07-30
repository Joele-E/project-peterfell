let heroCards = document.querySelectorAll(".hero-card");
let heroSecOverlay = document.getElementById("hero-overlay");
let firstCard = document.querySelector(".hero-section-first-card");

firstCard.addEventListener("mouseover", (event) => {
  heroSecOverlay.style.backgroundImage = `url("assets/img/bgimage1.jpg")`;
});

for (let i = 0; i < heroCards.length; i++) {
  heroCards[i].addEventListener("mouseover", (event) => {
    heroSecOverlay.style.backgroundImage = `url("assets/img/bgimage${
      i + 2
    }.jpg")`;
  });
}
