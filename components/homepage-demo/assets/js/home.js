// variabili
let heroCards = document.querySelectorAll(".hero-card");
let heroSecOverlay = document.getElementById("hero-overlay");
let firstCard = document.querySelector(".hero-section-first-card");
/* let homeNavbar = document.getElementById("home-navbar"); */

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
  let firstSpan = document.getElementById("firstLogoHalf");
  let secondSpan = document.getElementById("secondLogoHalf");
  let menuText = document.getElementById("navbar-text-menu");
  let menuDt = document.getElementById("navbar-text-dt");
  let heroHeight = heroSecOverlay.offsetHeight;

  let navbarIcons = document.querySelectorAll(".navbar-icon");

  navbarIcons.forEach((el) => {
    el.style.transition = "0.1s all";
  });

  // console.log(navbarIcons);

  if (scroll > 0) {
    firstSpan.style.fontSize = ".6em";
    secondSpan.style.fontSize = ".6em";
    /* menuText.innerHTML = ""; */

    menuText.style.fontSize = 0;
    menuDt.style.fontSize = 0;

    /* if (scroll > heroHeight - 5) {
      firstSpan.style.color = "#404041";
      secondSpan.style.color = "#7a99ac";
      navbarIcons.forEach((el) => {
        el.style.transition = "0.1s all";
        el.style.fill = "#7a99ac";
      }); */
    if (scroll > heroHeight - 5) {
      firstSpan.style.color = "#404041";
      secondSpan.style.color = "#7a99ac";
      navbarIcons[0].src = "assets/img/Icon-Menu-1.png";
      navbarIcons[1].src = "assets/img/Icon-Tool-1.png";
      navbarIcons[2].src = "assets/img/Icon-Cart-1.png";
    } else {
      firstSpan.style.color = "#fff";
      secondSpan.style.color = "#fff";
      navbarIcons[0].src = "assets/img/Icon-Menu-White.png";
      navbarIcons[1].src = "assets/img/Icon-Tool-White.png";
      navbarIcons[2].src = "assets/img/Icon-Cart-White.png";
    }
  } else {
    firstSpan.style.fontSize = "1em";
    secondSpan.style.fontSize = "1em";
    /* menuText.innerHTML = "Menu"; */
    menuText.style.fontSize = "14px";
    menuDt.style.fontSize = "14px";
  }
});

class DesignTool {
  step;
  currentStep;
  constructor() {
    this.steps = {
      1: "../component-step1/index.html",
      2: "../step2/index.html",
    };
    this.currentStep = 1;
  }

  fetchPage() {
    // console.log(this.steps[`${this.currentStep}`]);
    fetch("../component-step1/index.html")
      .then((res) => res.text())
      .then((myPage) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(myPage, "text/html");
        let div = document.createElement("div");
        let content = doc.querySelector("body").outerHTML;
        let btn1 = doc.getElementById("btn-1");
        btn1.addEventListener("click", () => console.log("ciao"));
        div.innerHTML = content;
        div.style.top = "0";
        div.style.zIndex = "1000";
        div.style.position = "absolute";
        div.classList.add("w-full", "h-full");

        let containerHp = document.querySelector("#container-hp");
        containerHp.classList.add("hidden");

        document.body.appendChild(div);
      });
  }
  nextPage() {
    this.currentStep++;
    this.fetchPage();
  }
}

let prova = new DesignTool();
prova.fetchPage();

class Menu {
  openMenu() {
    fetch("../menu/index.html")
      .then((res) => res.text())
      .then((myPage) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(myPage, "text/html");
        let div = document.createElement("div");
        let content = doc.querySelector("body").outerHTML;
        div.innerHTML = content;
        div.style.top = "0";
        div.style.zIndex = "1000";
        div.style.position = "absolute";
        div.classList.add("w-full", "h-full");
        let containerHp = document.querySelector("#container-hp");
        containerHp.classList.add("hidden");

        document.body.appendChild(div);
      });
  }
}
// let provaMenu = new Menu();

// let btnMenu = document.getElementById("navbar-text-menu");
// console.log(btnMenu);
// btnMenu.addEventListener("click", provaMenu.openMenu);

// prova.nextPage();
// function nextStep() {
//   fetch("../step2/index.html")
//     .then((res) => res.text())
//     .then((myPage) => {
//       let parser = new DOMParser();
//       let doc = parser.parseFromString(myPage, "text/html");
//       let div = document.createElement("div");
//       let content = doc.querySelector("body").outerHTML;
//       div.innerHTML = content;
//       div.style.top = "0";
//       div.style.zIndex = "1000";
//       div.style.position = "absolute";
//       // let content1 = document.createTextNode(content);
//       // div.appendChild(content1);
//       // let body=document.querySelector("body")
//       let containerHp = document.querySelector("#container-hp");
//       containerHp.classList.add("hidden");
//       document.body.appendChild(div);
//     });
// }
// nextStep();
