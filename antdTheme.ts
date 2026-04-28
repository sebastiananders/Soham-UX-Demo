import type { ThemeConfig } from 'antd';

const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#030213',
    colorBgContainer: '#ffffff',
    colorBgLayout: '#ececf0',
    colorBorder: 'rgba(0, 0, 0, 0.1)',
    colorBorderSecondary: 'rgba(0, 0, 0, 0.06)',
    colorTextSecondary: '#717182',
    colorTextTertiary: '#a3a3a3',
    colorError: '#d4183d',
    borderRadius: 10,
    borderRadiusSM: 6,
    borderRadiusLG: 14,
    fontFamily: 'inherit',
    fontSize: 14,
    lineHeight: 1.5,
  },
  components: {
    Button: {
      colorPrimary: '#030213',
      colorPrimaryHover: '#1a1a2e',
      colorPrimaryActive: '#000000',
      primaryColor: '#ffffff',
      borderRadius: 20,
      borderRadiusSM: 16,
      controlHeight: 36,
      controlHeightSM: 28,
      fontWeight: 600,
    },
    Tag: {
      borderRadius: 20,
      fontSize: 11,
      fontSizeSM: 10,
    },
    Badge: {
      fontSize: 10,
    },
    Tabs: {
      inkBarColor: '#030213',
      itemActiveColor: '#030213',
      itemSelectedColor: '#030213',
      itemHoverColor: '#404040',
      titleFontSize: 12,
      titleFontSizeLG: 12,
      titleFontSizeSM: 12,
      horizontalMargin: '0',
      horizontalItemPadding: '14px 16px',
    },
    Table: {
      fontSize: 12,
      headerColor: '#a3a3a3',
      headerBg: 'transparent',
      headerBorderRadius: 0,
      headerSplitColor: 'transparent',
      borderColor: '#f5f5f5',
      rowHoverBg: '#fafafa',
      cellPaddingBlock: 12,
      cellPaddingInline: 20,
      cellPaddingBlockSM: 10,
      cellPaddingInlineSM: 16,
    },
    Avatar: {
      borderRadius: 50,
    },
  },
};

export default antdTheme;
