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

//generateHTMLForCards(recipes);


function generateHTMLForCards(recipe) {
    let currentRecipe = recipe;
    console.log(currentRecipe)
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
    //const recipIngName = document.createElement("span");
    //const recipIngQuantity = document.createElement("span");
    //const recipIngMeasure = document.createElement("span");
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
    //recipIngName.classList.add("recipeIngName");
    //recipIngQuantity.classList.add("recipeIngQuantity");
    //recipIngMeasure.classList.add("recipeIngMeasure");
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
        recipIng.appendChild(recipIngName); //
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
    //recipIng.appendChild(recipIngName);
    //recipIngName.appendChild(recipIngQuantity);
    //recipIngName.appendChild(recipIngMeasure);
    recipMain.appendChild(recipSteps);
    recipSteps.appendChild(recipStepsText);
    cardsArea.appendChild(recipCard);

}

/* 
<article class="recipeCard">
<div class="imageContainer"></div>
<div class="recipeInfos">
  <div class="recipeHeading">
    <h2 class="recipeName">Limonade de Coco</h2>
    <div class="recipeTime">
      <i class="far fa-clock"></i>
      <span class="recipeTimeSpan">10</span>
    </div>
  </div>
  <div class="recipeMain">
    <div class="recipeIng">
      <span class="recipeIngName"
        >Lait de coco: <span class="recipeIngQuantity">400</span
        ><span class="recipeIngMeasure"> ml</span></span
      >
      <span class="recipeIngName"
        >Jus de citron: <span class="recipeIngQuantity">2</span
        ><span class="recipeIngMeasure"></span
      ></span>
      <span class="recipeIngName"
        >Crème de coco: <span class="recipeIngQuantity">2</span
        ><span class="recipeIngMeasure"> cuillères</span></span
      >
      <span class="recipeIngName"
        >Sucre: <span class="recipeIngQuantity">30</span
        ><span class="recipeIngMeasure"> gr</span></span
      >
      <span class="recipeIngName"
        >Glaçons: <span class="recipeIngQuantity">2</span
        ><span class="recipeIngMeasure"></span
      ></span>
    </div>
    <div class="recipeSteps">
      <p>
        Mettre les glaçons à votre goût dans le blender, ajouter le
        lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer
        jusqu'à avoir la consistence désirée
      </p>
    </div>
  </div>
</div>
</article>" */