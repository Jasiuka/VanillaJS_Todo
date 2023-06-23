import {
  addTodos,
  createNewElement,
  deleteTodo,
  saveCompletedTodo,
  getPageTodoId,
  handleTodoEditStart,
  handleTodoEditEnd,
  extractTodos,
  resetTodoIds,
} from "../scripts/todo-item.functions";

describe("Todo functions test", () => {
  describe("addTodos() function tests", () => {
    test("Should add todo to todoBox", () => {
      const mockTodoBox = document.createElement("div");
      addTodos("New test todo", 1, mockTodoBox);
      expect(mockTodoBox.childNodes.length).toBe(1);
    });

    test("Should add todo to todoBox before already existing todo", () => {
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

    test("Should not add anything", () => {
      const mockTodoBox = document.createElement("div");
      addTodos("", 1, mockTodoBox);
      addTodos(undefined, 1, mockTodoBox);
      expect(mockTodoBox.childNodes.length).toBe(0);
    });
  });

  describe("deleteTodo() tests", () => {
    test("Should delete todo in specified active page and todo id ", () => {
      document.body.innerHTML = `
      <div class="todoBox" data-todos="1">
        <p data-id="1"><span>Mocked todo</span></p>
      </div>
      <div class="todoBoxS" data-todos="2">
        <p data-id="1"><span>Mocked todo 2</span></p>
      </div>
      
      `;
      deleteTodo(2, 1);
      expect(document.querySelector(".todoBox").children.length).toBe(1);
      expect(document.querySelector(".todoBoxS").children.length).toBe(0);
    });

    test("Should delete nothing if activePage doesn't exist or todo is not found by id", () => {
      document.body.innerHTML = `
      <div class="todoBox" data-todos="1">
        <p data-id="1"><span>Mocked todo</span></p>
      </div>
      <div class="todoBoxS" data-todos="2">
        <p data-id="1"><span>Mocked todo 2</span></p>
      </div>
      `;
      deleteTodo(null, 4);
      expect(document.querySelector(".todoBox").children.length).toBe(1);
      expect(document.querySelector(".todoBoxS").children.length).toBe(1);
    });
  });

  describe("saveCompletedTodo() tests", () => {
    test("Should save todo item to local storage and it's id should be depending of saving order", () => {
      document.body.innerHTML = `
      <div class="todoBox" data-todos="1">
        <p data-id="1"><span>Mocked todo</span></p>
        <p data-id="2"><span>Mocked todo new</span></p>
      </div>
      `;

      const todoItem = document.querySelector(`[data-id="${1}"]`);
      const todoItemTwo = document.querySelector(`[data-id="${2}"]`);
      saveCompletedTodo(todoItem);
      saveCompletedTodo(todoItemTwo);
      expect(JSON.parse(localStorage.getItem("completedTodos")).length).toBe(2);
      expect(JSON.parse(localStorage.getItem("completedTodos"))[0].id).toBe(1);
      expect(JSON.parse(localStorage.getItem("completedTodos"))[1].id).toBe(2);
    });
  });

  describe("getPageTodoId() tests", () => {
    test("Should return next todo item id in page depending on given active page", () => {
      document.body.innerHTML = `
      <div class="todoBox" data-todos="1">
      <p><span>test todo item</span></p>
      <p><span>test todo item</span></p>
      <p><span>test todo item</span></p>
      <p><span>test todo item</span></p>
      </div>
      `;

      expect(getPageTodoId(1)).toBe(4);
    });
    test("Should return null if active page is empty or doesn't exist", () => {
      document.body.innerHTML = `
      <div class="todoBox" data-todos="1">
      <p><span>test todo item</span></p>
      <p><span>test todo item</span></p>
      <p><span>test todo item</span></p>
      <p><span>test todo item</span></p>
      </div>
      `;

      expect(getPageTodoId("")).toBeNull();
      expect(getPageTodoId(null)).toBeNull();
    });
  });
  describe("handleTodoEditStart(), handleTodoEditEnd() tests", () => {
    test("handleTodoEditStart(). Should replace todo item text element to input and edit button class should be changed", () => {
      document.body.innerHTML = `
        <div>
        <p><span>Todo text</span><button class="edit-icon">icon</button></p>
        </div>
      `;
      const todoElement = document.querySelector("p");

      handleTodoEditStart(todoElement);
      const inputElement = todoElement.querySelector("input");
      expect(inputElement).not.toBeNull();
      expect(inputElement.value).toBe("Todo text");
      const changedButton = todoElement.querySelector(".submit-edit-icon");
      expect(changedButton).not.toBeNull();
    });
    test("handleTodoEditEnd(). Should replace todo item input element to span and edit button class 'submit-edit-icon' should be removed", () => {
      document.body.innerHTML = `
        <div>
        <p><input>Todo text</input><button class="edit-icon submit-edit-icon">icon</button></p>
        </div>
      `;
      const todoElement = document.querySelector("p");
      handleTodoEditEnd(todoElement);
      const inputElement = todoElement.querySelector("input");
      const spanElement = todoElement.querySelector("span");
      expect(inputElement).toBeNull();
      expect(spanElement).not.toBeNull();
      const changedButton = todoElement.querySelector(".submit-edit-icon");
      expect(changedButton).toBeNull();
    });
  });
  describe("extactTodos() tests", () => {
    test("Should return array of 4 todo item objects from todo box element", () => {
      document.body.innerHTML = `
        <div class="todoBox">
        <p data-id="1"><span>test todo</span></p>
        <p data-id="2"><span>test todo 2</span></p>
        <p data-id="3"><span>test todo 3</span></p>
        <p data-id="4"><span>test todo 4</span></p>
        </div>
      `;

      const todoBoxElement = document.querySelector(".todoBox");
      expect(extractTodos(todoBoxElement).length).toBe(4);
    });
    test("Should return array of 0 todo item objects from todo box element", () => {
      document.body.innerHTML = `
        <div class="todoBox">
        </div>
      `;

      const todoBoxElement = document.querySelector(".todoBox");
      expect(extractTodos(todoBoxElement).length).toBe(0);
    });
  });
  describe("resetTodoIds() tests", () => {
    test("Should change todo ids by adding order", () => {
      document.body.innerHTML = `
        <div class="todoBox">
        <p data-id="8"><span>test todo</span></p>
        <p data-id="6"><span>test todo 2</span></p>
        <p data-id="9"><span>test todo 3</span></p>
        <p data-id="7"><span>test todo 4</span></p>
        </div>
      `;
      const todoBoxElement = document.querySelector(".todoBox");
      resetTodoIds(todoBoxElement);
      expect(todoBoxElement.children[0].dataset.id).toBe("3"); // last added element
      expect(todoBoxElement.children[3].dataset.id).toBe("0"); // first added element
    });
    test("Should not throw error", () => {
      document.body.innerHTML = `
        <div class="todoBox">
        </div>
      `;
      const todoBoxElement = document.querySelector(".todoBox");
      resetTodoIds(todoBoxElement);
      expect(() => extractTodos(todoBoxElement)).not.toThrow();
    });
  });
  describe("createNewElement() tests", () => {
    test("Should create new todo element p with buttons, span", () => {
      const testText = "New test text";
      const testId = 1;
      const newCreatedElement = createNewElement(testText, testId);
      expect(newCreatedElement.querySelector(".edit-icon")).not.toBeNull();
      expect(newCreatedElement.querySelector(".delete-icon")).not.toBeNull();
      expect(newCreatedElement.querySelector("span").textContent).toBe(
        "New test text"
      );
      expect(newCreatedElement.dataset.id).toBe("1");
    });
    test("Should throw error and not create element", () => {
      const testText = null;
      const testId = undefined;
      expect(() => createNewElement(testText, testId)).toThrow(
        "Error. No text or id was given. "
      );
    });
  });
});
