# NgToWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.10.

## Run Locally

As with most Angular projects, the application can run locally. This is achieved by reviewing the available scripts in the package.json file. Before running `npm start` to launch the primary application locally, we need to compile the project code.

## Compiling Project Code

The application code relies on two projects: *ng-elements*, *web-components*.

Note: It is recommended to run *ng-elements* in watch mode while running `npm start` to view component modification. There currently isn't a 'watch' mode for *web-components*.

### Compile ng-elements

To compile *ng-elements*:
- one time, run `npm run build:lib`
- in watch mode, run `npm run build:lib_dev`

### Compile web-components

To compile *web-components*:
- one time, run `npm run build:wc`

This script has two parts:
1. `ng build --prod web-components`
2. `npm run cleanup:vendor`

Step one creates the desired compiled output by running the custom Webpack configuration and copying non-compiled (e.g., package.json, web-components.d.ts) files to the *dist_wc* directory. Part two removes *runtime.js*, *main.js* and *polyfills.js* from the *dist_wc* directory because those files were previously concatenated into a single file: *web-components.js*.
