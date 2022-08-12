import type { Meta, Story } from '@storybook/aurelia';
import { CoolButton } from '../cool-button/cool-button';

export default {
  title: 'Element/Button',
  component: CoolButton,
} as Meta;

export const Default: Story = (args) => ({
  props: args,
});
