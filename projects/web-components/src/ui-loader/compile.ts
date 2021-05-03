import {enableProdMode} from '@angular/core';
import {platformBrowser} from '@angular/platform-browser';

import {UiLoader} from './ui-loader.module';

enableProdMode();

platformBrowser()
    .bootstrapModule(UiLoader)
    .catch(err => console.error('checkbox', err));
