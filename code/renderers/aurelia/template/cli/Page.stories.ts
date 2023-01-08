import { within, userEvent } from '@storybook/testing-library';
import type { Meta, StoryObj } from '../../src';

// import Button from './button';
// import Header from './header';
import Page from './page';

const meta: Meta<Page> = {
  title: 'Example/Page',
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/angular/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<Page>;

export const LoggedOut: Story = {
  render: (args: Page) => ({
    props: args,
  }),
};

// More on interaction testing: https://storybook.js.org/docs/7.0/angular/writing-tests/interaction-testing
export const LoggedIn: Story = {
  render: (args: Page) => ({
    props: args,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = await canvas.getByRole('button', {
      name: /Log in/i,
    });
    await userEvent.click(loginButton);
  },
};
