import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button, Tag, Badge, Avatar, Tabs, Table, Space } from 'antd';
import { Bell, Globe, PieChart, Ticket, Plus } from 'lucide-react';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a39e98', marginBottom: 20 }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
        {children}
      </div>
    </div>
  );
}

const tableColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Company', dataIndex: 'company', key: 'company' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Opened', dataIndex: 'opened', key: 'opened' },
];

const tableData = [
  { key: '1', name: 'Anna Fischer', company: 'Siemens AG', email: 'a.fischer@siemens.com', opened: '2 days ago' },
  { key: '2', name: 'Luca Romano', company: 'Bain & Company', email: 'l.romano@bain.com', opened: '3 days ago' },
  { key: '3', name: 'Sophie Müller', company: 'Deutsche Bank', email: 's.mueller@db.com', opened: '3 days ago' },
  { key: '4', name: 'James Holloway', company: 'Accenture', email: 'j.holloway@accenture.com', opened: '4 days ago' },
];

const tabItems = [
  { key: 'report', label: 'Insight Report', children: <div style={{ padding: '16px 0', color: '#615d59', fontSize: 14 }}>Report content goes here.</div> },
  { key: 'draft', label: 'Exec Summary', children: <div style={{ padding: '16px 0', color: '#615d59', fontSize: 14 }}>Draft content goes here.</div> },
];

function AntDesignPage() {
  const [activeTab, setActiveTab] = useState('report');

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '48px 56px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ marginBottom: 48 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: 'rgba(0,0,0,0.95)', margin: 0, letterSpacing: '-0.5px' }}>Ant Design Components</h1>
        <p style={{ fontSize: 15, color: '#615d59', marginTop: 8 }}>
          All components themed via <code style={{ fontSize: 13, backgroundColor: '#f6f5f4', padding: '2px 6px', borderRadius: 4 }}>ConfigProvider</code> in{' '}
          <code style={{ fontSize: 13, backgroundColor: '#f6f5f4', padding: '2px 6px', borderRadius: 4 }}>antdTheme.ts</code>. Same config used in the app and Storybook.
        </p>
      </div>

      <Section title="Button">
        <Button type="primary">Approve &amp; publish</Button>
        <Button type="primary">Send to 340 contacts</Button>
        <Button>Edit first</Button>
        <Button>Edit draft</Button>
        <Button type="primary" danger>Delete</Button>
        <Button type="primary" disabled>Disabled</Button>
        <Button disabled>Disabled</Button>
      </Section>

      <Section title="Button — sizes">
        <Button type="primary" size="large">Large</Button>
        <Button type="primary">Default</Button>
        <Button type="primary" size="small">Small</Button>
        <Button size="large">Large</Button>
        <Button>Default</Button>
        <Button size="small">Small</Button>
      </Section>

      <Section title="Button — with icon">
        <Button type="primary" icon={<Plus size={14} />}>New chat</Button>
        <Button icon={<Bell size={14} />}>Activity</Button>
      </Section>

      <Section title="Tag">
        <Tag>Event website</Tag>
        <Tag color="blue">Insights &amp; reporting</Tag>
        <Tag color="purple">Contact &amp; tickets</Tag>
        <Tag color="green">Published</Tag>
        <Tag color="red">Overdue</Tag>
        <Tag color="orange">Pending</Tag>
      </Section>

      <Section title="Badge">
        <Badge count={2} style={{ backgroundColor: '#dbeafe', color: '#2563eb', boxShadow: '0 0 0 2px white', fontSize: 9, fontWeight: 600 }}>
          <Bell size={18} color="#615d59" />
        </Badge>
        <Badge count={5}>
          <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: '#f6f5f4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Globe size={16} color="#615d59" />
          </div>
        </Badge>
        <Badge dot>
          <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: '#f6f5f4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PieChart size={16} color="#615d59" />
          </div>
        </Badge>
      </Section>

      <Section title="Avatar">
        <Avatar size={40} style={{ backgroundColor: '#FDE047', color: '#171717', fontWeight: 600 }}>JB</Avatar>
        <Avatar size={40} style={{ backgroundColor: '#C4B5FD', color: '#171717', fontWeight: 600 }}>AR</Avatar>
        <Avatar size={40} style={{ backgroundColor: '#34D399', color: '#171717', fontWeight: 600 }}>LM</Avatar>
        <Avatar size={32}>J</Avatar>
        <Avatar size={24}>J</Avatar>
        <Space>
          <Avatar.Group>
            <Avatar style={{ backgroundColor: '#FDE047', color: '#171717' }}>A</Avatar>
            <Avatar style={{ backgroundColor: '#C4B5FD', color: '#171717' }}>B</Avatar>
            <Avatar style={{ backgroundColor: '#34D399', color: '#171717' }}>C</Avatar>
          </Avatar.Group>
        </Space>
      </Section>

      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a39e98', marginBottom: 20 }}>Tabs</div>
        <div style={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12, overflow: 'hidden' }}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            tabBarStyle={{ paddingLeft: 24, paddingRight: 24, marginBottom: 0, borderBottom: '1px solid #f5f5f5' }}
          />
        </div>
      </div>

      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a39e98', marginBottom: 20 }}>Table — warm contacts</div>
        <Table
          columns={tableColumns}
          dataSource={tableData}
          pagination={false}
          size="small"
          style={{ border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12, overflow: 'hidden' }}
        />
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Design System / Ant Design',
  component: AntDesignPage,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Components: StoryObj = {};
