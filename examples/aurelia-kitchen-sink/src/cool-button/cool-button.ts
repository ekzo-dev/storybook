/* eslint-disable @typescript-eslint/no-inferrable-types */
import { bindable } from 'aurelia';
import { BaseButton } from './base';

interface IParameters {
  size?: string;
}

type Variant = 'primary' | 'secondary';

export class CoolButton {
  @bindable()
  text: string = 'Click me';

  @bindable()
  variant: Variant = 'primary';

  @bindable()
  disabled: boolean = false;

  @bindable()
  dataCount: number;

  @bindable()
  params: IParameters = {};

  @bindable()
  myClasses: string[] = [];

  @bindable()
  onClick: () => void;

  @bindable()
  nullable: string | null = null;

  handleClick() {
    if (this.onClick) {
      this.onClick();
    }
  }
}
