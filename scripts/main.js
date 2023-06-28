import * as animationFunction from "./animations.js";
import * as todoFunction from "./todo-item.functions.js";
import * as pageFunction from "./page.functions.js";
import * as helperFunction from "./helper-and-saving.function.js";
import * as historyPopup from "./history-popup.functions.script.js";

// GLOBALS
// const body = document.querySelector("body");
const menuCheckbox = document.getElementById("menu-hidden-input");
const inputLabel = document.querySelector(".input-label");
const pagesBox = document.querySelector(".pages");
const input = document.querySelector(".pages__add-todo-input");
const newPageButton = document.querySelector(".menu-box__new-page-btn");
const nextButton = document.querySelector(".pages__next-btn");
const prevButton = document.querySelector(".pages__prev-btn");
const deleteButton = document.querySelector(".menu-box__delete-btn");
const historyOverlay = document.querySelector(".history-popup--overlay");
const historyPopupContainer = document.querySelector(".history-popup--inner");
const historyButton = document.querySelector(".menu-box__history-btn");
const historyCloseButton = document.querySelector(".history-popup__close-btn");
let todoID = 0;
let pageID = 1;
let activePage = 1;
let pagesCount = 1;
let todoInEdit = false;

// Events
pagesBox.addEventListener("click", (e) => {
  const target = e.target;
  if (
    target.closest("button") &&
    target.classList.contains("pages__add-todo-button") &&
    input.value.trim() !== ""
  ) {
    if (!todoInEdit) {
      const todoBox = document.querySelector(`[data-todos="${activePage}"]`);
      const value = input.value;

      if (value.length <= 85) {
        // Add todo element to todos box
        todoFunction.addTodos(value, todoID, todoBox);
        helperFunction.savePages(helperFunction.makeDataForSaving());
        todoID++;
        input.value = "";
        animationFunction.moveInputLabel(inputLabel, false);
      } else {
        alert("Input value length should be <=85 characters. ");
      }
    } else {
      alert("Finish editing your todo!");
    }
  }

  // Select active element which is title, when it's unfocused save pages data to local storage
  document.activeElement.addEventListener("blur", (e) => {
    // let alertShown = false;
    if (target.classList.contains("todo-page__title")) {
      if (!todoInEdit) {
        const newTitleValue = target.textContent.trim();
        if (newTitleValue.length <= 50 && newTitleValue.length !== 0) {
          // const allPagesArray = createPagesArray(
          //   document.querySelectorAll(".todo-page")
          // );
          // savePages(allPagesArray);
          helperFunction.savePages(helperFunction.makeDataForSaving());
        } else {
          // if (!alertShown)
          alert(
            "Title name not saved. It should be more than 0 or less equal 50 characters length."
          );
          location.reload();
          // alertShown = true;
        }
      } else {
        alert("Finish editing your todo!");
      }
    }
  });

  // Delete todo functionality
  if (target.closest(".delete-icon")) {
    if (!todoInEdit) {
      // Delete
      animationFunction.deleteTodoAnimation(target.closest("p"));
      setTimeout(function () {
        todoFunction.deleteTodo(activePage, target.closest("p").dataset.id);
        // Reset ids
        const activeTodoBox = pagesBox.querySelector(
          `[data-todos="${activePage}"]`
        );
        todoFunction.resetTodoIds(activeTodoBox);
        // Save changes
        helperFunction.savePages(helperFunction.makeDataForSaving());
      }, 500);
    } else {
      alert("Finish editing your todo!");
    }
  }

  // Edit todo functionality
  if (target.closest(".edit-icon")) {
    if (!todoInEdit) {
      const todo = target.closest("p");
      todoFunction.handleTodoEditStart(todo);
      todoInEdit = true;
    } else {
      alert("One todo is already in edit!");
    }
  }

  if (target.closest(".submit-edit-icon")) {
    const todo = target.closest("p");
    todoFunction.handleTodoEditEnd(todo);
    todoInEdit = false;
    helperFunction.savePages(helperFunction.makeDataForSaving());
  }

  // Completed todo
  if (target.closest(".completed-check")) {
    const todoItem = target.closest("p");
    todoFunction.checkCompletedTodo(todoItem);
    setTimeout(function () {
      todoFunction.saveCompletedTodo(todoItem);
      todoItem.remove();
      helperFunction.savePages(helperFunction.makeDataForSaving());
    }, 500);
  }
});

// Adds new page, activePage becomes new created page
newPageButton.addEventListener("click", () => {
  if (!todoInEdit) {
    pageID++;
    pagesCount++;
    todoID = 0;
    activePage = pagesCount;
    createPageHTML(null, pagesBox, pageID);
    pageFunction.showActivePage(pagesBox, activePage);
    menuCheckbox.checked = false;
  } else {
    alert("Finish editing your todo!");
  }
});

// Next page, if last page --> to the first page
nextButton.addEventListener("click", () => {
  if (!todoInEdit) {
    activePage++;
    if (activePage > pagesCount) {
      activePage = 1;
    }
    pageFunction.showActivePage(pagesBox, activePage);
    todoID = todoFunction.getPageTodoId(activePage);
    menuCheckbox.checked = false;
  } else {
    alert("Finish editing your todo!");
    menuCheckbox.checked = false;
  }
});
// Previous page, if first page --> to the last page
prevButton.addEventListener("click", () => {
  if (!todoInEdit) {
    activePage--;
    if (activePage === 0) {
      activePage = pagesCount;
    }
    pageFunction.showActivePage(pagesBox, activePage);
    todoID = todoFunction.getPageTodoId(activePage);
    menuCheckbox.checked = false;
  } else {
    alert("Finish editing your todo!");
    menuCheckbox.checked = false;
  }
});

// Delete page, deletes page, resets id's of pages and saves changes to local
deleteButton.addEventListener("click", () => {
  if (pagesCount > 1) {
    pageFunction.deletePage(activePage);
    if (activePage === 1) {
      activePage = 1;
    } else {
      activePage--;
    }
    pagesCount--;
    pageID--;
    const allPages = document.querySelectorAll(".todo-page");
    pageFunction.resetPageIds(allPages);
    pageFunction.showActivePage(pagesBox, activePage);
    todoInEdit = false;
    helperFunction.savePages(helperFunction.makeDataForSaving());
    menuCheckbox.checked = false;
  } else {
    alert("You can't delete last page!");
    menuCheckbox.checked = false;
  }
});

// Opens history popup
historyButton.addEventListener("click", () => {
  historyPopupContainer.innerHTML = "";
  const todoItems = historyPopup.getHistoryTodosFromLocal();
  const todoItemsBox = historyPopup.createHistoryPopupItems(todoItems);
  historyPopupContainer.appendChild(todoItemsBox);
  // console.log(historyPopupContainer.closest("history-popup--outer"));
  historyOverlay.classList.remove("hide-popup");
  historyPopupContainer.parentElement.classList.remove("hide-popup");
});

// Close history when close button is clicked
historyCloseButton.addEventListener("click", () => {
  historyOverlay.classList.add("hide-popup");
  historyPopupContainer.parentElement.classList.add("hide-popup");
});

// Close history when outside of history box is clicked
historyOverlay.addEventListener("click", () => {
  historyOverlay.classList.add("hide-popup");
  historyPopupContainer.parentElement.classList.add("hide-popup");
});

// Start of the app
const start = (pagesBox) => {
  if (localStorage.getItem("pages")) {
    const pagesArray = JSON.parse(localStorage.getItem("pages"));
    createPageHTML(pagesArray, pagesBox);
    pageID = pagesArray.length;
    todoID = pagesArray[0].todos.length;
    pageFunction.showActivePage(pagesBox, activePage);
  } else {
    createPageHTML(null, pagesBox);
    todoID = 0;
    pageFunction.showActivePage(pagesBox, activePage);
  }
};
// --------------------------------------
const createPageHTML = (pagesArray, pagesBox, pageId = 1) => {
  if (pagesArray === null) {
    const newPage = `
      <div class="todo-page" data-todoPage="${pageId}">
      <h2 class="todo-page__title" contenteditable="true" data-pageid="${pageId}">
        Todo page ${pageId}
      </h2>
      <div class="todo-page__todos" data-todos="${pageId}"></div>
    </div>
      `;

    pagesBox.insertAdjacentHTML("beforeend", newPage);
  } else {
    pagesCount = pagesArray.length;
    pagesArray.forEach((page) => {
      const newPage = `
      <div class="todo-page" data-todoPage="${page.pageId}">
      <h2 class="todo-page__title" contenteditable="true" data-pageid="${page.pageId}">
        ${page.title}
      </h2>
      <div class="todo-page__todos" data-todos="${page.pageId}"></div>
    </div>
      `;
      pagesBox.insertAdjacentHTML("beforeend", newPage);
      page.todos.forEach(({ text, id }) => {
        const newElement = todoFunction.createNewElement(text, id);
        const todoBox = document.querySelector(`[data-todos="${page.pageId}"]`);
        todoBox.appendChild(newElement);
      });
    });
  }
};
// --------------------------------------
start(pagesBox);

// ANIMATIONS
input.addEventListener("focus", () => {
  animationFunction.moveInputLabel(inputLabel);
});
input.addEventListener("blur", () => {
  animationFunction.moveInputLabel(inputLabel, false, input.value);
});
