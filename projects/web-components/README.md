# Converting Angular Created Components

There are several steps to follow to generate web components from Angular. The information compiled here is a composite of several articles with some trial and error.

## Project Structure

Here, I need to create an Angular **application** to export my Angular components as custom web elements. The name of my example Angular project is called `web-components`.

The structure of this project is as follows (corresponding updates to angular.json are identified further below):

```
.
+-- projects
|   +-- web-components
|   |   +-- src
|   |   |   +-- checkbox
|   |   |   +-- loader
|   |   +-- public-api.ts
|   |   +-- package.json
|   |   +-- tsconfig.app.json
|   |   +-- webpack.config.json
```

## Webpack and Plugins

A number[1] of articles[2] describe how to create custom web components from an Angular application with an underlying need to create a bash script, Gulp, Node or a custom NPM package. I wanted to leverage Angular's built in functionality to achieve the same concept by using a custom Webpack configuration. This gives me several advantages:
1. Using [Webpack's `entry`](https://v4.webpack.js.org/concepts/#entry) property, I can loop through a number of entries to create individually named JavaScript files. So, now my checkbox component can remain a standalone JS file along with all of my other components.
2. I can copy over static assets (i.e., package.json) to the final output directory.
3. I can concatenate the necessary files to make my components work without living in an Angular project (e.g., runtime.ts, main.ts, polyfills.ts);

To make all of this work, I need to install the following NPM packages `npm i -D`:
- webpack: Install version 4.46.0 because Angular 11 **does not** use Webpack 5[3]
- @angular-builders/custom-webpack
- copy-webpack-plugin: **must** be version 6.4.1 (or 6.x) because Angular 11 is *not* on Webpack > 5
- tapable
- html-webpack-plugin: **must** be version 4.5.2 because we're running Webpack 4.x
- safe-require

Update directory structure. As with the `ng-elements` project, I made a few structural changes to define exactly what I was compiling for export. In angular.json, make the following updates to the configuration:
```json
{
  "projects": {
    "web-components": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "customWebpackConfig": {
              "path": "projects/ui-components-web/webpack.config.js"
            },
            "outputPath": "dist/web-components",
            "index": "projects/ui-components-web/src/index.html",
            "main": "projects/ui-components-web/src/public_api.ts",
            "polyfills": "projects/ui-components-web/src/polyfills.ts",
            "tsConfig": "projects/ui-components-web/tsconfig.app.json"
          },
          "configuration": {
            "outputHashing": "none",   
            "namedChunks": true,
            "vendorChunk": true
          }
        }
      }
    }
  }
}
```

## Architecture of a Component

```
// component:       ui-checkbox
// file name:       ui-checkbox.module.ts
// file structure:  projects/web-components/src/ui-checkbox
// Description:     These two files combine together to create a custom web element.

+-- ui-checkbox
|   +-- compile.ts              // <--- Same as main.ts in a normal Angular application. This associates the structure necessary for standalone use.
|   +-- ui-checkbox.module.ts   // <--- Uses createCustomElement from @angular/elements
+-- [loader]
```

Note: The purpose behind `ngDoBootstrap`[4]:
- The application doesn't have a bootstrap component.
- The custom element needs to be registered with the browser.

## @angular/elements

For this project, we need to use Angular's Elements package. This should be directly added to the project exporting Angular components as web components. To do so run: `ng add @angular/elements --project=web-components`.
The following output

```
ℹ Using package manager: npm
✔ Found compatible package version: @angular/elements@11.2.12.
✔ Package information loaded.
✔ Package successfully installed.
    Added "document-register-element" as a dependency.
    Added "document-register-element" to polyfills.
UPDATE package.json (1413 bytes)
UPDATE projects/web-components/src/polyfills.ts (2866 bytes)
✔ Packages installed successfully.
```

Note: Only Angular `projectType: 'application'` can export Angular Elements. Perhaps there is a remedy in the future to account for Angular libraries.

## Typescript Typings

I've included in this project a file called [web-components.d.ts](./src/web-components.d.ts) to enable consuming libraries a clearer picture about this library (see [Angular Typescript typings](https://angular.io/guide/typescript-configuration#typescript-typings) for more information);

## Sources

1. [Angular Elements: Create a Component Library for Angular and the Web](https://medium.com/swlh/angular-elements-create-a-component-library-for-angular-and-the-web-8f7986a82999)
2. [Getting Started with Angular Elements](https://www.telerik.com/blogs/getting-started-with-angular-elements)
3. Getting TypeError: Cannot read property 'add' of undefined (issues: [19851](https://github.com/angular/angular-cli/issues/19851#issuecomment-767543092), [20478](https://github.com/angular/angular-cli/pull/20478/files))
4. [Your Options for Building Angular Elements](https://www.angulararchitects.io/aktuelles/your-options-for-building-angular-elements/)
