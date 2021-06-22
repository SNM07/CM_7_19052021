//DISPLAY WARNING MESSAGE

export default function displayMessage() {
    //gives node list
    let divs = document.querySelectorAll("#cardsContainer > .recipeCard");
    //convert to an array
    var divsArray = [].slice.call(divs);
    //so now we can use filter
    //find all divs with display none
    var displayNone = divsArray.filter(function (el) {
      return getComputedStyle(el).display === "none";
    });
    //and all divs that are not display none
    var displayShow = divsArray.filter(function (el) {
      return getComputedStyle(el).display !== "none";
    });
    //and use length to count
    var numberOfHiddenDivs = displayNone.length;
    var numberOfVisibleDivs = displayShow.length;
  
    const messageWarning = document.getElementById("warningText");
    const messageWarningContainer = document.getElementById("warning");
    messageWarningContainer.classList.add("wVisible");
    messageWarningContainer.style.backgroundColor = "lightsteelblue";
    messageWarning.innerText =
      numberOfVisibleDivs + " éléments correspondent à la recherche";
  
    if (numberOfHiddenDivs === 0) {
      messageWarningContainer.classList.remove("wVisible");
      messageWarningContainer.style.backgroundColor = "lightsteelblue";
    }
    if (numberOfVisibleDivs === 0) {
      messageWarningContainer.classList.add("wVisible");
      messageWarningContainer.style.backgroundColor = "lightsalmon";
      messageWarning.innerText =
        "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.";
    }
  }
  