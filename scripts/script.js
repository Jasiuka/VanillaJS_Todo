// Globals
const pagesBox = document.querySelector(".pages");
let todoID = 0;
let pageID = 1;
let activePage = 1;

// addTodoButton.addEventListener("click", () => {
//   const inputValue = input.value;
//   addTodos(inputValue, todoID, todosBox);

//   input.value = "";
//   todoID++;
// });

// todosBox.addEventListener("click", (e) => {
//   const target = e.target;
//   if (target.closest("button.delete-icon")) {
//     const todoId = target.closest("p").dataset.id;
//     deleteTodos(todoId, todosBox);
//   }
// });

// title.addEventListener("blur", () => {});

pagesBox.addEventListener("click", (e) => {
  const target = e.target;
  if (target.closest("button")) {
    const id = target.parentNode.dataset.todopage;
    const pageInput = document.querySelector(`[data-inputid="${id}"]`);
    const todoBox = document.querySelector(`[data-todos="${pageID}"]`);
    const value = pageInput.value;
    // Add todo to todos box
    addTodos(value, todoID, todoBox);

    const allTodoBoxes = document.querySelectorAll(".todo-page__todos");
  }
});

// //////
// ///////////////FUNCTIONS
// //////

// Add Todo to todosBox and saves all todos that already in todosBox;
const addTodos = (value, id, todosBox) => {
  if (todosBox.children.length === 0) {
    todosBox.appendChild(createNewElement(value, id));
  } else {
    todosBox.insertBefore(createNewElement(value, id), todosBox.firstChild);
  }

  //   Saves page to local
  //   const todosArray = createTodoArray(todosBox);
  //   const pagesArray = createPagesArray(
  //     todosArray,
  //     title.textContent,
  //     title.dataset.pageid
  //   );
  //   savePages(pagesArray);
  //   //   saveTodosToLocal(todosArray);
};

// Deletes todo by id
const deleteTodos = (id, todosBox) => {
  const elementToDelete = document.querySelector(`[data-id="${id}"]`);
  console.log(elementToDelete);
  todosBox.removeChild(elementToDelete);
  updateTodosIds(todosBox);

  //   Updates todos in local
  const todosArray = createTodoArray(todosBox);
  const pagesArray = createPagesArray(
    todosArray,
    title.textContent,
    title.dataset.pageid
  );
  savePages(pagesArray);
};

const editTodos = (id) => {};

// Updates todos Ids
const updateTodosIds = (todosBox) => {
  let i = todosBox.children.length - 1;
  let j = 0;
  while (i >= 0) {
    todosBox.childNodes[i].dataset.id = j;
    i--;
    j++;
  }
};

// Creates todo array
const createTodoArray = (todosBox) => {
  const todosArray = [];
  todosBox.childNodes.forEach((childNode) => {
    // Select span (which has text) of p element
    const spanOfChild = childNode.querySelector("span");
    const todoValue = spanOfChild.textContent;
    const todoId = childNode.dataset.id;
    const newObject = createNewTodoObject(todoValue, todoId);
    todosArray.push(newObject);
  });

  return todosArray;
};

const savePages = (pagesArray) => {
  localStorage.removeItem("pages");
  localStorage.setItem("pages", JSON.stringify(pagesArray));
};

const createPagesArray = (todoArray, pageTitle, pageId) => {
  const newPagesArray = [];
  const newPageObject = {
    pageId: pageId,
    title: pageTitle,
    todos: todoArray,
  };
  newPagesArray.push(newPageObject);
  return newPagesArray;
};

// First removes old todos array, then saves new array.
const saveTodosToLocal = (todosArray) => {
  localStorage.removeItem("Todos");
  localStorage.setItem("Todos", JSON.stringify(todosArray));
};

// Creates todo object for todosArray
const createNewTodoObject = (text, id) => {
  return {
    id: id,
    text: text,
  };
};

// Creates new element for todo
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

const CheckLocalStorage = (todosBox) => {
  if (localStorage.length !== 0) {
    const pagesArray = JSON.parse(localStorage.getItem("pages"));
    todoID = pagesArray.todos.length;
    pageID = pagesArray.length;
    pagesArray.forEach((page) => {
      page.todos.forEach((todo) => {
        const newTodoToAdd = createNewElement(todo.text, todo.id);
      });
    });
  } else {
    todoID = 0;
  }
};

const start = (pagesBox) => {
  if (localStorage.length !== 0) {
    const pagesArray = JSON.parse(localStorage.getItem("pages"));
    createPageHTML(pagesArray, pagesBox, todosBoxes);
    pageID = pagesArray.length;
    todoID = pagesArray[0].todos.length;
    activePage = 1;
  } else {
    createPageHTML(null, pagesBox);
    todoID = 0;
    pageID = 1;
    activePage = 1;
  }
};

const createPageHTML = (pagesArray, pagesBox) => {
  if (pagesArray === null) {
    const newPage = `
    <div class="todo-page" data-todoPage="1">
    <h2 class="todo-page__title" contenteditable="true" data-pageid="1">
      Todo page 1
    </h2>
    <input  
      class="todo-page__input"
      type="text"
      placeholder="write your todo"
      data-inputid="1"
    />
    <button class="todo-page__btn">add text</button>
    <div class="todo-page__todos" data-todos="1"></div>
  </div>
    `;

    pagesBox.insertAdjacentHTML("beforeend", newPage);
  } else {
    pagesArray.forEach((page) => {
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
    <div class="todo-page__todos" data-todos="${page.pageID}"></div>
  </div>
    `;
      pagesBox.insertAdjacentHTML("beforeend", newPage);

      page.todos.forEach(({ text, id }) => {
        const newElement = createNewElement(text, id);
        const todoBox = document.querySelector(`[data-todos="${page.pageID}"]`);
        todoBox.appendChild(newElement);
      });
    });
  }
};

start(pagesBox);
