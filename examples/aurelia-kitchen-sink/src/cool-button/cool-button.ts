import { bindable } from 'aurelia';

interface IParameters {
  size?: string;
}

type Variant = 'primary' | 'secondary';

export class CoolButton {
  @bindable()
  text = 'Click me';

  @bindable()
  variant: Variant = 'primary';

  @bindable()
  disabled = false;

  @bindable()
  dataCount: number;

  @bindable()
  params: IParameters = {};

  @bindable()
  myClasses: string[] = [];

  @bindable()
  onClick: () => void;

  handleClick() {
    if (this.onClick) {
      this.onClick();
    }
  }
}
