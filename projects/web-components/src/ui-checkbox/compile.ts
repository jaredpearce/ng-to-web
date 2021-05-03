import {enableProdMode} from '@angular/core';
import {platformBrowser} from '@angular/platform-browser';

import {UiCheckbox} from './ui-checkbox.module';

enableProdMode();

platformBrowser()
    .bootstrapModule(UiCheckbox)
    .catch(err => console.error('checkbox', err));
