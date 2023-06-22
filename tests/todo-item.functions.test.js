import { addTodos, createNewElement } from "../scripts/todo-item.functions";
describe("Todo item functions tests", () => {
  test("Add todo function. Should add todo to todoBox", () => {
    const mockTodoBox = document.createElement("div");
    addTodos("New test todo", 1, mockTodoBox);
    expect(mockTodoBox.childNodes.length).toBe(1);
  });

  test("Add todo function. Should add todo to todoBox before already existing todo", () => {
    const mockTodoBox = document.createElement("div");
    addTodos("New test todo", 1, mockTodoBox);
    addTodos("New test 2 todo", 2, mockTodoBox);
    const childNodes = mockTodoBox.childNodes;
    expect(childNodes.length).toBe(2);
    expect(childNodes[0].querySelector("span").textContent).toBe(
      "New test 2 todo"
    );
    expect(childNodes[1].querySelector("span").textContent).toBe(
      "New test todo"
    );
  });

  test("Add todo function. Should not add anything", () => {
    const mockTodoBox = document.createElement("div");
    addTodos("", 1, mockTodoBox);
    addTodos(undefined, 1, mockTodoBox);
    expect(mockTodoBox.childNodes.length).toBe(0);
  });
});
