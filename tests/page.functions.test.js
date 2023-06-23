import * as pageFunction from "../scripts/page.functions.js";

describe("Page function tests", () => {
  describe("createPagesArray() tests", () => {
    test("Should return array 2 of pages objects", () => {
      document.body.innerHTML = `
            <div class="pages">
                <div data-todopage="1" class="page">
                    <h2>First page title</h2>
                    <div>
                        <p data-id="1">
                        <span>Test todo</span>
                        </p>
                    </div>
                </div>
                <div data-todopage="2" class="page">
                    <h2>Second page title</h2>
                    <div>
                        <p data-id="1">
                        <span>Test todo</span>
                        </p>
                    </div>
                </div>
            </div>
        `;
      const allPagesElement = document.querySelectorAll(".page");
      const pagesArray = pageFunction.createPagesArray(allPagesElement);
      expect(pagesArray.length).toBe(2);
    });
    test("Should return array 0 if no pages given", () => {
      document.body.innerHTML = `
              <div class="pages">
              </div>
          `;
      const allPagesElement = document.querySelectorAll(".page");
      const pagesArray = pageFunction.createPagesArray(allPagesElement);
      expect(pagesArray.length).toBe(0);
    });
  });
  describe("showActivePage() tests", () => {
    test("Should show active page (remove hide class) and hide others (add hide class)", () => {
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
                <div data-todopage="3" class="todo-page">
                    <h2>Second page title</h2>
                    <div>
                        <p data-id="1">
                        <span>Test todo</span>
                        </p>
                    </div>
                </div>
            </div>
        `;
      const pagesBox = document.querySelector(".pages");
      pageFunction.showActivePage(pagesBox, 2);
      // Second page should be visible and 1,3 pages should have class 'hide'
      expect(pagesBox.children[0].classList).toContain("hide");
      expect(pagesBox.children[1].classList).not.toContain("hide");
      expect(pagesBox.children[2].classList).toContain("hide");
    });
    test("Should not throw error if no pages exist", () => {
      document.body.innerHTML = `<div class="pages"></div>`;
      const pagesBox = document.querySelector(".pages");
      expect(() => pageFunction.showActivePage(pagesBox, 2)).not.toThrow();
    });
  });
  describe("deletePage() tests", () => {
    test("Should delete page from document", () => {
      document.body.innerHTML = `
        <div class="pages">
            <div class="todo-page" data-todopage="1"></div>
            <div class="todo-page" data-todopage="2"></div>
            <div class="todo-page" data-todopage="3"></div>
        </div>
      `;
      // Should delete 2nd page
      pageFunction.deletePage(2);
      const firstPage = document.querySelector(`[data-todopage="${1}"]`);
      const secondPage = document.querySelector(`[data-todopage="${2}"]`);
      const thirdPage = document.querySelector(`[data-todopage="${3}"]`);
      expect(firstPage).not.toBeNull();
      expect(secondPage).toBeNull();
      expect(thirdPage).not.toBeNull();
    });
    test("Should not throw error if page doesn't exist", () => {
      document.body.innerHTML = `
        <div class="pages">
            <div class="todo-page" data-todopage="1"></div>
            <div class="todo-page" data-todopage="2"></div>
            <div class="todo-page" data-todopage="3"></div>
        </div>
      `;
      // Should delete 2nd page
      expect(() => pageFunction.deletePage(5)).not.toThrow();
    });
  });
  describe("resetPageIds() tests", () => {
    test("Should change page element id and title id by order of created pages", () => {
      document.body.innerHTML = `
            <div class="pages">
                <div data-todopage="1" class="todo-page">
                    <h2 data-pageid="1">First page title</h2>
                    <div class="todo-page__todos" data-todos="3">
                        <p data-id="1">
                        <span>Test todo</span>
                        </p>
                    </div>
                </div>
                <div data-todopage="2" class="todo-page">
                    <h2 data-pageid="2">Second page title</h2>
                    <div class="todo-page__todos" data-todos="5">
                        <p data-id="1">
                        <span>Test todo</span>
                        </p>
                    </div>
                </div>
                <div data-todopage="3" class="todo-page">
                    <h2 data-pageid="3">Third page title</h2>
                    <div class="todo-page__todos" data-todos="1">
                        <p data-id="1">
                        <span>Test todo</span>
                        </p>
                    </div>
                </div>
            </div>
        `;
      const allPages = document.querySelectorAll(".todo-page");
      pageFunction.resetPageIds(allPages);
      const firstPageTitleId = document.querySelector(`[data-pageid="${1}"]`);
      const firstPageTodoBoxId = document.querySelector(`[data-todos="${1}"]`);
      const firstPageId = document.querySelector(`[data-todopage="${1}"]`);
      expect(firstPageTitleId).not.toBeNull();
      expect(firstPageTodoBoxId).not.toBeNull();
      expect(firstPageId).not.toBeNull();
      //
      const secondPageTitleId = document.querySelector(`[data-pageid="${2}"]`);
      const secondPageTodoBoxId = document.querySelector(`[data-todos="${2}"]`);
      const secondPageId = document.querySelector(`[data-todopage="${2}"]`);
      expect(secondPageTitleId).not.toBeNull();
      expect(secondPageTodoBoxId).not.toBeNull();
      expect(secondPageId).not.toBeNull();
      //
      const thirdPageTitleId = document.querySelector(`[data-pageid="${3}"]`);
      const thirdPageTodoBoxId = document.querySelector(`[data-todos="${3}"]`);
      const thirdPageId = document.querySelector(`[data-todopage="${3}"]`);
      expect(thirdPageTitleId).not.toBeNull();
      expect(thirdPageTodoBoxId).not.toBeNull();
      expect(thirdPageId).not.toBeNull();
    });
    test("Should not throw error if no pages exist", () => {
      const allPages = document.querySelectorAll(".pages");
      expect(() => pageFunction.resetPageIds(allPages)).not.toThrow();
    });
  });
});
