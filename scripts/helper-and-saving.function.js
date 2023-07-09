import { createPagesArray } from "./page.functions.js";
import * as todoFunction from "./todo-item.functions.js";
import * as animationFunction from "./animations.js";
export const savePages = (pagesArray) => {
  if (pagesArray || !pagesArray) {
    localStorage.removeItem("pages");
    localStorage.setItem("pages", JSON.stringify(pagesArray));
  }
};

export const makeDataForSaving = () => {
  const allPages = document.querySelectorAll(".todo-page");
  const allPagesArray = createPagesArray(allPages);
  return allPagesArray;
};

export const todoAddEventHandlerFunction = (
  value,
  todoBox,
  todoID,
  inputElement,
  inputLabelElement
) => {
  if (value.length <= 85) {
    // Add todo element to todos box
    todoFunction.addTodos(value, todoID, todoBox);
    savePages(makeDataForSaving());
    inputElement.value = "";
    animationFunction.moveInputLabel(inputLabelElement, false);
  } else {
    alert("Input value length should be <=85 characters. ");
  }
};
