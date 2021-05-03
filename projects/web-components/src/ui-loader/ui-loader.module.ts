import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { Loader, LoaderComponent } from '@jp/ng-elements/loader';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    Loader
  ],
  entryComponents: [LoaderComponent]
})
export class UiLoader {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    customElements.define(
      'ui-loader',
      createCustomElement(LoaderComponent, {injector: this.injector})
    );
  }
}
