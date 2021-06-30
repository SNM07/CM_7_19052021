// V 1 - forEach //

export default function displayCardTag(
  newTag,
  displayMessage,
  removeMenuItems
) {
  performance.mark("start");
  var els = document.querySelectorAll(".recipeCard");
  var search = document.getElementById("site-search");

  Array.prototype.forEach.call(els, function (el) {
    let ingredient = el.children[1].children[1].children[0].innerText;
    let appliance = el.dataset.app;
    let ustensils = el.dataset.ust;
    let isOK = true;

    if (newTag.length > 0) {
      newTag.forEach(function (tag) {
        if (tag.class == "ing" && !ingredient.includes(tag.text)) {
          isOK = false;
          return;
        }
        if (tag.class == "app" && !appliance.includes(tag.text)) {
          isOK = false;
          return;
        }
        if (tag.class == "ust" && !ustensils.includes(tag.text)) {
          isOK = false;
          return;
        }

        if (
          search.value.length >= 3 &&
          el.textContent
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .indexOf(
              search.value.normalize("NFD").replace(/\p{Diacritic}/gu, "")
            ) < 0
        ) {
          isOK = false;
          return;
        }
      });
    } else {
      if (
        search.value.length >= 3 &&
        el.textContent
          .trim()
          .toLowerCase()
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "")
          .indexOf(
            search.value.normalize("NFD").replace(/\p{Diacritic}/gu, "")
          ) < 0
      ) {
        isOK = false;
      }
    }

    if (isOK == true) {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
    displayMessage();
  });
  performance.mark("end");
  performance.measure("difference", "start", "end");
  console.log(performance.getEntriesByType("measure")[0].duration);
  performance.clearMeasures();
  removeMenuItems();
}
