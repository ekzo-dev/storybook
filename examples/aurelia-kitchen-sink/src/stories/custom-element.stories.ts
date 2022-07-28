import { StoryFn } from '@storybook/addons';
import { withActions, action } from '@storybook/addon-actions';

import { StoryFnAureliaReturnType, addComponents, Meta, Story } from '@storybook/aurelia';
import { CoolButton } from '../cool-button/cool-button';

export default {
  title: 'Custom/Custom Elements',
  decorators: [withActions, addComponents(CoolButton)],
  component: CoolButton,
} as Meta;

const Template: Story = (args) => ({
  props: args,
});

export const Primary = Template.bind({
  props: { text: 'asdfasdfasd' },
});
Primary.args = {
  text: 'primary',
  date: new Date(),
};

const Template2: Story = (args) => ({
  template: 'asdfasdf<cool-button text.bind="text"></cool-button>',
  props: args,
});

export const Primary2 = Template2.bind({
  props: { text: 'asdfasdfasd' },
});
Primary2.args = {
  text: 'primary',
};
