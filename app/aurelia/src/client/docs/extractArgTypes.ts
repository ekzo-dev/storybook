import { ArgTypesExtractor } from '@storybook/docs-tools';
import { StrictArgTypes } from '@storybook/csf';
import { getComponentBindables, getComponentAstData, getPropertyType } from './metadata';

const isObject = (obj: any) => obj.toString() === '[object Object]';

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
      const propAstData = astData[bindable.property] || ({} as any);

      // determine data type
      const type = tsType;

      // get default value
      const { defaultValue } = propAstData;

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
        defaultValue,
        table: {
          type: type ? { summary: type } : undefined,
          defaultValue:
            defaultValue !== undefined
              ? {
                  summary: isObject(defaultValue) ? JSON.stringify(defaultValue) : defaultValue,
                }
              : undefined,
        },
        control,
        action,
      };

      return acc;
    }, {});
  }

  return null;
};
