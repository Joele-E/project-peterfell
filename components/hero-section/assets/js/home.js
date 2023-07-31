// variabili
let heroCards = document.querySelectorAll(".hero-card");
let heroSecOverlay = document.getElementById("hero-overlay");
let firstCard = document.querySelector(".hero-section-first-card");
let homeNavbar = document.getElementById("home-navbar");

// evento per hover su prima card hero-section (resetta bg)
firstCard.addEventListener("mouseover", (event) => {
  heroSecOverlay.style.backgroundImage = `url("assets/img/bgimage1.jpg")`;
});

// aggiungi evento hover a tutte le card hero section e
// cambia bgimage in base alla card
for (let i = 0; i < heroCards.length; i++) {
  heroCards[i].addEventListener("mouseover", (event) => {
    heroSecOverlay.style.backgroundImage = `url("assets/img/bgimage${
      i + 2
    }.jpg")`;
  });
}

// evento scroll per cambiare colore navbar
document.addEventListener("scroll", (event) => {
  let scroll = this.scrollY;
  let firstSpan = homeNavbar.querySelector(".logo").children[0];
  let secondSpan = homeNavbar.querySelector(".logo").children[1];
  let menuText = document.getElementById("navbar-text-menu");
  let menuDt = document.getElementById("navbar-text-dt");
  let heroHeight = heroSecOverlay.offsetHeight;

  let navbarIcons = homeNavbar.querySelectorAll(".navbar-icon");

  console.log(navbarIcons);

  if (scroll > 0) {
    firstSpan.style.fontSize = ".6em";
    secondSpan.style.fontSize = ".6em";
    menuText.innerHTML = "";
    menuDt.innerHTML = "";

    if (scroll > heroHeight - 5) {
      firstSpan.style.color = "#404041";
      secondSpan.style.color = "#7a99ac";
      navbarIcons.forEach((el) => {
        el.style.fill = "#7a99ac";
      });
    } else {
      firstSpan.style.color = "#fff";
      secondSpan.style.color = "#fff";
      navbarIcons.forEach((el) => {
        el.style.fill = "#fff";
      });
    }
  } else {
    firstSpan.style.fontSize = "1em";
    secondSpan.style.fontSize = "1em";
    menuText.innerHTML = "Menu";
    menuDt.innerHTML = "Design Tool";
  }
});
