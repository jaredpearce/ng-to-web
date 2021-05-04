# "Reading" Angular Elements as Custom Web Elements in an Angular Application

At this point, several steps in the process should be complete:
1. [*ng-elements*](../projects/ng-elements/README.md): An Angular `projectType` of project must be configured for individual component export. Each component should be located in its own directory with it's corresponding support files (e.g. index.ts, public-api.ts, package.json (or ng-package.json), {module-name}.module.ts, {component-name}.component.ts, {service, factory, enums, interfaces}.ts). The components should then be compiled to the 'dist' directory.
2. [*web-components*](../projects/web-components/README.md): An Angular `projectType` of application with corresponding imports from the project mentioned in step one.

With these steps complete, we are ready to consume components developed in Angular and exported as Angular components or custom web elements.

## Updates to angular.json

We now return again to angular.json for the intent of dynamically importing our custom web elements within the [scripts configuration](https://angular.io/guide/workspace-config#styles-and-scripts-configuration).

The name of my Angular application is called `ng-to-web`. I locate this project in angular.json and find the corresponding `scripts` array. It is usually empty.

As noted in step two of the process mentioned above, the application project 'web-components' compiled upon production export several component files (e.g., ui-checkbox.js, ui-loader.js), which are identified in the scripts section. We can add these scripts here or in the main index.html file of this application.

```json
/* ng-to-web/angular.json */
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "ng-to-web": {
      "projectType": "application",
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "scripts": [
            "dist_wc/web-components/ui-checkbox.js",
            "dist_wc/web-components/ui-loader.js",
            "dist_wc/web-components/web-components.js"
          ]
        }
      }
    }
  }
}
```

## Update app.module.ts

With the angular.json file updated and saved, we turn our attention to the [app.module.ts](./app/app.module.ts) file in the *ng-to-web/src/app/* directory. We need to import a custom package to prevent Angular from giving us an error for running custom components.

```
Error: src/app/app.component.html:30:7 - error NG8001: 'ui-loader' is not a known element:
1. If 'ui-loader' is an Angular component, then verify that it is part of this module.
2. If 'ui-loader' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.
```

Import the `CUSTOM_ELEMENTS_SCHEMA` from @angular/core and apply it to the module:

```typescript
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// EXTERNAL components: created in projects/ng-elements
import { Checkbox } from '@jp/ng-elements/checkbox';
import { Loader } from '@jp/ng-elements/loader';
// END;

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Checkbox,
    Loader
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
```

With this update in place, we can now reference our custom web components within the [app.component.html](./app/app.component.html) file in the *ng-to-web/src/app/* directory.

```html
<main>
  <section>
    <header>
      <h2>{{ title }}</h2>
    </header>
    <div class="example">
      <p>Checkbox Component</p>
      <ng-checkbox cbLabel="{{ieCbLabel}}" (cbChange)="cbRegistered($event)"></ng-checkbox>
    </div>
    <div class="example">
      <p>Loader Component</p>
      <ng-loader
        loaderClass="{{ieLoaderClass}}"
        isActive="{{isLoadActive}}"
        loaderLabel="{{ieLoaderLabel}}"
        loaderDir="{{ieLoaderDirection}}">
      </ng-loader>
    </div>
  </section>
  <section>
    <header class="page-title">
      <h2>Web Components</h2>
    </header>
    <div class="example">
      <p>UI Checkbox Component</p>
      <ui-checkbox cb-label="Awesome Checkbox" cb-label-position="before"></ui-checkbox>
    </div>
    <div class="example">
      <p>UI Loader Component</p>
      <ui-loader
        loader-label="applying..."
        loader-class="ring"
        loader-dir="column">
      </ui-loader>
    </div>
  </section>
</main>
```

There are a few items to clarify:
- The [naming convention](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#high-level_view) for custom web elements **must** include a dash; i.e., 'ui-checkbox'.
- [Mapping](https://angular.io/guide/elements#mapping) custom properties referenced in Angular as camelCase **must** be referenced in kebab-case; i.e., Angular: `loaderLabel`, Web: `loader-label`.
- Any event emitters **must** be dispatched with custom events (see 'Mapping' link above).


## Updates to tsconfig.json

When generating a new project (application or library), Angular appends the paths to those projects in the root tsconfig.json file. I modified mine slightly to account for the restructuring of my project libraries (ng-elements, web-components). The difference here are the paths ending with `/*` (see [Angular Material](https://github.com/angular/components/blob/master/src/material/tsconfig.json#L8-L10) example):

```json
{
  "paths": {
    "@jp/ng-elements": [
      "dist/ng-elements/ng-elements",
      "dist/ng-elements"
    ],
    "@jp/ng-elements/*": [
      "dist/ng-elements/ng-elements/*",
      "dist/ng-elements/*"
    ],
    "@jp/web-components": [
      "dist_wc/web-components/web-components",
      "dist_wc/web-components"
    ],
    "@jp/web-components/*": [
      "dist_wc/web-components/web-components/*",
      "dist_wc/web-components/*"
    ]
  }
}
```

## Notes

A few additional quirks to note about this library:
- The libraries use NPM [scoped](https://docs.npmjs.com/cli/v7/using-npm/scope) packages.
- Scripts used to compile code can be found in the script section of the root [package.json](../package.json) file.
