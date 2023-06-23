import { extractTodos } from "./todo-item.functions.js";
export const createPagesArray = (allPages) => {
  const pageObjectsArray = [];
  allPages?.forEach((page) => {
    const pageTitle = page.querySelector("h2:first-child").textContent;
    const todos = page.querySelector("div:last-child");
    const extractedTodos = extractTodos(todos);
    const newPageObject = {
      pageId: page.dataset.todopage,
      title: pageTitle,
      todos: extractedTodos,
    };
    pageObjectsArray.push(newPageObject);
  });
  return pageObjectsArray;
};
// --------------------------------------

// --------------------------------------
export const showActivePage = (pagesBox, activePage) => {
  const pages = pagesBox.querySelectorAll(".todo-page");
  pages?.forEach((page) => {
    if (page.dataset.todopage === activePage.toString()) {
      page.classList.remove("hide");
    } else {
      page.classList.add("hide");
    }
  });
};
// --------------------------------------
// --------------------------------------
// Deletes activePage
export const deletePage = (activePage) => {
  document.querySelector(`[data-todopage="${activePage}"]`)?.remove();
};

export const resetPageIds = (pages) => {
  let i = 1;
  pages?.forEach((page) => {
    page.dataset.todopage = i;
    page.querySelector("h2").dataset.pageid = i;
    page.querySelector(".todo-page__todos").dataset.todos = i;
    i++;
  });
};
