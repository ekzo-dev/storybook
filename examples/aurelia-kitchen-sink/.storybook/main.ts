import type { StorybookConfig } from '@storybook/core-common';

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.stories.@(ts|mdx)'],
  logLevel: 'debug',
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
    '@storybook/addon-interactions',
    '@storybook/addon-jest',
    '@storybook/addon-toolbars',
  ],
  core: {
    builder: 'webpack5',
  },
};

module.exports = config;
