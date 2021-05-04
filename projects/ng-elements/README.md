# Angular Components: Standalone

I created an example project to illustrate the process of converting an Angular library (`projectType: 'library'`) with individual standalone components into [custom web elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

## Project Structure

The name of my example Angular project is called `ng-elements`.
To create a project: `ng g library [your library name]`

While the angular-cli produced the following structure, standalone angular components **must** have their own entry point[1] (considered [secondary entry point](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) in this context) AND live at the root of the main project directory. Secondary entry points are dynamically discovered by ng-packagr:

```
.
+-- projects
|   +-- ng-elements
|   |   +-- lib
|   |   |   +-- src
|   |   |   |   +-- checkbox
|   |   |   |   +-- loader
|   |   |   +-- public-api.ts
|   |   +-- ng-package.json
|   |   +-- package.json
|   |   +-- tsconfig.lib.json
```

The needed and desired structure:
```
.
+-- projects
|   +-- ng-elements
|   |   +-- checkbox
|   |   +-- loader
|   |   +-- public-api.ts
|   |   +-- ng-package.json
|   |   +-- package.json
|   |   +-- tsconfig.lib.json
```

## Updates to ng-package.json

Review ng-package.json to verify the path structure for the main entry file by removing `src` from the `entryFile` value in `projects/ng-elements/ng-package.json`. The final string should be `"entryFile": "public-api.ts"`.

Angular 11 allows [assets configuration](https://angular.io/guide/workspace-config#assets-configuration), providing an opportunity to move static files to the final output directory. For my components, I would like the README.md file to to be present for the final library build.  

## Updates to angular.json

These are the adjustments you should make to the root angular.json project:
- Remove `/src` from the `sourceRoot`.
- Update `prefix` to reflect your project naming convention.

File: ng-to-web/angular.json

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "ng-to-web": {
      "projectType": "application",
    },
    "ng-elements": {
      "projectType": "library",
      "root": "projects/ng-elements",
      "sourceRoot": "projects/ng-elements",
      "prefix": "ng",
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
  }
}
```

## Architecture of a Component

As you create new components in your library, you'll need to make sure you export them to sit at your root project directory.
For example, the Angular-cli will generate a new component (`ng g c --skip-tests --project=ng-elements checkbox`) to sit in your `projects/ng-elements/lib/src` directory. For the purpose of generating standalone components, it's necessary to to remove the extra directories. The final directory should be `projects/ng-elements/checkbox` (or the name of your new component). Whenever you create a component, you'll need to add some additional files (i.e. barrel file[2], public-api.ts):

```
// component:       checkbox
// file name:       checkbox.component.ts
// file structure:  projects/ng-elements/checkbox
// Description:     Each of these files has the underlying 'imports' and code to create a standalone
//                  component for import.
// Note:            asterisk (*) is a substitute for your component name.
+-- checkbox
|   +-- package.json     // <--- Identifies the primary entryPoint for the compiler. It can reference: index.ts OR public-api.ts
|   +-- index.ts         // <--- Known as a 'barrel' file, exports all files by referring to it this way: ng-elements/checkbox
|   +-- public-api.ts    // <--- The main entryPoint for this component
|   +-- checkbox.component.scss
|   +-- README.md
|   +-- checkbox.component.ts
|   +-- checkbox.module.ts
|   +-- *.html
|   +-- some-factory
|   |   +-- some-factory.ts
|   +-- some-service
|   |   +-- some-service.ts
+-- [loader]
```

## Sources:

1. [Creating Secondary Entry Points for your Angular Library](https://medium.com/tunaiku-tech/creating-secondary-entry-points-for-your-angular-library-1d5c0e95600a)
  - Each library component MUST sit at root of the library: project/my-lib/my-component
  - Each Secondary Entry Point MUST have a root package.json file: project/my-lib/my-component/package.json
  - To eliminate bulky peer dependencies, each library component MUST specify component dependencies within the root package.json  
  - Root library MUST only export core components required as the library base as defined in the root public_api.ts file (public_api.ts or public-api.ts - doesn't matter).
2. [Barrel Files: to use or not to use](https://adrianfaciu.dev/posts/barrel-files/)
