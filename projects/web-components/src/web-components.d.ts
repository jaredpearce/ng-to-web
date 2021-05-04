import { NgElement, WithProperties } from '@angular/elements';

declare global {
  interface HTMLElementTagNameMap {
    'ui-checkbox': NgElement & WithProperties<{
      cbLabel: string;
      cbChecked?: boolean;
      cbInvertColor?: boolean;
      cbIndeterminate?: boolean;
      cbRequired?: any;
      cbLabelPosition?: string;
      cbDisabled?: boolean;
    }>,
    'ui-loader': NgElement & WithProperties<{
      loaderClass: string;
      loaderLabel: string;
      loaderDir: string;
    }>
  }
}
