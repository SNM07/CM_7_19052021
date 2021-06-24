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

export function createMenus(recipesSource) {
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

// Generate lists and alphabetical arrangement of items
function generateMenuList(arrayMenu, item) {
  if (arrayMenu.indexOf(item) === -1) {
    arrayMenu.push(item);
  }
  arrayMenu.sort((a, b) =>
    a.localeCompare(b, "fr", { ignorePunctuation: true })
  );
}

// Generate HTML for lists items
function generateMenuItems(arrayMenuList, listID, listClass) {
  const menuList = document.getElementById(listID);
  arrayMenuList.forEach(function (element) {
    const menuListItem = document.createElement("li");
    menuListItem.innerHTML = element;
    menuListItem.setAttribute("id", element);
    menuListItem.classList.add(listClass, "menuList");
    menuList.appendChild(menuListItem);
  });
}
