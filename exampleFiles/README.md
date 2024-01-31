# EXAMPLE WEB APP

## Setting up NodeJS on your system

Follow these instructions in order to setup the NodeJS environment for RefreshUI. 

1. You'll want to setup NVM (Node Version Manager) on your system, follow [this guide](https://github.com/nvm-sh/nvm#installation-and-update) to setup NVM on your specific system.
2. Once NVM is setup properly on your system install NodeJS version 12.18.3 using the command `nvm install 12.18.3`
3. Run `node --version` in your console to make sure that NodeJS has been properly installed on your system. You should get `v12.18.3` in your console as the output of the previous command.

## Tools/Libraries

* [npm](https://www.npmjs.com/) - JS package management
* [React](https://reactjs.org/) - used to build UI. Corresponds to "View" in MVC pattern
* [Redux](https://redux.js.org/) - state management
* [Webpack](https://webpack.js.org/) - module bundling (plugins for dev web server, JS uglification, scss compilation)
* [Sinon](https://sinonjs.org/) - Spies, stubs, and mocks for unit testing
* [Chai](https://www.chaijs.com/) - Assertion library for unit testing
* [Jest](https://facebook.github.io/jest/) - Snapshot testing
* [Enzyme](https://github.com/airbnb/enzyme) - React testing utility
* [Babel](https://babeljs.io/) - JSX compilation; ES7+ to ES5 compilation to leverage the latest JS language features
* [Immutable.js](https://facebook.github.io/immutable-js/) - Persistent, immutable data structures for predictable and optimized state modification
* [React Loadable](https://github.com/jamiebuilds/react-loadable) - A higher order component for loading components asynchronously

## Overview: State Management with Redux

*The following serves as a high level explanation of React + Redux principles, best practices, and how they will be applied to this app.*

### Core principles of Redux

* The persistence layer (i.e. store) and change logic are separate.
* One, single store with hierarchical reducers.
* Actions trigger changes (no centralized dispatcher).
* Container components connect directly to the store and subscribe only to the state they need.
* State is immutable.

### Redux flow

* The application (i.e. React) triggers an action of a given type passing along new state in the form of a payload object.
* The action funnels through all registered reducers triggering handlers for any reducer setup to handle that particular type of action.
* The reducer(s) modify their particular slice of state from the action payload and return a new copy of their respective state tree with the applied updates.
* The store notifies subscribers (i.e. connected components) with the updated state for the segment(s) of the state tree that were modified.
* The application waits for the next action.

> For brevity, Redux framework internals (such as middleware and hot reducer replacement) have been omitted from the flow diagram.

#### What is an action?

An object (or function that returns an object) containing the description of an event (i.e. type) along with any optional payload.

e.g.

```jsx
rateCourse(rating) {
  return { type: RATE_COURSE, rating };
}
```

#### What is the store?

The entire state tree of the application. (sole source of truth!)

Operations of a store:

* `store.dispatch(action) // dispatch actions for processing`
* `store.subscribe(listener) // notify subscribers of state changes`
* `store.getState() // expose slices of state tree to interested components`

#### What is a reducer?

A function that takes a slice of state and an action and returns new state in response to that action.

e.g.

```javascript
function myReducer(state, action) {
  // return new state based on action passed
}
```

Redux sounds confusing! How do I know when to use Redux state vs React state vs props?

|               | Permissions               | When to use?                                                                                             |
|---------------|---------------------------|----------------------------------------------------------------------------------------------------------|
| State (Redux) | read, write (via actions) | Persistent, global,  complex,  multi-access                                                              |
| State (React) | read, write               | Ephemeral, local, simple, uni-access (if target is calculated from props or used inside render function) |
| Props         | read                      | For everything else                                                                                      |

## Project Structure

### App start

* example.js - The entry point to the application starts from a specific file (e.g. example.js).
* bootstrap.js – Responsible for creating Redux store and initializing Providers, Router, and App.

### Container Components – stateful

* [product]App.js – Top-level structural component for laying out global components not specific to core page content (e.g. Navbar, Footer) and defining routes. Basically, anything that is present on all pages should be global (e.g. RentersApp.js).
* Page – Routable content segment(s) with state accessor/mutator privilege.
  * About
  * Discount
  * Coverage
  * Purchase
  * SignUp
  * ThankYou
* Group/Container – This is a generic classification for any stateful components living between the top-level page component and the atomic-level presentation component.
  * e.g. CoverageSections – used to render a collection of deductibles/coverages

### Presentation Components – stateless

* Layout – Governs the overall layout and presentation of a page.
  * Grid – Layout abstraction for responsive, 24 grid system
  * Header
  * Content – Main content body.
  * Footer
* Navigation
  * Navbar
* Data Entry
  * Form / FormGroup – Not to be thought of as a traditional html form element, but rather a logical collection of sub-components that trigger some type of event to be processed on change, keyup or submit.
  * Input – Composable component to normalize structure, props, and behaviors of input elements (i.e position and placement of label, trigger/format validation messages, and simplify event handler bindings)
    * TextInput
    * NumberInput
    * etc.
  * DatePicker
  * Checkbox
  * Radio
  * Select / Dropdown
* General
  * Image
  * Icon
  * Menu
  * Label
  * Button
  * Validation – Componentized group of sub-components to organize/format validation messages (for use w/ FormGroup and Input components above).
  * Loading – visual feedback for scroll / virtualized / lazy loading of components and computationally-intensive operations.

### Higher-Order Components (HOC) – composed

Component enhancers / decorators that can add additional functionality to any of the aforementioned components

* withRouter
* withHidden
* withDebounce
* withTheme

### Meta Components – contextual/nonvisible

* RefreshApplication - returns an empty render but enforces page rules (e.g. shouldn't be able to navigate backwards from the ThankYou page)

#### What is the difference between a container and presentation component?

| Container                  | Presentation                       |
|----------------------------|------------------------------------|
| Little to no markup        | Nearly all markup                  |
| Pass data and actions down | Receive data and actions via props |
| Knows about Redux          | Doesn't know about Redux           |
| Often stateful             | Typically functional components    |
| Smart                      | Dumb                               |
| Stateful                   | Stateless                          |
| Controller View            | View                               |
| Focus on how things work   | Focus on how things look           |
| Aware of Redux             | Unaware of Redux                   |
| Subscribe to Redux State   | Read data from props               |
| Dispatch Redux actions     | Invoke callbacks on props          |
| Generated by react-redux   | Written by hand                    |

## Style Declarations

> Note: the *module* infix in the filename is **required** for module-style imports.

```js
// global scss import
import './stylesheet.scss';

// modular scss import
import classes from './stylesheet.module.scss';
```

## Unit Testing React Components

### Not worth testing

* Prop types
* Inline styles
* If your test duplicates code from the subject under test then it's not worth testing. That test will be brittle (you should instead test behavior rather than configuration)
* Don't test things outside your component's concerns (ex. other components, library code, etc.). An exception would be for integration tests

### Worth testing

* What do I do with the props I receive?
* What components do I render? What do I pass to those components?
* Do I ever keep anything in React state? If so, do I invalidate it when receiving new props? When do I update state?
* If a user interacts with me or a child component calls a callback I passed to it, what do I do?
* Does anything happen when I’m mounted? When I’m unmounted?

### When to use Jest vs. Sinon vs. Chai

Only use Jest for snapshots. Use Sinon for stubs, mocks, and spies Use Chai for assertions.

### Running tests
* npm test -> Runs all the unit tests.
* npm test:verbose:watch -> Runs all the unit tests interactively and spits out more details about errors.
* npm test -- -u -> Fixes snapshots that needs to be updated and runs all the unit tests.
* npm run test:dcc -> Runs data compliance tests to test SAPI endpoints.
* npm run test:storybook:update -> Storybook tests and update.

## Style Opinions

REM units should be used for fonts and font related items (fonts, containers for fonts, margin, min-height, etc.).

PX should be used for structural items (gutters, padding, etc.).

Elements that concern themselves with the viewport/window size should generally use vh/vm (e.g. fixed elements)

## Style Composition
A simple styled component might consist of:
```
import classes from 'foo.scss';
export const foo = () => <div className={classes.foo}>Hello <input className={classes.input} /></div>;
```

If adjustments are needed for the use of the `foo` component, ideally you will compose a new component. In order to be able to adjust the original component, amend the above to:
```
import defaultClasses from 'foo.scss';
export const foo = ({classes: propClasses}) => {
  const classes = { ...defaultClasses, ...propClasses };
  return <div className={classes.foo}>Hello <input className={classes.input} /></div>;
}
```

Then your composed component might look like
```
import cn from 'classnames';
import classes from 'bar.scss';

export const bar (active) => {
  const fooClasses = {
    foo: cn({
      [classes.foo]: true,
      [classes.fooActive]: active,
    }),
    input: classes.input
  };
  return <div><Foo classes={fooClasses}></div>;
};
```

Note that `bar.scss` would define a `.foo` and/or `.input` rule as appropriate (both do not have to be defined because of the `{ ...defaultClasses, ...propClasses }` line in foo). And you can see the additional style `.fooActive` which adds functionality to the original component.

## Endpoints

The RESTful API that the refresh-ui application consumes is the Sales API. See [SwaggerHub](URL HERE) for more detailed documentation.

## Getting Started

### Creating a component

When creating a new container or presentation component use `npm run generate` which will guide you through generating a new component from pre-defined templates. This tool allows us to consistently create new files with a level of conformity and enforce best practices across the codebase. These files are generated using [Plop](https://github.com/amwmedia/plop) and are intended to change overtime as the team identifies new best practices/patterns over time.

### Adding new sass variables

When adding new scss variables to all *Variables.scss files and adds a new variable name to each scss file with the following convention:
$variable1: 'fixme'; // FIX ME
Usage syntax:  use`npm run add:sassvariables variable1 variable2` to add multiple variables.

### Reference materials

WEB APP A

* Refer to the latest [UX prototype](URL HERE) for all things user experience (transitions, animations, page flow, alternate flows).
* Refer to the [style guide](URL HERE) for all things look/feel. The details in the style guide trumps the UX prototype.

WEB APP B

* Refer to the [Product requirements](URL HERE). The copy deck is embedded within this page.
* Refer to the [UX prototype](URL HERE) for all things user experience (transitions, animations, page flow, alternate flows).

### Tutorials & Resources

* [ES6 Katas - Learn ES6 by doing it. Fix failing tests. Keep all learnings.](http://es6katas.org/)
* [PluralSight - Building Applications with React and Redux in ES6](https://app.pluralsight.com/library/courses/react-redux-react-router-es6/table-of-contents)
* [When should I use Immutable JS vs. vanilla (mutable) JavaScript?](https://redux.js.org/recipes/using-immutable.js-with-redux#use-immutable.js-everywhere-except-your-dumb-components)

### Environments

* development - local development
* qa - deployed QA tier
* uat - deployed UAT tier
* production - deployed Production tier

## Common errors

### Failed to download Chromium… unable to get local issuer certificate

An SSL error like this may be caused by the corporate proxy. To resolve the issue, navigate to https://storage.googleapis.com/chromium-browser-snapshots/, accept the certificate, download it, and save it to your trusted certificates. You should now be able to run `npm install` without issue.

Another workaround is to set `NODE_TLS_REJECT_UNAUTHORIZED=0 npm install`.

### 'np' is not recognized as an internal or external command

Ensure that you are using the version of Node specified in .nvmrc and npm 5.6.0

`node -v && npm -v`

### Module build failed (from ./node_modules/sass-loader/lib/loader.js)

Rebuild the node-sass module

`npm rebuild node-sass`

### Unable to access BitBucket over SSH ("no host" error)

Connect to the VPN to access BitBucket. Another alternative may be to access BitBucket via https.

### npm install modifies package-lock.json updating package urls from https to http

Remove your node_modules, clean your npm cache, and reinstall

`rm -rf node_modules && npm cache clean --force && npm install`

### Storyshots

For each story defined in storybook we automatically create two forms of storyshots (see stories/storyshots.test.js) - regular storyshots and image storyshots.

[Regular storyshots](https://github.com/storybooks/storybook/tree/master/addons/storyshots/storyshots-core) are created with Jest snapshots - just like the ones you see used in unit tests throughout the rest of our app.

[Image storyshots](https://github.com/storybooks/storybook/tree/master/addons/storyshots/storyshots-puppeteer) are created with Jest image snapshots which generates and compares screenshots of each story.

## Recommended Chrome Extensions

* [Web Developer Form Filler](https://chrome.google.com/webstore/detail/web-developer-form-filler/gbagmkohmhcjgbepncmehejaljoclpil)
* [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [Immutable.js Object Formatter](https://chrome.google.com/webstore/detail/immutablejs-object-format/hgldghadipiblonfkkicmgcbbijnpeog)
