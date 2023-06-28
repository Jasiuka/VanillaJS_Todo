export const getHistoryTodosFromLocal = () => {
  const historyTodos = JSON.parse(localStorage.getItem("completedTodos"));
  return historyTodos;
};

export const createHistoryPopupItems = (completedTodosArray) => {
  const historyPopupItemsBox = document.createElement("div");
  historyPopupItemsBox.classList.add("history-popup__items-box");
  completedTodosArray?.forEach((completedTodo) => {
    const newItem = document.createElement("p");
    newItem.textContent = completedTodo.text;
    historyPopupItemsBox.appendChild(newItem);
  });
  return historyPopupItemsBox;
};
