import React from 'react';
import { ConfigProvider } from 'antd';
import '../styles/index.css';
import antdTheme from '../antdTheme';
import type { Preview } from '@storybook/react';

const preview: Preview = {
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
  },
};

export default preview;
