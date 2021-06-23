//Filtre d'affichage des items en fonction de l'input

export default function menuFilter(event) {
  var input, filter, ul, li, a, i, txtValue;
  input = event.currentTarget;
  ul = input.parentNode.lastElementChild;
  filter = input.value.toUpperCase();
  li = ul.getElementsByClassName("menuList");
  for (i = 0; i < li.length; i++) {
    a = li[i];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "block";
    } else {
      li[i].style.display = "none";
    }
  }

  isFound();
  function isFound() {
    let noTag = document.getElementsByClassName("noTag");
    let found = false;
    [...li].forEach(function (el) {
      let disp = el.style.display;
      if (disp == "block") {
        found = true;
        return;
      }
    });
    if (found == true) {
      [...noTag].forEach(function (el) {
        el.style.display = "none";
      });
    } else {
      [...noTag].forEach(function (el) {
        el.style.display = "block";
      });
    }
  }
}
