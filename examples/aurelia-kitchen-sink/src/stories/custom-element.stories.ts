import type { Meta, Story } from '@storybook/aurelia';
import { CoolButton } from '../cool-button/cool-button';

export default {
  title: 'Custom/Custom Elements',
  component: CoolButton,
} as Meta;

const Template: Story = (args) => ({
  props: args,
});

export const Primary = Template.bind({
  props: { text: 'asdfasdfasd' },
});

const Template2: Story = (args) => ({
  template: '<cool-button text.bind="text"></cool-button>',
  props: args,
});

export const Primary2 = Template2.bind({
  props: { text: 'asdfasdfasd' },
});
Primary2.args = {
  text: 'primary',
};
