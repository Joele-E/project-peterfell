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
  choices;
  multipleChoices;
  constructor() {
    this.steps = ["../component-step1/index.html", "../step2/index.html"];
    this.currentStep = 1;
    this.choices = {};
    this.multipleChoices = [];
  }

  openDesignTool = () => {
    // console.log(this.steps[`${this.currentStep}`]);
    fetch(this.steps[this.currentStep - 1])
      .then((res) => res.text())
      .then((myPage) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(myPage, "text/html");
        let div = document.createElement("div");
        div.id = "container-step";
        let content = doc.querySelector("body").outerHTML;
        div.innerHTML = content;
        div.style.top = "0";
        div.style.zIndex = "1000";
        div.style.position = "absolute";
        div.classList.add("w-full", "h-full");
        let containerHp = document.querySelector("#container-hp");
        containerHp.classList.add("hidden");
        document.body.appendChild(div);
        switch (this.currentStep) {
          case 1:
            this.addEventsStep1();
            break;
          case 2:
            this.addEventsStep2();
          default:
            console.log("non funziona");
        }
      });
  };
  addEventsStep1 = () => {
    let img1Step1 = document.getElementById("img-step1-1");
    img1Step1.addEventListener("click", () => {
      this.saveChoice(img1Step1);
    });
    let img2Step1 = document.getElementById("img-step1-2");
    img2Step1.addEventListener("click", () => {
      this.saveChoice(img2Step1);
    });
    let img3Step1 = document.getElementById("img-step1-3");
    img3Step1.addEventListener("click", () => {
      this.saveChoice(img3Step1);
    });
    let img4Step1 = document.getElementById("img-step1-4");
    img4Step1.addEventListener("click", () => {
      this.saveChoice(img4Step1);
    });
    let img5Step1 = document.getElementById("img-step1-5");
    img5Step1.addEventListener("click", () => {
      this.saveChoice(img5Step1);
    });
    let img6Step1 = document.getElementById("img-step1-6");
    img6Step1.addEventListener("click", () => {
      this.saveChoice(img6Step1);
    });
    let img7Step1 = document.getElementById("img-step1-7");
    img7Step1.addEventListener("click", () => {
      this.saveChoice(img7Step1);
    });
    let btnNext = document.getElementById("btn-1");
    btnNext.addEventListener("click", this.nextPage);
  };
  addEventsStep2 = () => {
    let color1 = document.getElementById("color1");
    color1.addEventListener("click", () => {
      this.saveChoiceMultiple(color1);
    });
    let color2 = document.getElementById("color2");
    color2.addEventListener("click", () => {
      this.saveChoiceMultiple(color2);
    });
    let color3 = document.getElementById("color3");
    color3.addEventListener("click", () => {
      this.saveChoiceMultiple(color3);
    });
  };
  saveChoiceMultiple = (el) => {
    let currentStepN = Number(this.currentStep);
    this.multipleChoices.push(el.id);
    this.choices[currentStepN] = this.multipleChoices;
    localStorage.setItem("choices", JSON.stringify(this.choices));
  };
  saveChoice = (el) => {
    let currentStepN = Number(this.currentStep);
    this.choices[currentStepN] = el.id;
    localStorage.setItem("choices", JSON.stringify(this.choices));
  };
  nextPage = () => {
    // console.log("funziona");
    this.currentStep++;
    let contenutoStep = document.getElementById("container-step");
    contenutoStep.classList.add("hidden");
    this.openDesignTool();
  };
}

let prova = new DesignTool();
// prova.openDesignTool();

class Menu {
  this;
  openMenu() {
    fetch("../menu/index.html")
      .then((res) => res.text())
      .then((myPage) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(myPage, "text/html");
        let div = document.createElement("div");
        let content = doc.querySelector("body").outerHTML;
        div.id = "container-menu";
        div.innerHTML = content;
        div.style.top = "0";
        div.style.zIndex = "1000";
        div.style.position = "absolute";
        div.classList.add("w-full", "h-full");
        let containerHp = document.querySelector("#container-hp");
        containerHp.classList.add("hidden");
        document.body.appendChild(div);
        addEvents();
      });
  }
  // openMenu() {
  //   this.fetchMenu;
  //   addEvents();
  // }
  closeMenu() {
    // let containerHp = document.querySelector("#container-hp");
    // containerHp.classList.remove("hidden");
    // let contMenu = document.getElementById("container-menu");
    // contMenu.classList.add("hidden");
    // console.log("funzionava");
    location.reload();
  }
}
function addEvents() {
  let btnClose = document.getElementById("closeMenu");
  // console.log(btnClose);
  btnClose.addEventListener("click", provaMenu.closeMenu);
}
let provaMenu = new Menu();

let btnMenu = document.getElementById("navbar-text-menu");
btnMenu.addEventListener("click", provaMenu.openMenu);
let btnDesignTool = document.getElementById("navbar-text-dt");
btnDesignTool.addEventListener("click", prova.openDesignTool);
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
