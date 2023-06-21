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

export const completeTodoAnimation = (todo) => {
  todo.style.backgroundColor = "green";
  todo.querySelector("span").classList.add("completed-todo");
  todo.querySelector("div").classList.add("completed-todo-checkbox");
  todo.style.transform = "translateX(-10rem)";
  todo.style.opacity = 0;
};
