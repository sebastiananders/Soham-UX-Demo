import React from 'react';
import { ConfigProvider } from 'antd';
import '../styles/index.css';
import antdTheme from '../antdTheme';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ConfigProvider theme={antdTheme}>
        <Story />
      </ConfigProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    layout: 'fullscreen',
    docs: {
      canvas: { sourceState: 'shown' },
    },
    options: {
      storySort: {
        order: ['Introduction', 'Demo', 'Components', 'Atoms'],
      },
    },
  },
};

export default preview;
