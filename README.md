# Notes App

## Setting up NodeJS on your system and in the application

Follow these instructions in order to setup the NodeJS environment for the Notes App.

1. You'll want to install Node on your system. You can download Node [here](https://nodejs.org/en). It is recommended to download the LTS version because it is the most stable version across many different node packages.
2. Next, you'll want to install NPM. Simply open your terminal and enter `npm install -g npm` to install npm globally on your machine. You can learn more about NPM [here](https://docs.npmjs.com/about-npm).
3. Run `node --version` or `node -v` and `npm --version` or `npm -v` in your console to make sure that NodeJS and NPM have been properly installed on your system. You should see the same version number in your console that was listed on the LTS download button.
4. Lastly, open the repository folder directory in the terminal and enter `cd server`. Once you are inside the server directory, enter `npm install` or `npm i` to install all of the project dependencies.
5. To run the node server in this application, inside the server directory in  the terminal, enter `node server.mjs`. This will run the server locally on your machine on port 8080 (localhost:8080).

## Setting up React in the application

Follow these instructions in order to setup the React environment for the Notes App.

1. First, open the repository folder directory in the terminal and enter `cd client`. Once you are inside the client directory, enter `npm install` or `npm i` to install all of the project dependencies.
2. To run the React application, inside the client directory in the terminal, enter `npm run dev`. This will run the application locally on your machine on port 3000 (localhost:3000).
3. Finally, open a web browser of your choice and enter localhost:3000 to navigate to the application's landing page.

## Running tests in the Server

* `npm test` -> Runs all the unit tests.

## Running tests in the Client

* `npm test` -> Runs all the unit tests.
* `npm test:watch` -> Runs all the unit tests interactively and spits out more details about errors.
* `npm test:coverage` -> Runs all the unit tests and calculates total unit test coverage.

## App start

* main.jsx/server.mjs - The entry points for the React application start from these specific files (client/server folders).
* conn.js – Responsible for creating a connection with MongoDB to access resources in the notes collection and database.

### Environments

* development - local development

## Tools/Libraries

* [npm](https://www.npmjs.com/) - JS package management
* [React](https://reactjs.org/) - Used to build UI
* [Built-in React Hooks](https://react.dev/reference/react/hooks) - State/Navigation management
* [Jest](https://jestjs.io/) - JavaScript Testing Framework
* [Express](https://expressjs.com/) - Node.js Web Application Framework
* [MongoDB](https://www.mongodb.com/) - Non-relational Database

## Core Principles of Unit Testing

* Lean and accurate testing
* Test the behaviour, not the implementation
* Test naming and structuring
* Deterministic and isolated tests
* Property-based testing and realistic data

[Read more](https://dev.to/one-beyond/the-5-principles-of-unit-testing-1p5f)

## Questions to Consider when Writing Unit Tests

* What do I do with the props I receive?
* What components do I render? What do I pass to those components?
* Do I ever keep anything in React state? If so, do I invalidate it when receiving new props? When do I update state?
* If a user interacts with me or a child component calls a callback I passed to it, what do I do?

## Not Worth Testing

* Prop types
* Inline styles
* If your test duplicates code from the subject under test then it's not worth testing. That test will be brittle (you should instead test behavior rather than configuration).
* Don't test things outside your component's concerns (ex. other components, library code, etc.). An exception would be for integration tests.

### Tutorials & Resources

* [FreeCodeCamp - Responsive Web Design](https://www.freecodecamp.org/learn/2022/responsive-web-design/)
* [Full Stack open - Building Full-stack Applications with React and Node in ES6](https://fullstackopen.com/en/#course-contents)
* [Tutorial - How to write unit tests in JS with Jest](https://dev.to/dstrekelj/how-to-write-unit-tests-in-javascript-with-jest-2e83)

## Common errors

Make sure that you are using a version of Node that is compatible with the dependency versions listed in the package.json(`node -v && npm -v`).

CORS (Cross-Origin Resource Sharing) defines a way for client web applications that are loaded in one domain to interact with resources in a different domain. In the case of this Notes app, the application is interacting with resources in MongoDB (the saved notes). If you are experiencing a CORS error, which blocks you from accessing those resources, here is a [guide](https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9) to troubleshoot possible issues.