import * as historyPopup from "../scripts/history-popup.functions.js";

describe("History popup tests", () => {
  describe("getHistoryTodosFromLocal() test", () => {
    test("Should return array from local storage", () => {
      const mockHistoryTodos = [
        { id: 1, text: "new todo" },
        { id: 2, text: "new todo also" },
      ];
      localStorage.setItem("completedTodos", JSON.stringify(mockHistoryTodos));
      const historyTodos = historyPopup.getHistoryTodosFromLocal();
      expect(historyTodos[0].text).toBe("new todo");
      expect(historyTodos[1].text).toBe("new todo also");
    });
    test("Should return null if completedTodos doesn't exist in local storage", () => {
      localStorage.clear();
      const historyTodos = historyPopup.getHistoryTodosFromLocal();
      expect(historyTodos).toBe(null);
    });
  });
  describe("createHistoryPopupItems", () => {
    test("Should create messageItem 'No completed todos yet!' ", () => {
      //   const mockedCompletedTodosArrayFromLocal = [
      //     { id: 1, text: "new todo" },
      //     { id: 2, text: "new todo also" },
      //   ];
      const mockedCompletedTodosArrayFromLocal = [];
      const historyPopupElement = historyPopup.createHistoryPopupItems(
        mockedCompletedTodosArrayFromLocal
      );
      console.log(historyPopupElement);
      expect(historyPopupElement.querySelector("p").textContent).toBe(
        "No completed todos yet!"
      );
    });
    test("Should create p elements from local storage items ", () => {
      const mockedCompletedTodosArrayFromLocal = [
        { id: 1, text: "new todo" },
        { id: 2, text: "new todo also" },
      ];

      const historyPopupElement = historyPopup.createHistoryPopupItems(
        mockedCompletedTodosArrayFromLocal
      );
      expect(historyPopupElement.querySelectorAll("p").length).toBe(2);
    });
  });
});
