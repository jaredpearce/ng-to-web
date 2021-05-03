import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ng-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  ngCb = new FormControl(false);
  @Input() cbLabel: string = '';
  // Copied over:
  @Input() cbChecked?: boolean;
  @Input() cbInvertColor?: boolean;
  @Input() cbIndeterminate?: boolean;
  @Input() cbRequired?: any;
  @Input() cbLabelPosition?: string = 'after';
  @Input() cbDisabled?: boolean;

  @Output() cbChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  sendNotice(): void {
    this.cbChange.emit(this.ngCb.value);
  }
}
