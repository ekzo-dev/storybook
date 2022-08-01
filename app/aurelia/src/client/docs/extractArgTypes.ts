import type { StrictArgTypes } from '@storybook/csf';
import type { ArgTypesExtractor } from '@storybook/docs-tools';
import { CustomElement } from 'aurelia';

// declare namespace Reflect {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   function getMetadata(metadataKey: any, target: any, propertyKey?: string | symbol): any;
// }
// const metadata = Reflect.getMetadata('design:type', ButtonCustomElement, bindable.property);
// console.log(metadata);

export const extractArgTypes: ArgTypesExtractor = (component) => {
  if (component) {
    const def = CustomElement.getDefinition(component);
    return Object.values(def.bindables).reduce((acc: StrictArgTypes, bindable) => {
      acc[bindable.attribute] = {
        name: bindable.attribute,
        description: bindable.property,
        // control: {
        //   type: 'text',
        // },
      };

      return acc;
    }, {});
  }

  return null;
};
