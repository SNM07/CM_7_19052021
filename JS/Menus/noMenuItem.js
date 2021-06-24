// On no menu item found
export default function noMenuItem() {
  let noTag = document.querySelectorAll(".noTag");
  noTag.forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      el.style.display = "none";
      let inputs = document.getElementsByClassName("inputColor");
      let inputsArr = [...inputs];
      inputsArr.forEach(function (input) {
        input.value = "";
      });
      const menuLists = document.getElementsByClassName("menuList");
      [...menuLists].forEach(function (element) {
        element.style.display = "block";
      });
    })
  );
}
