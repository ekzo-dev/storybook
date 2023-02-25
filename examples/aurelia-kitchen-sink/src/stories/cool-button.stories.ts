import type { Meta, Story, StoryFnAureliaReturnType } from '@storybook/aurelia';
import { CoolButton } from '../cool-button/cool-button';

export default {
  title: 'Element/Button',
  component: CoolButton,
} as Meta;

const Default: Story = (args) => ({
  props: args,
});

const CustomArgs: Story = (args): StoryFnAureliaReturnType => ({
  props: args,
});
CustomArgs.args = {
  variant: 'secondary',
};
CustomArgs.argTypes = {
  variant: {
    table: {
      disable: true,
    },
  },
};

export { Default, CustomArgs };
