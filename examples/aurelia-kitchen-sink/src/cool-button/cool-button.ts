import { bindable } from 'aurelia';

interface ISome {
  gg: string;
}

enum Aa {
  a = 'fdfd',
  b = 'fdfd',
}

export class CoolButton {
  @bindable()
  text: Aa;

  @bindable()
  buttonType = 'primary';

  @bindable()
  booleanProp: boolean;

  @bindable()
  numberProp: number;

  @bindable()
  lambdaProp: () => void;

  @bindable()
  functionProp: Function;

  handleClick() {
    console.log('handleClick');
    if (this.lambdaProp) {
      console.log('hasLambdaProp');
      this.lambdaProp();
    }
  }
}
