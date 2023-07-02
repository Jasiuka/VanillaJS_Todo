# Vanilla JavaScript "Todo list" web application

---

Just completed React.js course on udemy. Decided to make some simple projects by myself, but everytime with different technology, this way I will renew my knowledge of technology or learn something new, so I thought it would be a good practice.

There will be 2 simple projects:

1. "Todo list" web application
2. Weather web application

"Todo list" project features:

- Pages (delete page, add new, move through pages) max pages - 7 (for every week day)
- Saving data to local storage of the browser
- Editing todo
- Deleting todo
- Editing page title
- Adding new todo when "Enter" key is pressed

Weather application project features:

- soon..

Technologies I will use to build these projects:

- Vanilla JavaScript
- React.js
- React.js with TypeScript
- Svelte\*
- Vue.js

---

## This is the first project, "Todo list" web application with vanilla JavaScript

Implemented features:

- Pages (delete page, add new, move through pages) max pages - 7 (for every week day) :white_check_mark:
- Saving data to local storage of the browser :white_check_mark:
- Editing todo :white_check_mark:
- Deleting todo :white_check_mark:
- Editing page title :white_check_mark:
- Adding new todo when "Enter" key is pressed :white_check_mark:

Unit tests for main app functions :white_check_mark:

App rules/restrictions:

- Limit of the characters in todo item is 85
- Max page limit: 7
- If last page left, you can't delete it
- Title length is 50 char.

### View in desktop:

<img src="https://i.ibb.co/phN4hfJ/todoapp.jpg" alt="App view in desktop" border="0" />
### View in phone:
<img src="https://i.ibb.co/k193h9n/mobileview-1.jpg" alt="App view in phone" border="0" />

---

## How to download project

#### Option 1 (ZIP):

1.  Click on the "Code" button located near the top-right corner of the repository page.
2.  Select "Download ZIP" from the dropdown menu.
    <img src="https://i.ibb.co/7CM0q94/in2.jpg" alt="Instruction of getting project code. No. 1" border="0" />

3.  Once the ZIP file is downloaded, locate it on your computer and extract its contents using a file compression tool.
4.  After extraction, you will have access to the project's files and folders.

#### Option 2 (URL):

1. Ensure that Git is installed on your computer. If not, download and install Git from the official website (https://git-scm.com/downloads).
2. Open a terminal or command prompt on your computer.
3. Copy the repository's clone URL from the GitHub repository page.
   <img src="https://i.ibb.co/Lk808bm/in1.jpg" alt="Instruction of getting project code. No. 2" border="0" />

4. In the terminal or command prompt, navigate to the directory where you want to clone the project.
5. Run the following command > _git clone [repository-url]_
6. Once the clone process is complete, you will have a local copy of the project's files and folders.

---

## Run project

1. Ensure you have Node.js and npm installed on your computer. If not, you can download and install them from the official Node.js website: https://nodejs.org/.
2. Open your project folder in your preferred IDE or text editor.
3. If your project has any external dependencies managed through npm, open a terminal or command prompt in your project directory.
4. Run the following command to install the project dependencies > _npm install_
5. Once the dependencies are installed, you can run your project using a development server or by simply opening the HTML file in a web browser.

- Using a development server: If you want to use a development server, you can use tools like live-server, http-server, or lite-server. To install any of these, run the following command (choose one):
  - _npm install -g live-server_
  - _npm install -g http-server_
  - _npm install -g lite-server_

6.  Then, navigate to your project folder in the terminal or command prompt and run the following command > _live-server_

## Run tests

1. Open your project folder in your IDE
2. Open terminal or command prompt and run the following command > _npm run test_

## Run Sass watching

1. Open your project folder in your IDE
2. Open terminal or command prompt and run the following command > _npm run watch:sass_
