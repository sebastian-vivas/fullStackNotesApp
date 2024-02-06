# Notes App

## Setting up NodeJS on your system and in the application

Follow these instructions to setup the NodeJS environment for the Notes App.

1. First install Node on your computer. You can download Node [here](https://nodejs.org/en). It is recommended to download the LTS version because it is the most stable version across various node packages.
2. Next install NPM. Open the command line and enter `npm install -g npm` to install npm globally on your machine. You can learn more about NPM [here](https://docs.npmjs.com/about-npm).
3. Run `node --version && npm --version` in the command line to make sure that NodeJS and NPM have been properly installed on your computer.
4. Open the repository folder directory in the command line and enter `cd server`. Once you are inside the server directory, enter `npm install` to install all of the project dependencies.
5. To run the node server in the Notes application, inside the server directory enter `node server.mjs`. This will run the server locally on your machine on port 8080 (localhost:8080).

## Setting up React in the application

Follow these instructions in order to setup the React environment for the Notes App.

1. First, open the repository folder directory in the the command line and enter `cd client`. Once you are inside the client directory, enter `npm install` to install all of the project dependencies.
2. To run the React application, enter `npm run dev`. This will run the application locally on your machine on port 3000 (localhost:3000).
3. Open a web browser of your choice and enter localhost:3000 to navigate to the application's landing page.

## Running unit tests in the server folder

* `npm test` -> Runs all of the unit tests.

## Running unit tests in the client folder

* `npm test` -> Runs all of the unit tests once.
* `npm test:watch` -> Runs all the unit tests countinuously on save and prints error details.
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
* [Vitest](https://vitest.dev/) - React Testing Framework that is Jest Compatible
* [Express](https://expressjs.com/) - Node.js Web Application Framework
* [MongoDB](https://www.mongodb.com/) - Non-relational Database

## Why are unit tests important? What is test driven development?

Unit testing is vital for software development because it reduces the chances of human error from occuring and makes sure that software is functioning as expected. This saves developers a lot of time and headache. Unit tests sprouted a technique for software development called test driven development which guides development through writing tests. Traditionally TDD is done in these three steps:

1. Write a test for the functionality you want to add to your application.
2. Write the functional code until the test passes.
3. Refactor both the new and old code to make it well structured.

There are libraries that allow developers to calculate the total unit test coverage in an application. 80% unit test coverage or more is ideal and effective for maintaining codebases. You can calculate the total coverage in the notes app by running `npm test:coverage`. This will create a new folder call "coverage" with valuable information regarding test coverage in the application.

## Things that aren't worth testing

* Prop types
* Inline styles
* If your test duplicates code from the subject under test then it's not worth testing. That test will be brittle. You  should instead test behavior rather than configuration.
* Don't test things outside your component's concerns (ex. other components, library code, etc.). An exception would be for integration tests.

### Tutorials & Resources

* [Guide - Getting started with Vitest](https://vitest.dev/guide/)
* [Tutorial - How to write unit tests with Jest](https://dev.to/dstrekelj/how-to-write-unit-tests-in-javascript-with-jest-2e83)
* [Resources - The Principles of Unit Testing](https://dev.to/one-beyond/the-5-principles-of-unit-testing-1p5f)

## Common errors

Make sure that you are using a version of Node that is compatible with the dependency versions listed in the package.json(`node -v && npm -v`).

CORS (Cross-Origin Resource Sharing) defines a way for client web applications that are loaded in one domain to interact with resources in a different domain. In the case of this Notes app, the application is interacting with resources in MongoDB (the saved notes). If you are experiencing a CORS error, which blocks you from accessing those resources, here is a [guide](https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9) to troubleshoot possible issues.
