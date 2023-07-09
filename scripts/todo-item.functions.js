import { completeTodoAnimation } from "./animations.js";

export const addTodos = (value, id, todosBox) => {
  if (!value || value === "") {
    return;
  } else {
    if (todosBox.children.length === 0) {
      todosBox.appendChild(createNewElement(value, id));
    } else {
      // Check for duplicates, if it already exist, do not add
      if (
        Array.from(todosBox.children).some((children) => {
          const childrenTextValue = children.querySelector("span").textContent;
          return childrenTextValue === value;
        })
      ) {
        alert("This item already exist in page!");
      } else {
        todosBox.insertBefore(createNewElement(value, id), todosBox.firstChild);
      }
    }
  }
};
// --------------------------------------

export const deleteTodo = (activePage, todoId) => {
  const todoToDelete = document.querySelector(
    `[data-todos="${activePage}"] > [data-id="${todoId}"]`
  );
  if (todoToDelete) {
    todoToDelete.remove();
  } else {
    return;
  }
};

// --------------------------------------

export const checkCompletedTodo = (todo) => {
  completeTodoAnimation(todo);
};

// --------------------------------------

export const saveCompletedTodo = (todo) => {
  if (localStorage.getItem("completedTodos")) {
    const completedTodosFromLocal = JSON.parse(
      localStorage.getItem("completedTodos")
    );
    const newCompletedTodoId = completedTodosFromLocal.length + 1;
    const newCompletedTodoObject = {
      id: newCompletedTodoId,
      text: todo.querySelector("span").textContent,
    };
    const newCompletedTodoObjectArray = [
      ...completedTodosFromLocal,
      newCompletedTodoObject,
    ];
    localStorage.setItem(
      "completedTodos",
      JSON.stringify(newCompletedTodoObjectArray)
    );
  } else {
    const completedTodoToSave = todo.querySelector("span").textContent;
    const completedTodoObjectArray = [
      {
        id: 1,
        text: completedTodoToSave,
      },
    ];
    localStorage.setItem(
      "completedTodos",
      JSON.stringify(completedTodoObjectArray)
    );
  }
};

// --------------------------------------
export const getPageTodoId = (activePage) => {
  if (activePage) {
    const activePageTodosBox = document.querySelector(
      `[data-todos="${activePage}"]`
    );
    console.log("new todo id:", activePageTodosBox.children.length);
    return activePageTodosBox.children.length;
  } else {
    return null;
  }
};
// --------------------------------------
export const handleTodoEditStart = (todoElement) => {
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
export const handleTodoEditEnd = (todoElement) => {
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

export const extractTodos = (todosElement) => {
  const extractedTodosArray = [];
  Array.from(todosElement.children)?.forEach((childrenElement) => {
    const spanOfChild = childrenElement.querySelector("span");
    const todoValue = spanOfChild.textContent;
    const todoId = childrenElement.dataset.id;
    const newTodoObject = createNewTodoObject(todoValue, todoId);
    extractedTodosArray.push(newTodoObject);
  });

  return extractedTodosArray;
};
// --------------------------------------
export const resetTodoIds = (todoBox) => {
  let i = todoBox.children.length - 1;
  Array.from(todoBox.children)?.forEach((todo) => {
    todo.dataset.id = i;
    i--;
  });
};
// --------------------------------------
export const createNewTodoObject = (text, id) => {
  return {
    id: id,
    text: text,
  };
};
// ---------------------------------------
export const createNewElement = (text, id) => {
  if (!text || (!id && id !== 0)) {
    throw new Error("Error. No text or id was given. ");
  }
  const newElement = document.createElement("p");
  const newTextElement = document.createElement("span");
  newTextElement.textContent = text;
  newElement.appendChild(newTextElement);
  newElement.dataset.id = id;

  const buttonIconsHtml = `<button class="edit-icon" title="Edit todo item">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
    </svg>
      </button>
      <button class="delete-icon" title="Delete todo item">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
      </button>
    
    `;
  const todoCheckBoxHTML = `<div class="completed-check" data-checkid="${id}" title="Check completed todo"></div>`;
  newElement.insertAdjacentHTML("beforeend", buttonIconsHtml);
  newElement.insertAdjacentHTML("afterbegin", todoCheckBoxHTML);
  return newElement;
};
// --------------------------------------
