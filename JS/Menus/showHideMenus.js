//display menus

export function showMenus() {
  const hidden = this.parentNode.nextElementSibling;
  const largeur = this.parentNode.parentNode;
  const menuLists = document.getElementsByClassName("hidden");
  const menuButtons = document.getElementsByClassName("filterInput");
  const arrowDown = document.getElementsByClassName("arrowDown");
  const arrowUp = document.getElementsByClassName("arrowUp");
  const thisArrowDown = this.firstElementChild;
  const thisArrowUp = this.lastElementChild;
  let x = window.matchMedia("(max-width: 768px)");

  if (hidden.style.display == "none") {
    [...menuLists].forEach(function (element) {
      element.style.display = "none";
    });
    [...menuButtons].forEach(function (element) {
      if (x.matches) {
        element.style.width = "100%";
      } else {
        element.style.width = "auto";
      }
      element.style.borderRadius = "5px";
    });
    [...arrowDown].forEach(function (element) {
      element.style.display = "block";
    });
    [...arrowUp].forEach(function (element) {
      element.style.display = "none";
    });
    hidden.style.display = "flex";
    largeur.style.borderRadius = "5px 5px 0 0";
    if (x.matches) {
      largeur.style.width = "100%";
    } else {
      largeur.style.width = "120%";
    }
    thisArrowDown.style.display = "none";
    thisArrowUp.style.display = "block";
  } else {
    hidden.style.display = "none";
    largeur.style.borderRadius = "5px";
    if (x.matches) {
      largeur.style.width = "100%";
    } else {
      largeur.style.width = "auto";
    }
    thisArrowDown.style.display = "block";
    thisArrowUp.style.display = "none";
  }
}

// Close menu click outside
export function hideMenus(event) {
  const menuLists = document.getElementsByClassName("hidden");
  const inputCont = document.getElementsByClassName("filterInput");
  let c = event.target.classList;
  let aDown = document.getElementsByClassName("arrowDown");
  let aUp = document.getElementsByClassName("arrowUp");
  if (
    c.contains("hidden") ||
    c.contains("inputColor") ||
    c.contains("arrowCont") ||
    c.contains("arrowDown") ||
    c.contains("arrowUP") ||
    c.contains("menuList")
  ) {
  } else {
    [...menuLists].forEach(function (element) {
      element.style.display = "none";
    });
    [...inputCont].forEach(function (element) {
      element.style.borderRadius = "5px";
      element.style.width = "100%";
    });
    [...aDown].forEach(function (element) {
      element.style.display = "block";
    });
    [...aUp].forEach(function (element) {
      element.style.display = "none";
    });
  }
}
