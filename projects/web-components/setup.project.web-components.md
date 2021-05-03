# Converting Angular Created Components

Update directory structure. As with the `ng-elements` project, I made a few structural changes to define exactly what I was compiling for export. In angular.json, make the following updates to the configuration ():
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

We

There are several steps to follow to generate web components from Angular. The information compiled here is a composite of several articles with some trial and error.

Install the following NPM packages `npm i -D`:
- @angular-builders/custom-webpack
- copy-webpack-plugin: *must* be version 6.4.1 (or 6.x) because Angular 11 is *not* on Webpack > 5
- tapable
- html-webpack-plugin: *must* be version 4.5.2 because we're running Webpack 4.x
- safe-require


## @angular-builders/custom-webpack

We need to have the ability to partially override the default build behavior of Angular. We can do so through the use of the installed package: @angular-builders/custom-webpack.



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
