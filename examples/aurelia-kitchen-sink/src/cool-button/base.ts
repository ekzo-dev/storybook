import { bindable } from 'aurelia';

export class BaseButton {
  @bindable()
  someProp?: string = 'default';
}
