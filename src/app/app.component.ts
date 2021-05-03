import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Angular Components';

  // checkbox
  ieCbLabel: string = 'Checkbox Label';

  // loader
  isLoadActive: boolean = true;
  ieLoaderLabel: string = 'loading...';
  ieLoaderClass: string = 'ellipsis'; // ring
  ieLoaderDirection: string = 'row'; // column

  cbRegistered(evt: boolean) {
    console.log('Value received', evt);
  }
}
