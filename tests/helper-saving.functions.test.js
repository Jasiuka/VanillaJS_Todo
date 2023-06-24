import * as helperFunction from "../scripts/helper-and-saving.function";
describe("Helper and saving functions tests", () => {
  describe("savePages() tests", () => {
    test("Should save pages data to localStorage", () => {
      const mockPagesArray = [
        {
          pageId: 1,
          title: "New title",
          todos: [
            {
              id: 1,
              text: "New todo text",
            },
          ],
        },
        {
          pageId: 2,
          title: "New title two",
          todos: [
            {
              id: 1,
              text: "New todo text two",
            },
          ],
        },
      ];

      helperFunction.savePages(mockPagesArray);
      //   Check if all data was saved
      expect(JSON.parse(localStorage.getItem("pages")).length).toBe(2);
      //   Check if correct data was saved
      expect(JSON.parse(localStorage.getItem("pages"))[0].title).toBe(
        "New title"
      );
      expect(JSON.parse(localStorage.getItem("pages"))[1].title).toBe(
        "New title two"
      );
    });
    test("Should save empty array if no pagesArray provided and should not throw error", () => {
      const mockPagesArray = [];
      const spy = jest.spyOn(Storage.prototype, "removeItem");
      helperFunction.savePages(mockPagesArray);
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe("makeDataForSaving() tests", () => {
    test("Should make array of pages data", () => {
      document.body.innerHTML = `
      <div class="pages">
      <div data-todopage="1" class="todo-page">
          <h2>First page title</h2>
          <div>
              <p data-id="1">
              <span>Test todo</span>
              </p>
          </div>
      </div>
      <div data-todopage="2" class="todo-page">
          <h2>Second page title</h2>
          <div>
              <p data-id="1">
              <span>Test todo</span>
              </p>
          </div>
      </div>
  </div>
        `;
      const pagesArray = helperFunction.makeDataForSaving();
      expect(pagesArray.length).toBe(2);
      expect(pagesArray[0].title).toBe("First page title");
    });
    test("Should make empty data if no pages exist and not throw error", () => {
      document.body.innerHTML = `
            <div class="pages"></div>
        `;
      const pagesArray = helperFunction.makeDataForSaving();
      expect(pagesArray.length).toBe(0);
      expect(pagesArray[0]).toBeUndefined();
    });
  });
});
