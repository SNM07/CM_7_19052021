"use strict";

import { recipesSource } from "../data/recipes.js";
const recipes = [];
class RecipeCard {
  constructor(
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils
  ) {
    this.id = id;
    this.name = name;
    this.servings = servings;
    this.ingredients = ingredients;
    this.time = time;
    this.description = description;
    this.appliance = appliance;
    this.ustensils = ustensils;
  }
}

//const recipes = [];

for (let recipe of recipesSource) {
  recipes.push(
    new RecipeCard(
      recipe.id,
      recipe.name,
      recipe.servings,
      recipe.ingredients,
      recipe.time,
      recipe.description,
      recipe.appliance,
      recipe.ustensils
    )
  );
  generateHTMLForCards(recipe);
}

function generateHTMLForCards(recipe) {
  let currentRecipe = recipe;
  console.log(currentRecipe);
  const cardsArea = document.getElementById("cardsContainer");

  const recipCard = document.createElement("article");
  const imageCont = document.createElement("div");
  const recipInfo = document.createElement("div");
  const recipHead = document.createElement("div");
  const recipName = document.createElement("h2");
  const recipTime = document.createElement("div");
  const timeIcon = document.createElement("i");
  const recipTimeSpan = document.createElement("span");
  const recipMain = document.createElement("div");
  const recipIng = document.createElement("div");
  const recipSteps = document.createElement("div");
  const recipStepsText = document.createElement("p");

  recipCard.classList.add("recipeCard");
  imageCont.classList.add("imageContainer");
  recipInfo.classList.add("recipeInfos");
  recipHead.classList.add("recipeHeading");
  recipName.classList.add("recipeName");
  recipTime.classList.add("recipeTime");
  timeIcon.classList.add("far");
  timeIcon.classList.add("fa-clock");
  recipTimeSpan.classList.add("recipeTimeSpan");
  recipMain.classList.add("recipeMain");
  recipIng.classList.add("recipeIng");
  recipSteps.classList.add("recipeSteps");
  recipStepsText.classList.add("recipeStepsText");

  recipName.innerHTML = recipe.name;
  recipTimeSpan.innerHTML = " " + recipe.time;
  let ingList = recipe.ingredients;
  ingList.forEach(function (item) {
    const recipIngName = document.createElement("span");
    const recipIngQuantity = document.createElement("span");
    const recipIngMeasure = document.createElement("span");
    recipIngName.classList.add("recipeIngName");
    recipIngName.innerHTML = item.ingredient;
    if (item.quantity !== undefined) {
      recipIngQuantity.classList.add("recipeIngQuantity");
      recipIngQuantity.innerHTML = " : " + item.quantity;
      recipIngName.appendChild(recipIngQuantity);
    }
    if (item.unit !== undefined) {
      recipIngMeasure.classList.add("recipeIngMeasure");
      recipIngMeasure.innerHTML = " " + item.unit;
      recipIngQuantity.appendChild(recipIngMeasure);
    }
    recipIng.appendChild(recipIngName);
  });
  recipStepsText.innerHTML = recipe.description;

  recipCard.setAttribute("data-app", recipe.appliance);
  recipCard.setAttribute("data-ust", recipe.ustensils);

  recipCard.appendChild(imageCont);
  recipCard.appendChild(recipInfo);
  recipInfo.appendChild(recipHead);
  recipHead.appendChild(recipName);
  recipHead.appendChild(recipTime);
  recipTime.appendChild(timeIcon);
  recipTime.appendChild(recipTimeSpan);
  recipInfo.appendChild(recipMain);
  recipMain.appendChild(recipIng);
  recipMain.appendChild(recipSteps);
  recipSteps.appendChild(recipStepsText);
  cardsArea.appendChild(recipCard);
}

const menuIng = [];

createMenuIng();
function createMenuIng() {
  for (let ing of recipesSource) {
    let ingListSource = ing.ingredients;
    ingListSource.forEach(function (element) {
      let ingItem = element.ingredient;
      generateMenuIngredientsList(ingItem);
    });
  }
  generateMenuIngredients();
}

function generateMenuIngredientsList(ingItem) {
  if (menuIng.indexOf(ingItem) === -1) {
    menuIng.push(ingItem);
  } else if (menuIng.indexOf(ingItem) > -1) {
    console.log(ingItem + " existe déjà dans le tableau.");
  }
  menuIng.sort((a, b) => a.localeCompare(b, "fr", { ignorePunctuation: true }));
}

function generateMenuIngredients() {
  const ingList = document.getElementById("ingList");
  menuIng.forEach(function (element) {
    const ingListItem = document.createElement("li");
    ingListItem.innerHTML = element;
    ingListItem.setAttribute("id", element);
    ingListItem.classList.add("ING");
    ingList.appendChild(ingListItem);
  });
}

const menuApp = [];

createMenuApp();
function createMenuApp() {
  for (let app of recipesSource) {
    let appItem = app.appliance;
    generateMenuApplianceList(appItem);
  }
  generateMenuAppliance();
}

function generateMenuApplianceList(appItem) {
  if (menuApp.indexOf(appItem) === -1) {
    menuApp.push(appItem);
  } else if (menuApp.indexOf(appItem) > -1) {
    console.log(appItem + " existe déjà dans le tableau.");
  }
  menuApp.sort((a, b) => a.localeCompare(b, "fr", { ignorePunctuation: true }));
}

function generateMenuAppliance() {
  const appList = document.getElementById("appList");
  menuApp.forEach(function (element) {
    const appListItem = document.createElement("li");
    appListItem.innerHTML = element;
    appListItem.setAttribute("id", element);
    appListItem.classList.add("APP");
    appList.appendChild(appListItem);
  });
}

const menuUst = [];

createMenuUst();
function createMenuUst() {
  for (let ust of recipesSource) {
    let ustListSource = ust.ustensils;
    ustListSource.forEach(function (element) {
      let ustItem = element;
      generateMenuUstensilsList(ustItem);
    });
  }
  generateMenuUstensils();
}

function generateMenuUstensilsList(ustItem) {
  if (menuUst.indexOf(ustItem) === -1) {
    menuUst.push(ustItem);
  } else if (menuUst.indexOf(ustItem) > -1) {
    console.log(ustItem + " existe déjà dans le tableau.");
  }
}

function generateMenuUstensils() {
  const ustList = document.getElementById("ustList");
  menuApp.forEach(function (element) {
    const ustListItem = document.createElement("li");
    ustListItem.innerHTML = element;
    ustListItem.setAttribute("id", element);
    ustListItem.classList.add("UST");
    ustList.appendChild(ustListItem);
  });
}

document.querySelectorAll(".arrowCont").forEach((div) => {
  div.onclick = show;
});

const menuLists = document.getElementsByClassName("hidden");
[...menuLists].forEach(function (element) {
  element.style.display = "none";
});

function show() {
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

let inputIng = document.getElementById("ingSearch");
let inputApp = document.getElementById("appSearch");
let inputUst = document.getElementById("ustSearch");

inputIng.addEventListener("keyup", myFunction);
inputApp.addEventListener("keyup", myFunction);
inputUst.addEventListener("keyup", myFunction);

function myFunction(event) {
  var input, filter, ul, li, a, i, txtValue;
  input = event.currentTarget;
  ul = input.parentNode.lastElementChild;
  filter = input.value.toUpperCase();
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

const tagListArray = [];

document.querySelectorAll(".hidden li").forEach((li) => {
  li.onclick = function () {
    if (tagListArray.indexOf(this.innerHTML) === -1) {
      tagListArray.push(this.innerHTML);
      displayTag(this.innerHTML, this.className);
    }
  };
});

function displayTag(textValue, tagType) {
  const container = document.getElementById("activeFiltersContainer");
  let tag = document.createElement("div");
  let tagText = document.createElement("span");
  const tagCloseIcon = document.createElement("i");
  tag.classList.add("activeFilter");
  switch (tagType) {
    case "ING":
      tag.classList.add("ing");
      break;
    case "APP":
      tag.classList.add("app");
      break;
    case "UST":
      tag.classList.add("ust");
      break;
  }
  tag.addEventListener("click", remove);
  tagText.classList.add("activeFilterText");
  tagCloseIcon.classList.add("far", "fa-times-circle");
  tag.innerHTML = textValue;
  tag.appendChild(tagText);
  tag.appendChild(tagCloseIcon);
  container.appendChild(tag);
}

function remove(e) {
  let value = e.target.innerText;
  e.target.remove();
  var index = tagListArray.indexOf(value);
  if (index > -1) {
    tagListArray.splice(index, 1);
  }
  return tagListArray;
}
