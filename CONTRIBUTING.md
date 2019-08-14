# Contributing

This is a monorepo meant to host React Components their resources such that can be displayed in a grid-like view.

Create a subfolder in the repo with your feature name and all your react component resources.

For example, if your team is going to create a feature for displaying NPM Modules Downloaded then you should add a subfolder called something like: npm-modules-count and your directory structure should look like this

```text
|- public/
|- src/
|- npm-modules-count/
  |- ...
  |- src/
  |- package.json
  '- README.md
|- package.json
|- package-lock.json
'- README.md
```

This should allow for the main project to pull in all the React Components fairly easily.

If your component requires a separate backend to avoid CORS errors or other issues, just make sure to put instructions into the README.md and keep ALL your required code in your subfolder.
