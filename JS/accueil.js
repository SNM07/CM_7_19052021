"use strict";

import displayCardTag from "./Algos_versions/V1_forEach.js";
//import displayCardTag from "./Algos_versions/V2_filter.js";

import generateHTMLForCards from "./Cards/generateHTMLforCards.js";
import displayMessage from "./Warning_Message/displayMessage.js";
import removeMenuItems from "./Menus/removeMenuItems.js";
import noMenuItem from "./Menus/noMenuItem.js";
import { tagSelect } from "./Tags/tagDisplay.js";
import { showMenus } from "./Menus/showHideMenus.js";
import { hideMenus } from "./Menus/showHideMenus.js";
import menuFilter from "./Menus/inputFilter.js";
import { createMenus } from "./Menus/generateMenus.js";

import { recipesSource } from "../data/recipes.js";

//////////////////////////////////////////////////////////////////////////
// Recipe constructor
//////////////////////////////////////////

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
  // Generate recipes cards
  generateHTMLForCards(recipe);
}

//////////////////////////////////////////////////////////////////////////
// MENUS
//////////////////////////////////////////

// Generate menus lists
createMenus(recipesSource);

//////////////////////////////////////////
// Menus drop-downs show/hide
document.querySelectorAll(".arrowCont").forEach((div) => {
  div.onclick = showMenus;
});

const menuLists = document.getElementsByClassName("hidden");
[...menuLists].forEach(function (element) {
  element.style.display = "none";
});

document.addEventListener("click", function (event) {
  hideMenus(event);
});

//////////////////////////////////////////
// Menus items filter based on input
let inputIng = document.getElementById("ingSearch");
let inputApp = document.getElementById("appSearch");
let inputUst = document.getElementById("ustSearch");

inputIng.addEventListener("keyup", function (event) {
  menuFilter(event);
});
inputApp.addEventListener("keyup", function (event) {
  menuFilter(event);
});
inputUst.addEventListener("keyup", function (event) {
  menuFilter(event);
});

//////////////////////////////////////////
// Display selected tags
tagSelect();

//////////////////////////////////////////////////////////////////////////
// SEARCH
//////////////////////////////////////////

// TAGS SEARCH //

// Select the node that will be observed for mutations
const targetNode = document.getElementById("activeFiltersContainer");

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

let newTag = [];

// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      mutation.addedNodes.forEach(function (node) {
        newTag.push({
          class: mutation.addedNodes[0].classList[1],
          text: mutation.addedNodes[0].innerText,
        });
        displayCardTag(newTag, displayMessage, removeMenuItems);
      });
      mutation.removedNodes.forEach(function (node) {
        newTag.splice(
          newTag.findIndex((el) => el.id === node.innerText),
          1
        );
        displayCardTag(newTag, displayMessage, removeMenuItems);
      });

      return newTag;
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// ALGOS V1 - V2 //
var search = document.getElementById("site-search");
search.addEventListener("keyup", function () {
  setTimeout(displayCardTag(newTag, displayMessage, removeMenuItems), 300);
});

//////////////////////////////////////////
// Remove warning message on click
document.getElementById("warning").addEventListener("click", function () {
  document.getElementById("warning").classList.remove("wVisible");
});

//////////////////////////////////////////
// On no menu item found
noMenuItem();

//////////////////////////////////////////////////////////////////////////
