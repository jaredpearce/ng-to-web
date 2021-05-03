import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ng-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() loaderClass: string = 'ring';
  @Input() loaderLabel: string = '';
  @Input() loaderDir: string = '';

  constructor() { }

  ngOnInit(): void {
  }
}
