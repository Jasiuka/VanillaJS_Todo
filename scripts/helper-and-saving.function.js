import { createPagesArray } from "./page.functions.js";
export const savePages = (pagesArray) => {
  localStorage.removeItem("pages");
  localStorage.setItem("pages", JSON.stringify(pagesArray));
};

export const makeDataForSaving = () => {
  const allPages = document.querySelectorAll(".todo-page");
  const allPagesArray = createPagesArray(allPages);
  return allPagesArray;
};
