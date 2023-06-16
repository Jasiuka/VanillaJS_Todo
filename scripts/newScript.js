const pagesBox = document.querySelector(".pages");
const newPageButton = document.querySelector(".pages__new-page-btn");
const nextButton = document.querySelector(".pages__next-btn");
const prevButton = document.querySelector(".pages__prev-btn");
let todoID = 0;
let pageID = 1;
let activePage = 1;

pagesBox.addEventListener("click", (e) => {
  const target = e.target;
  if (target.closest("button") && target.classList.contains("todo-page__btn")) {
    // const id = target.parentNode.dataset.todopage;
    const pageInput = document.querySelector(`[data-inputid="${activePage}"]`);
    const todoBox = document.querySelector(`[data-todos="${activePage}"]`);
    const value = pageInput.value;

    // Add todo element to todos box
    addTodos(value, todoID, todoBox);

    // get all pages data and save it
    const allPages = document.querySelectorAll(".todo-page");
    const allPagesArray = createPagesArray(allPages);
    savePages(allPagesArray);
    todoID++;
  }
});

newPageButton.addEventListener("click", () => {
  console.log("New page added");
  pageID++;
  activePage++;
  createPageHTML(null, pagesBox, pageID);
});

nextButton.addEventListener("click", () => {
  console.log("NEXT PAGE");
  activePage++;
  showActivePage(pagesBox, activePage);
});
prevButton.addEventListener("click", () => {
  console.log("PREV PAGE");
  activePage--;
  showActivePage(pagesBox, activePage);
});

const addTodos = (value, id, todosBox) => {
  if (todosBox.children.length === 0) {
    todosBox.appendChild(createNewElement(value, id));
  } else {
    todosBox.insertBefore(createNewElement(value, id), todosBox.firstChild);
  }
};

const createPagesArray = (allPages) => {
  const pageObjectsArray = [];
  allPages.forEach((page) => {
    console.log(page);
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

const savePages = (pagesArray) => {
  localStorage.removeItem("pages");
  localStorage.setItem("pages", JSON.stringify(pagesArray));
};

const extractTodos = (todosElement) => {
  console.log(todosElement);
  const extractedTodosArray = [];
  todosElement.childNodes.forEach((childNode) => {
    // Select span (which has text) of p element
    const spanOfChild = childNode.querySelector("span");
    const todoValue = spanOfChild.textContent;
    const todoId = childNode.dataset.id;
    const newTodoObject = createNewTodoObject(todoValue, todoId);
    extractedTodosArray.push(newTodoObject);
  });

  return extractedTodosArray;
};

const createNewTodoObject = (text, id) => {
  return {
    id: id,
    text: text,
  };
};

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

const showActivePage = (pagesBox, activePage) => {
  const pages = pagesBox.querySelectorAll(".todo-page");
  pages.forEach((page) => {
    console.log("Active:", activePage);

    console.log("Dataset: ", page.dataset.todopage);
    if (page.dataset.todopage === activePage.toString()) {
      page.classList.remove("hide");
      console.log("working");
    } else {
      page.classList.add("hide");
    }
  });
};

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

const createPageHTML = (pagesArray, pagesBox, pageId = 1) => {
  if (pagesArray === null) {
    const newPage = `
      <div class="todo-page" data-todoPage="${pageId}">
      <h2 class="todo-page__title" contenteditable="true" data-pageid="${pageId}">
        Todo page ${pageId}
      </h2>
      <input  
        class="todo-page__input"
        type="text"
        placeholder="write your todo"
        data-inputid="${pageId}"
      />
      <button class="todo-page__btn">add text</button>
      <div class="todo-page__todos" data-todos="${pageId}"></div>
    </div>
      `;

    pagesBox.insertAdjacentHTML("beforeend", newPage);
  } else {
    console.log("Pages array: ", pagesArray);
    pagesArray.forEach((page) => {
      console.log("One page:", page);
      const newPage = `
      <div class="todo-page" data-todoPage="${page.pageId}">
      <h2 class="todo-page__title" contenteditable="true" data-pageid="${page.pageId}">
        ${page.title}
      </h2>
      <input
        class="todo-page__input"
        type="text"
        placeholder="write your todo"
        data-inputid="${page.pageId}"
      />
      <button class="todo-page__btn">add text</button>
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

start(pagesBox);
