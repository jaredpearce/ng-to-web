# Creating Single Exportable Components

There are several modifications to be aware of when generating an Angular library. If you're using the Angular-cli, the project structure is dynamically created for you.

This example Angular project is called `ng-elements`.
To create a project: `ng g library [your library name]`
The structure produced:
```javascript
// projects
//   |_ your-library-name
//     |_ lib
//     | |_ src
//     | | |_ component 1
//     | | |_ component 2
//     | | |_ component 3
//     | |_ public-api.ts
//     |_ package.json
```

The needed and desired structure:
```javascript
// projects
//   |_ your-library-name
//   | |_ component 1
//   | |_ component 2
//   | |_ component 3
//   |_ public-api.ts
//   |_ package.json
// src
```
These are the adjustments you should make to the root angular.json project:
- Remove `/src` from the `sourceRoot`
- Update `prefix` to reflect your project naming convention
- Remove `src` from the `entryFile` value in `projects/ng-elements/ng-package.json`. The final string should be `public-api.ts`.

```javascript
// ng-to-web/angular.json
"$schema": "./node_modules/@angular/cli/lib/config/schema.json",
"version": 1,
"newProjectRoot": "projects",
"projects": {
  "ng-to-web": {
    "projectType": "application",
    //...
  },
  "ng-elements": {
    "projectType": "library",
    "root": "projects/ng-elements",
    "sourceRoot": "projects/ng-elements",   // <--- remove /src directory
    "prefix": "ng",                         // <--- change the prefix to your desired prefix
    "architect": {
      "build": {
        "builder": "@angular-devkit/build-angular:ng-packagr",
        "options": {
          "tsConfig": "projects/ng-elements/tsconfig.lib.json",
          "project": "projects/ng-elements/ng-package.json"
        },
        "configurations": {
          "production": {
            "tsConfig": "projects/ng-elements/tsconfig.lib.prod.json"
          }
        }
      }
    }
  }
```

As you create new components in your library, you'll need to make sure you export them to sit at your root project directory.
For example, the Angular-cli will generate a new component (`ng g c --skip-tests --project=ng-elements checkbox`) to sit in your `projects/ng-elements/lib/src` directory. For the purpose of generating standalone components, it's necessary to to remove the extra directories. The final directory should be `projects/ng-elements/checkbox` (or the name of your new component). Whenever you create a component, you'll need to add some additional files:
```javascript
// component:       checkbox
// file name:       checkbox.component.ts
// file structure:  projects/ng-elements/checkbox
// Description:     Each of these files has the underlying 'imports' and code to create a standalone
//                  component for import.
// Note:            asterisk (*) is a subtitute for your component name.
checkbox
  |_ package.json     // <--- Creates the primary entryPoint for the compiler. It can reference: index.ts OR public-api.ts
  |_ index.ts         // <--- Known as a 'barrel' file, exports all files by referring to it this way: ng-elements/checkbox
  |_ public-api.ts    // <--- Consolidates all publicly exported files for consumption
  |_ *.scss
  |_ *.md
  // These .ts files serve this purpose
  |_ {module, component, service}.ts
  |_ *.html
  //
```
