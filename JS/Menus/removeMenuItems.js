//Remove items from menu list after tag choice

export default function removeMenuItems() {
    let allMenus = document.querySelectorAll(".menuList");
  
    let dispC = document.querySelectorAll(
      '.recipeCard:not([style*="display: none;"])'
    );
    let str;
    let result = [];
    dispC.forEach(function (el) {
      str = el.textContent;
      result.push(str);
    });
  
    let resultString = result.join();
  
    [...allMenus].forEach(function (menuel) {
      if (!resultString.includes(menuel.textContent)) {
        menuel.style.display = "none";
      } else {
        menuel.style.display = "block";
      }
    });
  }