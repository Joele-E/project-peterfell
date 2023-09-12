// variabili
let heroCards = document.querySelectorAll(".hero-card");
let heroSecOverlay = document.getElementById("hero-overlay");
let firstCard = document.querySelector(".hero-section-first-card");
let menuText = document.getElementById("navbar-text-menu");
let menuDt = document.getElementById("navbar-text-dt");
let firstSpan = document.getElementById("firstLogoHalf");
let secondSpan = document.getElementById("secondLogoHalf");

if (window.innerWidth < 1024) {
  menuText.innerHTML = "";
  menuDt.innerHTML = "";
} else {
  menuText.innerHTML = "Menu";
  menuDt.innerHTML = "Design Tool";
}
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

function checkWindowSize() {
  if (window.innerWidth < 1024) {
    menuText.innerHTML = "";
    menuDt.innerHTML = "";
  } else {
    menuText.innerHTML = "Menu";
    menuDt.innerHTML = "Design Tool";
  }
}
window.onresize = checkWindowSize;

// evento scroll per cambiare colore navbar
document.addEventListener("scroll", (event) => {
  let scroll = this.scrollY;

  let heroHeight = heroSecOverlay.offsetHeight;

  let navbarIcons = document.querySelectorAll(".navbar-icon");

  navbarIcons.forEach((el) => {
    el.style.transition = "0.1s all";
  });

  // console.log(navbarIcons);

  if (scroll > 0 && window.innerWidth > 1024) {
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
    this.steps = [
      "../component-step1/index.html",
      "../step2/index.html",
      "../step3/index.html",
      "../step4/index.html",
      "../step-5/index.html",
      "../step6/index.html",
    ];
    this.currentStep = 1;
    // this.choices = {};
    this.choices =
      JSON.parse(localStorage.getItem("choices")) !== null
        ? JSON.parse(localStorage.getItem("choices"))
        : {};
    console.log("mie scelte", this.choices);
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
            break;
          case 3:
            this.addEventsStep3();
            break;
          case 4:
            this.addEventsStep4();
            break;
          case 5:
            this.addEventsStep5();
            break;
          case 6:
            this.addEventsStep6();
            break;
          default:
            console.log("Step not found");
        }
      });
  };
  highlightChoice = (step, arrStep, img) => {
    if (this.choices[String(step)] != null) {
      let myChoice1 = this.choices[String(step)].slice(-1);
      let el = arrStep[myChoice1 - 1];

      if (img) {
        let imgContainer = document.getElementById("texture-imgL");
        let textureUrl = el.querySelector("img").src;
        imgContainer.src = textureUrl;
      }

      el.classList.add("bg-[#d7e0e3]");

      this.enableButton();
    } else {
      this.disabledButton();
    }
  };

  handleStepButtons = (buttons) => {
    let activeButtons = [];
    for (let i = 1; i < 6; i++) {
      if (this.choices[String(i)] != null) {
        activeButtons.push("active");
      } else {
        activeButtons.push("disabled");
      }
    }
    for (let i = 0; i < buttons.length; i++) {
      if (activeButtons[i] == "active") {
        buttons[i]
          .querySelector("button")
          .classList.remove("cursor-not-allowed");
        buttons[i].addEventListener("click", () => {
          if (this.currentStep > i) {
            this.currentStep = i;
            this.nextPage();
          }
        });
      } else {
        buttons[i].addEventListener("click", () => {
          console.log("NON ATTIVO");
        });
      }
    }
  };
  addEventsStep1 = () => {
    let stepBtns = document.querySelectorAll(".stepBtn");
    this.handleStepButtons(stepBtns);
    let img1Step1 = document.getElementById("img-step1-1");
    let img2Step1 = document.getElementById("img-step1-2");
    let img3Step1 = document.getElementById("img-step1-3");
    let img4Step1 = document.getElementById("img-step1-4");
    let img5Step1 = document.getElementById("img-step1-5");
    let img6Step1 = document.getElementById("img-step1-6");
    let img7Step1 = document.getElementById("img-step1-7");
    let arrStep1 = [];
    arrStep1.push(
      img1Step1,
      img2Step1,
      img3Step1,
      img4Step1,
      img5Step1,
      img6Step1,
      img7Step1
    );
    this.highlightChoice(1, arrStep1, false);
    arrStep1.forEach((el) => {
      el.addEventListener("click", () => {
        this.saveChoice(el);
        arrStep1.forEach((el2) => {
          el2.classList.remove("bg-[#d7e0e3]");
        });
        el.classList.add("bg-[#d7e0e3]");
        this.enableButton();
      });
    });
    // let btnNext = document.getElementById("btn-1");
    // btnNext.addEventListener("click", this.nextPage);
    let closeStep = document.getElementById("close-step");
    closeStep.addEventListener("click", () => location.reload());
  };
  addEventsStep2 = () => {
    let stepBtns = document.querySelectorAll(".stepBtn");
    this.handleStepButtons(stepBtns);
    let color1 = document.getElementById("color1");
    if (this.choices["2"] != null) {
      let myChoice1 = this.choices["2"].slice(-1);
      color1.classList.add("bg-[#d7e0e3]");
      this.enableButton();
      let colorsImg = document.getElementById("img-choice-step2");
      let colorsUrl =
        "	https://www.peterfell.co.nz/wp-content/uploads/PFL-112.png";
      colorsImg.src = colorsUrl;
    } else {
      this.disabledButton();
    }
    color1.addEventListener("click", () => {
      this.saveChoice(color1);
      color1.classList.add("bg-[#d7e0e3]");
      this.enableButton();
      let colorsImg = document.getElementById("img-choice-step2");
      let colorsUrl =
        "	https://www.peterfell.co.nz/wp-content/uploads/PFL-112.png";
      colorsImg.src = colorsUrl;
    });
    // let color2 = document.getElementById("color2");
    // color2.addEventListener("click", () => {
    //   this.saveChoiceMultiple(color2);
    // });
    // let color3 = document.getElementById("color3");
    // color3.addEventListener("click", () => {
    //   this.saveChoiceMultiple(color3);
    // });
    let closeStep = document.getElementById("close-step2");
    closeStep.addEventListener("click", () => location.reload());
    // let btnNext = document.getElementById("btn-1");
    // btnNext.addEventListener("click", this.nextPage);
    let btnPrev = document.getElementById("btn-prev");
    btnPrev.addEventListener("click", this.prevPage);
    // let btnNextSmall = document.getElementById("btn-1-small");
    // btnNextSmall.addEventListener("click", this.nextPage);
    let btnPrevSmall = document.getElementById("btn-prev-small");
    btnPrevSmall.addEventListener("click", this.prevPage);
    let closeStep3s = document.getElementById("close-step3-small");
    closeStep3s.addEventListener("click", () => location.reload());
  };

  addEventsStep3 = () => {
    let stepBtns = document.querySelectorAll(".stepBtn");
    this.handleStepButtons(stepBtns);
    try {
      let recText = document.getElementById("step3-reccomended");
      let recs = [
        "Floors",
        "Patios & courtyards",
        "DriveWays & paths",
        "Walls",
        "Pool surrounds",
        "Commercial",
        "Public spaces",
      ];
      let step1Choice = JSON.parse(localStorage.getItem("choices"))["1"];
      let myIndex = step1Choice.split("-")[2];
      recText.innerText =
        typeof step1Choice !== "undefined" ? recs[myIndex - 1] : "Default";
    } catch (error) {
      console.error("ERRORONEISSIMO ROTTO TUTTO", error);
    }

    let textures = document.querySelectorAll(".texture");
    this.highlightChoice(3, textures, true);
    textures.forEach((el) => {
      el.addEventListener("click", () => {
        this.saveChoice(el);
        textures.forEach((el2) => {
          el2.classList.remove("bg-[#d7e0e3]");
        });
        el.classList.add("bg-[#d7e0e3]");
        this.enableButton();
        let textureImg = document.getElementById("texture-imgL");
        let textureUrl = el.querySelector("img").src;
        textureImg.src = textureUrl;
      });
      let closeStep3 = document.getElementById("close-step3");
      closeStep3.addEventListener("click", () => location.reload());
      let closeStep3s = document.getElementById("close-step3-small");
      closeStep3s.addEventListener("click", () => location.reload());
    });

    // let btnNext = document.getElementById("btn-1");
    // btnNext.addEventListener("click", this.nextPage);
    let btnPrev = document.getElementById("btn-prev");
    btnPrev.addEventListener("click", this.prevPage);
    // let btnNextSmall = document.getElementById("btn-1-small");
    // btnNextSmall.addEventListener("click", this.nextPage);
    let btnPrevSmall = document.getElementById("btn-prev-small");
    btnPrevSmall.addEventListener("click", this.prevPage);
  };
  addEventsStep4 = () => {
    let stepBtns = document.querySelectorAll(".stepBtn");
    this.handleStepButtons(stepBtns);
    let img1step4 = document.getElementById("step4-img1");
    let img2step4 = document.getElementById("step4-img2");
    let img3step4 = document.getElementById("step4-img3");
    let arrStep = [];
    arrStep.push(img1step4, img2step4, img3step4);
    this.highlightChoice(4, arrStep, true);
    arrStep.forEach((el) => {
      el.addEventListener("click", () => {
        this.saveChoice(el);
        arrStep.forEach((el2) => {
          el2.classList.remove("bg-[#d7e0e3]");
        });
        el.classList.add("bg-[#d7e0e3]");
        this.enableButton();
        let cutsImg = document.getElementById("texture-imgL");
        let cutsUrl = el.querySelector("img").src;
        cutsImg.src = cutsUrl;
      });
    });
    // let btnNext = document.getElementById("btn-1");
    // btnNext.addEventListener("click", this.nextPage);
    let btnPrev = document.getElementById("btn-prev");
    btnPrev.addEventListener("click", this.prevPage);
    let closeStep4 = document.getElementById("close-step4");
    closeStep4.addEventListener("click", () => location.reload());
    // let btnNextSmall = document.getElementById("btn-1-small");
    // btnNextSmall.addEventListener("click", this.nextPage);
    let btnPrevSmall = document.getElementById("btn-prev-small");
    btnPrevSmall.addEventListener("click", this.prevPage);
    let closeStep3s = document.getElementById("close-step3-small");
    closeStep3s.addEventListener("click", () => location.reload());
  };
  addEventsStep5 = () => {
    let stepBtns = document.querySelectorAll(".stepBtn");
    this.handleStepButtons(stepBtns);
    let protections = document.querySelectorAll(".group5");
    if (this.choices["5"] != null) {
      let myChoice1 = this.choices["5"].slice(-1);
      let el = protections[myChoice1 - 1];
      el.classList.add("bg-[#d7e0e3]");

      let imgContainer = document.getElementById("texture-imgL");
      let textureUrl = el.querySelector("img").src;
      imgContainer.src = textureUrl;

      this.enableButton();
    } else {
      this.disabledButton();
    }
    protections.forEach((el) => {
      el.addEventListener("click", () => {
        this.saveChoice(el);
        protections.forEach((el2) => {
          el2.classList.remove("bg-[#d7e0e3]");
        });
        el.classList.add("bg-[#d7e0e3]");
        this.enableButton();
        let protectionsImg = document.getElementById("texture-imgL");
        let protectionsUrl = el.querySelector("img").src;
        /*  console.log(protectionsUrl); */
        protectionsImg.src = protectionsUrl;
      });
    });
    // let btnNext = document.getElementById("btn-1");
    // btnNext.addEventListener("click", this.nextPage);
    let btnPrev = document.getElementById("btn-prev");
    btnPrev.addEventListener("click", this.prevPage);
    let closeStep5 = document.getElementById("close-step5");
    closeStep5.addEventListener("click", () => location.reload());
    // let btnNextSmall = document.getElementById("btn-1-small");
    // btnNextSmall.addEventListener("click", this.nextPage);
    let btnPrevSmall = document.getElementById("btn-prev-small");
    btnPrevSmall.addEventListener("click", this.prevPage);
    let closeStep3s = document.getElementById("close-step3-small");
    closeStep3s.addEventListener("click", () => location.reload());
  };
  addEventsStep6 = () => {
    let stepBtns = document.querySelectorAll(".stepBtn");
    this.handleStepButtons(stepBtns);
    let getChoices = JSON.parse(localStorage.getItem("choices"));
    let textStep1 = document.getElementById("choice-text-step-1");
    let imgStep1 = document.getElementById("choice-img-step-1");
    let imgStep3 = document.getElementById("choice-img-step-3");
    let imgStep4 = document.getElementById("choice-img-step-4");
    let imgStep5 = document.getElementById("choice-img-step-5");
    try {
      let recs = [
        "Floors",
        "Patios & courtyards",
        "DriveWays & paths",
        "Walls",
        "Pool surrounds",
        "Commercial",
        "Public spaces",
      ];
      let immgs1 = [
        "assets/floors.jpg",
        "assets/patios.jpg",
        "assets/driveways.jpg",
        "assets/walls.jpg",
        "assets/pool.jpg",
        "assets/commercial.jpg",
        "assets/publicSpaces.jpg",
      ];
      let immgs2 = [
        "https://www.peterfell.co.nz/wp-content/uploads/Smooth_trowel.png",
        "https://www.peterfell.co.nz/wp-content/uploads/Light_trowel_tan.png",
        "https://www.peterfell.co.nz/wp-content/uploads/Nat_a_polish.png",
        "https://www.peterfell.co.nz/wp-content/uploads/Sat_n_pepper.png",
        "https://www.peterfell.co.nz/wp-content/uploads/Light_grind.png",
        "https://www.peterfell.co.nz/wp-content/uploads/Medium_grond.png",
        "https://www.peterfell.co.nz/wp-content/uploads/Deep_grind.png",
      ];
      let immgs3 = [
        "assets/construction-cut-v1.png",
        "assets/decorative-cut-v2.png",
        "assets/Fair_Faced.png",
      ];
      let immgs4 = [
        "assets/C2-Gloss-10L.png",
        "assets/f16-PFL-Acrylic-Sealer-2L.png",
        "assets/f16-PFL-Glaze-Sealer-2L.png",
        "assets/C2-Shield-10L.png",
        "assets/C2-Gloss-10L.png",
        "assets/C2-Super-Hard-Label-10L.png",
      ];
      let step1Choice = JSON.parse(localStorage.getItem("choices"))["1"];
      let step3Choice = JSON.parse(localStorage.getItem("choices"))["3"];
      let step4Choice = JSON.parse(localStorage.getItem("choices"))["4"];
      let step5Choice = JSON.parse(localStorage.getItem("choices"))["5"];
      let myIndex3 = step3Choice.split("-")[2];
      let myIndex4 = step4Choice.charAt(step4Choice.length - 1);
      let myIndex = step1Choice.split("-")[2];
      let myIndex5 = step5Choice.charAt(step5Choice.length - 1);

      textStep1.innerText =
        typeof step1Choice !== "undefined" ? recs[myIndex - 1] : "Default";
      imgStep1.src =
        typeof step1Choice !== "undefined" ? immgs1[myIndex - 1] : "#";
      imgStep3.src =
        typeof step3Choice !== "undefined" ? immgs2[myIndex3 - 1] : "#";
      imgStep4.src =
        typeof step4Choice !== "undefined" ? immgs3[myIndex4 - 1] : "#";
      imgStep5.src =
        typeof step5Choice !== "undefined" ? immgs4[myIndex5 - 1] : "#";
    } catch (error) {
      console.error("ERRORONEISSIMO ROTTO TUTTO", error);
    }

    let btnPrev = document.getElementById("btn-prev");
    btnPrev.addEventListener("click", this.prevPage);
    let closeStep4 = document.getElementById("close-step6");
    closeStep4.addEventListener("click", () => location.reload());
    let closeStep = document.getElementById("close-step6-small");
    closeStep.addEventListener("click", () => location.reload());
    let btnPrevSmall = document.getElementById("btn-prev-small");
    btnPrevSmall.addEventListener("click", this.prevPage);
  };
  disabledButton = () => {
    let btnNext = document.getElementById("btn-1");
    btnNext
      .querySelector("button")
      .classList.add(
        "cursor-not-allowed",
        "opacity-30",
        "text-cBlue",
        "border",
        "border-cBlue",
        "bg-white"
      );
    btnNext.querySelector("p").classList.add("text-cBlue");

    try {
      let btnNextSmall = document.getElementById("btn-1-small");
      btnNextSmall.classList.remove("bg-cBlue");
      btnNextSmall.querySelector("p").classList.remove("text-white");
      btnNextSmall.querySelector("p").classList.add("text-cBlue", "opacity-30");
      btnNextSmall.querySelector("svg").classList.remove("fill-white");
      btnNextSmall.querySelector("svg").classList.add("fill-cBlue");
      btnNextSmall.classList.add("bg-white");
    } catch (error) {
      console.log(error);
    }
  };
  enableButton = () => {
    let btnNext = document.getElementById("btn-1");
    btnNext.addEventListener("click", this.nextPage);
    try {
      let btnNextSmall = document.getElementById("btn-1-small");
      btnNextSmall.addEventListener("click", this.nextPage);
      btnNextSmall.classList.add("bg-cBlue");
      btnNextSmall.querySelector("p").classList.add("text-white");
      btnNextSmall
        .querySelector("p")
        .classList.remove("text-cBlue", "opacity-30");
      btnNextSmall.querySelector("svg").classList.add("fill-white");
      btnNextSmall.querySelector("svg").classList.remove("fill-cBlue");
      btnNextSmall.classList.remove("bg-white");
    } catch (error) {
      console.log(error);
    }
    btnNext
      .querySelector("button")
      .classList.remove(
        "cursor-not-allowed",
        "text-cBlue",
        "opacity-30",
        "border",
        "border-cBlue",
        "bg-white"
      );
    btnNext.querySelector("p").classList.remove("text-cBlue");
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
    // let otherChoices = document.getElementsByClassName("bg-[#d7e0e3]");
    // try {
    //   otherChoices.forEach((element) => {
    //     element.classList.remove("bg-[#d7e0e3]");
    //   });
    // } catch (error) {
    //   console.error(error);
    // }

    // el.classList.add("bg-[#d7e0e3]");
    localStorage.setItem("choices", JSON.stringify(this.choices));
  };
  clearDiv = () => {
    let contenutoStep = document.getElementById("container-step");
    contenutoStep.remove();
  };
  nextPage = () => {
    // console.log("funziona");
    this.currentStep++;
    this.clearDiv();
    this.openDesignTool();
  };
  prevPage = () => {
    this.currentStep--;
    this.clearDiv();
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

let btnMenu = document.getElementById("btn-menu");
btnMenu.addEventListener("click", provaMenu.openMenu);
let btnDesignTool = document.getElementById("btn-dt");
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
