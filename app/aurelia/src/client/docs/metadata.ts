import type { SBType } from '@storybook/csf';
import type { Component } from '@storybook/docs-tools';
import * as recast from 'recast';
import {
  AssignmentExpression,
  MemberExpression,
  Literal,
  ObjectExpression,
  Identifier,
  Comment,
} from 'estree';
import { CustomElement } from 'aurelia';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Reflect {
  function getMetadata(metadataKey: any, target: any, propertyKey?: string | symbol): any;
}

export type ComponentAstData = Record<string, { default: any; comment?: string }>;

export const getComponentBindables = (component: Component) => {
  const def = CustomElement.getDefinition(component);

  return Object.values(def.bindables);
};

export const getComponentAstData = (
  component: Component,
  properties: string[]
): ComponentAstData => {
  const source = component.prototype.constructor.toString();
  const result: ComponentAstData = {};
  let lastProperty: string;
  console.log('bindable in ast', properties);
  recast.visit(recast.parse(source), {
    visitAssignmentExpression: ({ value }: { value: AssignmentExpression }) => {
      const { left, right } = value;

      if (
        left.type === 'MemberExpression' &&
        left.object.type === 'ThisExpression' &&
        ['Literal', 'ObjectExpression'].includes(right.type)
      ) {
        console.log('found ast prop', value);
        const { name } = (left as MemberExpression).property as Identifier;
        if (properties.includes(name)) {
          const def =
            right.type === 'ObjectExpression' ? recast.print(right) : (right as Literal).value;

          result[name] = {
            default: def,
          };
          lastProperty = name;
        }
      }

      // return false to stop at this depth
      return false;
    },
    visitComment: ({ value }: { value: Comment }) => {
      console.log(value);
      if (lastProperty) {
        result[lastProperty].comment = value.value;
      }

      // return false to stop at this depth
      return false;
    },
  });
  console.log('ast metadata', result);
  return result;
};

export const getPropertyType = (
  component: Component,
  property: string
): SBType['name'] | undefined => {
  const metadata = Reflect.getMetadata('design:type', component.prototype, property);

  let type: SBType['name'];
  switch (metadata) {
    case String:
    case Boolean:
    case Number:
    case Object:
    case Function:
      type = metadata.name.toLowerCase();
      break;
    default:
  }

  return type;
};
