# Contributing

This amazing repo has be designed with a beatiful plugin architecture. If you find yourself singing in the rain don't call your mom panicing, it's expected behavior.

The plugin architecture is meant to allow for any widget to be implemented such that can be displayed in a grid-like view. The repo assumes you'll be using React. Redux is an optional addon, you can refer to the two example components to see how one uses the [Redux Starter Kit](https://redux-starter-kit.js.org/) and the other is just a pure functional component.

## Getting Starting

Create a subfolder in the repo with your component name and include an `index.js` that is expected to be a self-contained component to render in a square.

```text
|- src/
| |- npm-modules-count/
| | |- index.js
| | |- npm-metrics.scss
| | '- NpmMetrics.js
| '- other-squares/
|
|- package.json
'- README.md
```

This should allow for the main project to pull in all the React Components fairly easily.

If your component requires a separate backend then you'll need to create another repo for it. Just ensure that the REPO explains any setup required to build and run locally. Yes, LOCALLY. Assume that this React App and ALL backend services will just run from source, together, locally.

UNLESS! you chose to deploy your service remotely. In which case, just make sure to handle CORS and all that jazz 🎷.
