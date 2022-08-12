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
  dataCount = 0;

  @bindable()
  params: IParameters = {};

  @bindable()
  onClick: () => void;

  handleClick() {
    if (this.onClick) {
      this.onClick();
    }
  }
}
