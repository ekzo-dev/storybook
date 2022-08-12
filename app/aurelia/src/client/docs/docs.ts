import { ArgTypesExtractor } from '@storybook/docs-tools';
import { StrictArgTypes } from '@storybook/csf';
import { getComponentBindables, getComponentAstData, getPropertyType } from './metadata';

export const extractArgTypes: ArgTypesExtractor = (component) => {
  if (component) {
    const bindables = getComponentBindables(component);
    const astData = getComponentAstData(
      component,
      bindables.map((bindable) => bindable.property)
    );

    return bindables.reduce((acc: StrictArgTypes, bindable) => {
      // get all available metadata
      const tsType = getPropertyType(component, bindable.property);
      const propAstData = astData[bindable.property];

      // determine data type
      const type = tsType;

      // get default value
      const def = propAstData?.default;

      // determine appropriate control or action
      const control =
        type && type !== 'function'
          ? {
              type: type === 'string' ? 'text' : type,
            }
          : undefined;
      const action = type === 'function' ? bindable.property : undefined;

      acc[bindable.attribute] = {
        name: bindable.attribute,
        defaultValue: def,
        table: {
          type: type ? { summary: type } : undefined,
          defaultValue: def ? { summary: def } : undefined,
        },
        control,
        action,
      };

      return acc;
    }, {});
  }

  return null;
};
