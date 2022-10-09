import { addons, useEffect } from '@storybook/addons';
import { SourceType, SNIPPET_RENDERED } from '@storybook/docs-tools';
import { StoryContext } from '..';
import { createComponentTemplate } from '../preview/aurelia';

/**
 * Check if the sourcecode should be generated.
 *
 * @param context StoryContext
 */
const skipSourceRender = (context: StoryContext) => {
  const sourceParams = context?.parameters.docs?.source;
  const isArgsStory = context?.parameters.__isArgsStory;

  // always render if the user forces it
  if (sourceParams?.type === SourceType.DYNAMIC) {
    return false;
  }

  // never render if the user is forcing the block to render code, or
  // if the user provides code, or if it's not an args story.
  return !isArgsStory || sourceParams?.code || sourceParams?.type === SourceType.CODE;
};

/**
 * Svelte source decorator.
 * @param storyFn Fn
 * @param context StoryContext
 */
export const sourceDecorator = (storyFn: any, context: StoryContext) => {
  const channel = addons.getChannel();
  const skip = skipSourceRender(context);
  const story = storyFn();

  let source: string;
  useEffect(() => {
    if (!skip && source) {
      channel.emit(SNIPPET_RENDERED, (context || {}).id, source);
    }
  });

  if (skip) {
    return story;
  }

  const { component } = context || {};
  if (component) {
    source = createComponentTemplate(component, story.innerHtml);
  }

  return story;
};
