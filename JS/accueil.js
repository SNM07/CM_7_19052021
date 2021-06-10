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

//Generation des cards recettes

function generateHTMLForCards(recipe) {
  let currentRecipe = recipe;
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

///////////////////////////////////////////////

//Generation Menus

const menuIng = [];
const menuApp = [];
const menuUst = [];

let ingID = "ingList";
let ingClass = "ING";
let appID = "appList";
let appClass = "APP";
let ustID = "ustList";
let ustClass = "UST";

createMenus();
function createMenus() {
  for (let ing of recipesSource) {
    let ingListSource = ing.ingredients;
    ingListSource.forEach(function (element) {
      let item = element.ingredient;
      generateMenuList(menuIng, item);
    });
  }
  for (let app of recipesSource) {
    let item = app.appliance;
    generateMenuList(menuApp, item);
  }
  for (let ust of recipesSource) {
    let ustListSource = ust.ustensils;
    ustListSource.forEach(function (element) {
      let item = element;
      generateMenuList(menuUst, item);
    });
  }

  generateMenuItems(menuIng, ingID, ingClass);
  generateMenuItems(menuApp, appID, appClass);
  generateMenuItems(menuUst, ustID, ustClass);
}

function generateMenuList(arrayMenu, item) {
  if (arrayMenu.indexOf(item) === -1) {
    arrayMenu.push(item);
  }
  arrayMenu.sort((a, b) =>
    a.localeCompare(b, "fr", { ignorePunctuation: true })
  );
}

function generateMenuItems(arrayMenuList, listID, listClass) {
  const menuList = document.getElementById(listID);
  arrayMenuList.forEach(function (element) {
    const menuListItem = document.createElement("li");
    menuListItem.innerHTML = element;
    menuListItem.setAttribute("id", element);
    menuListItem.classList.add(listClass);
    menuList.appendChild(menuListItem);
  });
}

//////////////////////////////////////////////////////

//Deploiement des Menus

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

/////////////////////////////////////////////////////////

//Filtre des éléments en fonction de l'input

let inputIng = document.getElementById("ingSearch");
let inputApp = document.getElementById("appSearch");
let inputUst = document.getElementById("ustSearch");

inputIng.addEventListener("keyup", menuFilter);
inputApp.addEventListener("keyup", menuFilter);
inputUst.addEventListener("keyup", menuFilter);

function menuFilter(event) {
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

/////////////////////////////////////////////////

//Affichage des tags sélectionnés

const tagListArray = [];

document.querySelectorAll(".hidden li").forEach((li) => {
  li.onclick = function () {
    if (tagListArray.indexOf(this.innerHTML) === -1) {
      tagListArray.push(this.innerHTML);
      displayTag(this.innerHTML, this.className);
      //
      tagListArray.forEach(function (el) {
        search(recipesSource, el);
      });
      //
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

////////////////////////////////////////
//TESTS
///////////////////////////////////////

function search(arr, s) {
  var matches = [],
    i,
    key;

  for (i = arr.length; i--; )
    for (key in arr[i])
      if (arr[i].hasOwnProperty(key) && arr[i][key].toString().indexOf(s) > -1)
        matches.push(recipes[i]); // <-- This can be changed to anything
  //recipes.length = 0;                  // Clear contents
  //recipes.push.apply(recipes, matches);  // Append new contents
  console.log(recipes, matches);
  return matches;
}
