// GLOBALS
const pagesBox = document.querySelector(".pages");
const input = document.querySelector(".pages__add-todo-input");
const newPageButton = document.querySelector(".pages__new-page-btn");
const nextButton = document.querySelector(".pages__next-btn");
const prevButton = document.querySelector(".pages__prev-btn");
const deleteButton = document.querySelector(".pages__delete-btn");
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
    target.classList.contains("pages__add-todo-button")
  ) {
    if (!todoInEdit) {
      const todoBox = document.querySelector(`[data-todos="${activePage}"]`);
      const value = input.value;

      // Add todo element to todos box
      addTodos(value, todoID, todoBox);
      savePages(makeDataForSaving());
      todoID++;
      input.value = "";
    } else {
      alert("Finish editing your todo!");
    }
  }

  // Select active element which is title, when it's unfocused save pages data to local storage
  document.activeElement.addEventListener("blur", () => {
    if (target.classList.contains("todo-page__title")) {
      if (!todoInEdit) {
        const allPagesArray = createPagesArray(
          document.querySelectorAll(".todo-page")
        );
        savePages(allPagesArray);
      } else {
        alert("Finish editing your todo!");
      }
    }
  });

  // Delete todo functionality
  if (target.closest(".delete-icon")) {
    if (!todoInEdit) {
      // Delete
      deleteTodo(activePage, target.closest("p").dataset.id);
      // Reset ids
      const activeTodoBox = pagesBox.querySelector(
        `[data-todos="${activePage}"]`
      );
      resetTodoIds(activeTodoBox);
      // Save changes
      savePages(makeDataForSaving());
    } else {
      alert("Finish editing your todo!");
    }
  }

  // Edit todo functionality
  if (target.closest(".edit-icon")) {
    if (!todoInEdit) {
      const todo = target.closest("p");
      handleTodoEditStart(todo);
      todoInEdit = true;
    } else {
      alert("One todo is already in edit! 4");
    }
  }

  if (target.closest(".submit-edit-icon")) {
    const todo = target.closest("p");
    handleTodoEditEnd(todo);
    todoInEdit = false;
    savePages(makeDataForSaving());
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
    showActivePage(pagesBox, activePage);
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
    showActivePage(pagesBox, activePage);
    todoID = getPageTodoId(activePage);
    console.log("working");
  } else {
    alert("Finish editing your todo!");
  }
});
// Previous page, if first page --> to the last page
prevButton.addEventListener("click", () => {
  if (!todoInEdit) {
    activePage--;
    if (activePage === 0) {
      activePage = pagesCount;
    }
    showActivePage(pagesBox, activePage);
    todoID = getPageTodoId(activePage);
  } else {
    alert("Finish editing your todo!");
  }
});

// Delete page, deletes page, resets id's of pages and saves changes to local
deleteButton.addEventListener("click", () => {
  deletePage(activePage);
  if (activePage === 1) {
    activePage = 1;
  } else {
    activePage--;
  }
  pagesCount--;
  pageID--;
  const allPages = document.querySelectorAll(".todo-page");
  resetPageIds(allPages);
  showActivePage(pagesBox, activePage);
  todoInEdit = false;
  savePages(makeDataForSaving());
});

// Functions for todos
const addTodos = (value, id, todosBox) => {
  if (todosBox.children.length === 0) {
    todosBox.appendChild(createNewElement(value, id));
  } else {
    todosBox.insertBefore(createNewElement(value, id), todosBox.firstChild);
  }
};
// --------------------------------------

const deleteTodo = (activePage, todoId) => {
  document
    .querySelector(`[data-todos="${activePage}"] > [data-id="${todoId}"]`)
    .remove();
};

// --------------------------------------
const getPageTodoId = (activePage) => {
  const activePageTodosBox = document.querySelector(
    `[data-todos="${activePage}"]`
  );
  return activePageTodosBox.childNodes.length;
};
// --------------------------------------
const handleTodoEditStart = (todoElement) => {
  const todoText = todoElement.querySelector("span");
  const editButton = todoElement.querySelector(".edit-icon");
  const submitChangeIconHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
    `;

  const newEditElement = document.createElement("input");
  newEditElement.value = todoText.textContent;
  editButton.classList.add("submit-edit-icon");
  editButton.classList.remove("edit-icon");
  todoText.replaceWith(newEditElement);
  editButton.innerHTML = submitChangeIconHTML;
};
// --------------------------------------
const handleTodoEditEnd = (todoElement) => {
  const todoInput = todoElement.querySelector("input");
  const submitEditButton = todoElement.querySelector(".submit-edit-icon");

  const newSpanElement = document.createElement("span");
  newSpanElement.textContent = todoInput.value;
  const editButtonHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg>`;
  submitEditButton.classList.remove("submit-edit-icon");
  submitEditButton.classList.add("edit-icon");
  submitEditButton.innerHTML = editButtonHTML;
  todoInput.replaceWith(newSpanElement);
};
// --------------------------------------

const extractTodos = (todosElement) => {
  const extractedTodosArray = [];
  todosElement.childNodes.forEach((childNode) => {
    const spanOfChild = childNode.querySelector("span");
    const todoValue = spanOfChild.textContent;
    const todoId = childNode.dataset.id;
    const newTodoObject = createNewTodoObject(todoValue, todoId);
    extractedTodosArray.push(newTodoObject);
  });

  return extractedTodosArray;
};
// --------------------------------------
const resetTodoIds = (todoBox) => {
  let i = todoBox.childNodes.length - 1;
  todoBox.childNodes.forEach((todo) => {
    todo.dataset.id = i;
    i--;
  });
};
// --------------------------------------
const createNewTodoObject = (text, id) => {
  return {
    id: id,
    text: text,
  };
};
// ---------------------------------------
const createNewElement = (text, id) => {
  const newElement = document.createElement("p");
  const newTextElement = document.createElement("span");
  newTextElement.textContent = text;
  newElement.appendChild(newTextElement);
  newElement.dataset.id = id;

  const buttonIconsHtml = `<button class="edit-icon">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg>
    </button>
    <button class="delete-icon">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
    </button>
  
  `;
  newElement.insertAdjacentHTML("beforeend", buttonIconsHtml);
  return newElement;
};
// --------------------------------------
// Functions for pages
const createPagesArray = (allPages) => {
  const pageObjectsArray = [];
  allPages.forEach((page) => {
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
const savePages = (pagesArray) => {
  localStorage.removeItem("pages");
  localStorage.setItem("pages", JSON.stringify(pagesArray));
};
// --------------------------------------
const showActivePage = (pagesBox, activePage) => {
  const pages = pagesBox.querySelectorAll(".todo-page");
  pages.forEach((page) => {
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
const deletePage = (activePage) => {
  document.querySelector(`[data-todopage="${activePage}"]`).remove();
};

const resetPageIds = (pages) => {
  let i = 1;
  pages.forEach((page) => {
    page.dataset.todopage = i;
    page.querySelector("h2").dataset.pageid = i;
    page.querySelector("input").dataset.inputid = i;
    page.querySelector(".todo-page__todos").dataset.todos = i;
    i++;
  });
};
// Start of the app
const start = (pagesBox) => {
  if (localStorage.getItem("pages")) {
    const pagesArray = JSON.parse(localStorage.getItem("pages"));
    createPageHTML(pagesArray, pagesBox);
    pageID = pagesArray.length;
    todoID = pagesArray[0].todos.length;
    showActivePage(pagesBox, activePage);
  } else {
    createPageHTML(null, pagesBox);
    todoID = 0;
    showActivePage(pagesBox, activePage);
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
        const newElement = createNewElement(text, id);
        const todoBox = document.querySelector(`[data-todos="${page.pageId}"]`);
        todoBox.appendChild(newElement);
      });
    });
  }
};
// --------------------------------------
start(pagesBox);

// Saving function
const makeDataForSaving = () => {
  const allPages = document.querySelectorAll(".todo-page");
  const allPagesArray = createPagesArray(allPages);
  return allPagesArray;
};
