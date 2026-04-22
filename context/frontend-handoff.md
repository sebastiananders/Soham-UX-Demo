# Frontend Handoff — Soham Home Page

## Overview

Build the home page (proto #1) using **Ant Design v5** as the component system. The design tokens are fully defined in `tokens.json` at the project root (W3C DTCG format). Use that as the source of truth — do not hardcode values that exist there.

The illustration background is **hidden** in this build. Do not implement it.

---

## Ant Design Setup

Wrap the app in `ConfigProvider` with this theme. All values come directly from `tokens.json`.

```tsx
import { ConfigProvider } from 'antd';

const theme = {
  token: {
    // Colors
    colorPrimary: '#030213',           // tokens: color.semantic.primary
    colorBgContainer: '#ffffff',       // tokens: color.semantic.background
    colorBorder: 'rgba(0,0,0,0.1)',    // tokens: color.semantic.border
    colorBorderSecondary: '#f5f5f5',   // tokens: color.semantic.border-subtle
    colorText: '#171717',              // tokens: color.primitive.neutral.900
    colorTextSecondary: '#737373',     // tokens: color.primitive.neutral.500
    colorTextTertiary: '#a3a3a3',      // tokens: color.primitive.neutral.400
    colorFill: '#fafafa',              // tokens: color.primitive.neutral.50
    colorFillSecondary: '#f5f5f5',     // tokens: color.primitive.neutral.100

    // Border radius
    borderRadius: 10,                  // tokens: borderRadius.lg (--radius)
    borderRadiusLG: 14,                // tokens: borderRadius.xl (cards, panels)
    borderRadiusSM: 6,                 // tokens: borderRadius.sm (nav items)

    // Typography
    fontSize: 14,                      // tokens: typography.fontSize.sm
    fontSizeLG: 16,                    // tokens: typography.fontSize.base
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',

    // Shadow
    boxShadow: '0 1px 9px 0 rgba(0,0,0,0.05)',   // tokens: shadow.card

    // Motion
    motionDurationMid: '200ms',        // tokens: transition.duration.base
    motionDurationSlow: '350ms',       // tokens: transition.duration.slow
  },
  components: {
    Input: {
      borderRadius: 9999,              // pill shape
      paddingInline: 16,
    },
    Button: {
      borderRadius: 9999,              // pill shape for all action buttons
      primaryColor: '#171717',
    },
    Layout: {
      siderBg: '#ffffff',
    },
    Menu: {
      itemBorderRadius: 6,
      itemPaddingInline: 12,
      itemHeight: 44,
      itemSelectedBg: '#fafafa',
      itemSelectedColor: '#171717',
      itemHoverBg: '#fafafa',
      itemColor: '#404040',
      iconSize: 16,
      collapsedWidth: 64,
    },
    Card: {
      borderRadiusLG: 14,
      boxShadow: '0 1.136px 9.085px 0 rgba(0,0,0,0.05)',
      paddingLG: 24,
    },
  },
};

<ConfigProvider theme={theme}>
  <App />
</ConfigProvider>
```

> **Note on brand yellow (#FFF000):** Do NOT set this as `colorPrimary`. Ant Design generates a full 10-shade interactive palette from `colorPrimary` — yellow produces unusable hover/disabled states. Use `#FFF000` only as an explicit `style` prop on the two elements that require it: the submit button and the "Pending approval" badge.

---

## Home Page Structure

```
<Layout>
  <Layout.Sider>      ← collapsible sidebar
  <Layout.Content>    ← hero + input + cards
```

### Layout dimensions (from `tokens.json → spacing.component`)

| Token | Value | Used for |
|-------|-------|----------|
| `sidebar-width-collapsed` | 64px | Sider collapsed width |
| `sidebar-width-expanded` | 200px | Sider expanded width |
| `content-max-width` | 820px | Hero and cards container max-width |
| `hero-padding-top` | 200px | Top padding of hero section |
| `card-width` | 254px | Each agent card fixed width |
| `cards-top-margin` | 120px | Margin above cards row |

---

## Component Mapping

### Sidebar

```tsx
<Layout.Sider
  collapsible
  collapsed={collapsed}
  collapsedWidth={64}
  width={200}
  trigger={null}           // custom hover expand, no button trigger
  onMouseEnter={() => setCollapsed(false)}
  onMouseLeave={() => setCollapsed(true)}
>
  {/* Logo */}
  {/* Menu */}
  <Menu mode="inline" inlineCollapsed={collapsed} items={[...]} />
  {/* Recent chats section */}
  {/* Profile avatar at bottom */}
</Layout.Sider>
```

Menu items use Lucide icons as `icon` prop. Sidebar expands on hover, collapses on mouse leave — no toggle button.

---

### Notification header

```tsx
<Badge count={8} color="#2563eb">   {/* tokens: color.component.notification.badge-foreground */}
  <BellOutlined style={{ fontSize: 20 }} />
</Badge>
<Typography.Text>New notifications</Typography.Text>
```

---

### Hero heading + status row

```tsx
<Typography.Title level={1} style={{ fontFamily: 'Georgia, serif', fontSize: 33, fontWeight: 400 }}>
  Aloha, Jen
</Typography.Title>

<Space size={12}>
  <Space size={6}>
    <RiseOutlined style={{ color: '#10b981' }} />
    <Typography.Text>Registration is at 61% of target</Typography.Text>
  </Space>
  <Divider type="vertical" />
  <Space size={6}>
    <ExclamationCircleOutlined style={{ color: '#ef4444' }} />
    <Typography.Text>The early-bird deadline is in 3 days</Typography.Text>
  </Space>
</Space>
```

---

### Chat input bar

Use Ant Design `Input` with `prefix` and `suffix`. No custom wrapper div.

```tsx
<Space align="center" size={12}>
  <Input
    ref={inputRef}
    size="large"
    value={inputValue}
    onChange={e => setInputValue(e.target.value)}
    onFocus={() => setInputFocused(true)}
    onBlur={() => setInputFocused(false)}
    placeholder="Generate a schedule analysis for Tech Summit Europe 2026"
    style={{ width: 600 }}
    prefix={
      <Button type="text" shape="circle" size="small" icon={<PlusOutlined />} />
    }
    suffix={
      <Space size={8}>
        {inputValue && (
          <Button
            type="text" size="small" icon={<CloseOutlined />}
            onClick={() => { setInputValue(''); inputRef.current?.focus(); }}
          />
        )}
        <AudioOutlined style={{ color: '#a3a3a3', cursor: 'pointer' }} />
        <PaperClipOutlined style={{ color: '#a3a3a3', cursor: 'pointer' }} />
      </Space>
    }
  />

  {/* Submit button — yellow, animates in when input has text */}
  <Button
    type="primary"
    shape="circle"
    size="large"
    icon={<ArrowUpOutlined />}
    style={{
      backgroundColor: '#FFF000',   // tokens: color.component.submit-button.background
      borderColor: '#FFF000',
      color: '#171717',              // tokens: color.component.submit-button.foreground
      opacity: inputValue ? 1 : 0,
      transform: inputValue ? 'scale(1)' : 'scale(0.7)',
      pointerEvents: inputValue ? 'auto' : 'none',
      transition: 'opacity 0.2s ease, transform 0.2s ease',
    }}
  />
</Space>
```

---

### Prompt suggestion pills

```tsx
{pills.map((text, i) => (
  <Button
    key={i}
    shape="round"
    onClick={() => handlePillClick(text, i)}
    style={{
      // Collapse animation when dismissed
      maxWidth: hidden.has(i) ? 0 : 320,
      opacity: hidden.has(i) ? 0 : 1,
      overflow: 'hidden',
      transition: 'max-width 0.35s ease, opacity 0.2s ease, padding 0.35s ease',
      // Token values
      backgroundColor: '#fafafa',   // tokens: color.component.suggestion-pill.background
      color: '#404040',             // tokens: color.component.suggestion-pill.foreground
      border: 'none',
    }}
  >
    {text}
  </Button>
))}
```

---

### Agent cards

```tsx
<Card
  hoverable
  style={{ width: 254 }}   // tokens: spacing.component.card-width
  styles={{
    body: { padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }
  }}
>
  {/* Header row: icon + title */}
  <Space>
    <img src={agentIcon} style={{ width: 25, height: 25 }} />
    <Typography.Text strong style={{ fontSize: 15 }}>{title}</Typography.Text>
  </Space>

  {/* Body text */}
  <Typography.Text type="secondary" style={{ fontSize: 12, lineHeight: 1.6, flex: 1 }}>
    {description}
  </Typography.Text>

  {/* Footer: agent type tag */}
  <Divider style={{ margin: '4px 0' }} />
  <Space size={6}>
    <AgentIcon style={{ color: '#a3a3a3', fontSize: 14 }} />
    <Typography.Text type="secondary" style={{ fontSize: 11 }}>{agentLabel}</Typography.Text>
  </Space>
</Card>
```

---

## What uses raw style props (intentional)

These are not "hardcoded" in the bad sense — they are explicit one-off overrides that reference token values and are not structural layout:

| Element | Why it's a style prop |
|---|---|
| Submit button `backgroundColor: '#FFF000'` | Brand accent, only used here — setting as colorPrimary would break the system |
| "Aloha, Jen" `fontFamily: 'Georgia, serif'` | Display heading, one-off — not a system-wide change |
| Cards row `maxWidth: 820px` | Content container constraint from `content-max-width` token |
| Submit button `opacity`/`transform` | Animation state driven by JS — can't live in theme |

---

## Packages to install

```bash
npm install antd @ant-design/icons
```

Ant Design v5 required (uses the `theme` token system via `ConfigProvider`).

---

## Reference

- Design tokens: `tokens.json` (project root) — W3C DTCG format
- Current working prototype: `app/App.tsx`
- This project uses Tailwind + Shadcn/ui for its own prototype — the frontend team should ignore those and work purely with Ant Design
