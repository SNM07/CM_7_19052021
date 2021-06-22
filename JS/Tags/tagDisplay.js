//Affichage des tags sélectionnés

const tagListArray = [];

export function tagSelect() {
    document.querySelectorAll(".menuList").forEach((li) => {
        li.onclick = function () {
            if (tagListArray.indexOf(this.innerHTML) === -1) {
                tagListArray.push(this.innerHTML);
                displayTag(this.innerHTML, this.classList[0]);

                const menuLists = document.getElementsByClassName("menuList");
                [...menuLists].forEach(function (element) {
                    element.style.display = "block";
                });

                let inputs = document.getElementsByClassName("inputColor");
                let inputsArr = [...inputs];
                inputsArr.forEach(function (input) {
                    input.value = "";
                });
            }
        };
    });
}

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
