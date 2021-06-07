"use strict";

import { recipesSource } from "../data/recipes.js";
const recipes = [];
class AllRecipes {
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
    new AllRecipes(
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

for (let ing of recipesSource) {
  let ingListSource = ing.ingredients;
  ingListSource.forEach(function (element) {
    let ingItem = element.ingredient;
    generateMenuIngredients(ingItem);
  });
}

//menuIng.sort( (a, b) => a.localeCompare(b, 'fr', {ignorePunctuation: true}));

function generateMenuIngredients(ingItem) {
  const ingList = document.getElementById("ingList");
  if (menuIng.indexOf(ingItem) === -1) {
    menuIng.push(ingItem);
    const ingListItem = document.createElement("li");
    ingListItem.innerHTML = ingItem;
    ingListItem.setAttribute("id", ingItem);
    ingList.appendChild(ingListItem);
  } else if (menuIng.indexOf(ingItem) > -1) {
    console.log(ingItem + " existe déjà dans le tableau.");
  }
  menuIng.sort( (a, b) => a.localeCompare(b, 'fr', {ignorePunctuation: true}));
}


const menuApp = [];

for (let app of recipesSource) {
  let appItem = app.appliance;
    generateMenuAppliance(appItem);
}

function generateMenuAppliance(appItem) {
  const appList = document.getElementById("appList");
  if (menuApp.indexOf(appItem) === -1) {
    menuApp.push(appItem);
    const appListItem = document.createElement("li");
    appListItem.innerHTML = appItem;
    appListItem.setAttribute("id", appItem);
    appList.appendChild(appListItem);
  } else if (menuApp.indexOf(appItem) > -1) {
    console.log(appItem + " existe déjà dans le tableau.");
  }
}

const menuUst = [];

for (let ust of recipesSource) {
  let ustListSource = ust.ustensils;
  ustListSource.forEach(function (element) {
    let ustItem = element;
    generateMenuUstensils(ustItem);
  })
}

function generateMenuUstensils(ustItem) {
  const ustList = document.getElementById("ustList");
  if (menuUst.indexOf(ustItem) === -1) {
    menuUst.push(ustItem);
    const ustListItem = document.createElement("li");
    ustListItem.innerHTML = ustItem;
    ustListItem.setAttribute("id", ustItem);
    ustList.appendChild(ustListItem);
  } else if (menuUst.indexOf(ustItem) > -1) {
    console.log(ustItem + " existe déjà dans le tableau.");
  }
}


document.querySelectorAll('.arrowCont').forEach(div => {
	div.onclick = show;
});

function show() {
  const hidden = this.parentNode.nextElementSibling;
  const largeur = this.parentNode.parentNode;
	if (hidden.style.display == 'none') {
    hidden.style.display = 'flex';
    largeur.style.width = "120%";
  } else {
    hidden.style.display = 'none';
    largeur.style.width = "auto";
  }
}