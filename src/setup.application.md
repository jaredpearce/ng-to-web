# "Reading" Angular Elements as Web Components in an Angular Application

At this point, several steps in the process should be complete:
1. An Angular `projectType` of project must be configured for individual component export. Each component should be located in its own directory with it's corresponding support files: index.ts, public-api.ts, package.json (or ng-package.json), {module-name}.module.ts, {component-name}.component.ts, {service, factory, enums, interfaces}.ts
2. An Angular `projectType` of application with corresponding imports from the project mentioned in step one.

With these steps complete, we are ready to consume components developed in Angular and exported as Angular components or custom web components.

To consume custom web components, update the angular.json file to include the required scripts:
- [your-component-name].js
- [compiled-{runtime,polyfills,main}].js
- vendor.js



Update tsconfig.json with the paths to web-components.
