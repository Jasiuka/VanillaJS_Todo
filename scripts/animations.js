export const moveInputLabel = (
  inputLabelElement,
  focus = true,
  inputValue = ""
) => {
  if (focus) {
    inputLabelElement.classList.add("moveInputLabel");
  } else if (!focus && inputValue === "") {
    inputLabelElement.classList.remove("moveInputLabel");
  }
};

export const deleteTodoAnimation = (todo) => {
  todo.querySelector("span").style.color = "red";
  todo.style.backgroundColor = "red";
  todo.style.transform = "translateX(30rem)";
  todo.style.opacity = 0;
};
