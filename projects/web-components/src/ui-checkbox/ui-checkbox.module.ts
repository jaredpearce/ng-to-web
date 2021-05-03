import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { Checkbox, CheckboxComponent } from '@jp/ng-elements/checkbox';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    Checkbox
  ],
  entryComponents: [CheckboxComponent]
})
export class UiCheckbox {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    customElements.define(
      'ui-checkbox',
      createCustomElement(CheckboxComponent, {injector: this.injector})
    );
  }
}
