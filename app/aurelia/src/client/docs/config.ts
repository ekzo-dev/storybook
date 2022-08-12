import { extractComponentDescription, enhanceArgTypes } from '@storybook/docs-tools';

import { extractArgTypes } from './docs';

export const parameters = {
  docs: {
    inlineStories: false,
    extractArgTypes,
    extractComponentDescription,
  },
};

export const argTypesEnhancers = [enhanceArgTypes];
