export const getHistoryTodosFromLocal = () => {
  const historyTodos = JSON.parse(localStorage.getItem("completedTodos"));
  return historyTodos;
};

export const createHistoryPopupItems = (completedTodosArray) => {
  const historyPopupItemsBox = document.createElement("div");
  historyPopupItemsBox.classList.add("history-popup__items-box");
  completedTodosArray.length !== 0
    ? completedTodosArray?.forEach((completedTodo) => {
        const newItem = document.createElement("p");
        newItem.textContent = completedTodo.text;
        historyPopupItemsBox.appendChild(newItem);
      })
    : historyPopupItemsBox.appendChild(createMessageItem());
  return historyPopupItemsBox;
};

// Create messageItem if no completedTodos exist
export const createMessageItem = () => {
  const newMessageItem = document.createElement("p");
  newMessageItem.textContent = "No completed todos yet!";
  return newMessageItem;
};
