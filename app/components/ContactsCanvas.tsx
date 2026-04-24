import { Tag, Table } from 'antd';
import type { TableProps } from 'antd';
import { warmContacts } from '../../constants';
import type { WarmContact } from '../../constants';

const contactColumns: TableProps<WarmContact>['columns'] = [
  { title: 'Name',    dataIndex: 'name',    key: 'name',    render: (t: string) => <span className="font-medium text-neutral-900 text-xs">{t}</span> },
  { title: 'Company', dataIndex: 'company', key: 'company', render: (t: string) => <span className="text-neutral-500 text-xs">{t}</span> },
  { title: 'Email',   dataIndex: 'email',   key: 'email',   render: (t: string) => <span className="text-neutral-500 text-xs">{t}</span> },
  { title: 'Opened',  dataIndex: 'opened',  key: 'opened',  render: (t: string) => <span className="text-neutral-400 text-xs">{t}</span> },
];

export function ContactsCanvas() {
  return (
    <div className="flex-1 flex flex-col bg-neutral-50 overflow-hidden">
      <div className="flex-1 overflow-y-auto flex flex-col">
        <div className="px-8 pt-8 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-neutral-900">Email draft</h3>
            <Tag style={{ backgroundColor: '#FFF000', color: '#171717', borderColor: '#FFF000', fontWeight: 600 }}>
              Pending approval
            </Tag>
          </div>
          <div className="bg-white rounded-[14px] border border-neutral-100 shadow-[0px_1px_9px_0px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="border-b border-neutral-100 px-6 py-4 flex flex-col gap-2">
              <div className="flex gap-3 text-xs"><span className="text-neutral-400 w-12 shrink-0">From</span><span className="text-neutral-700">Jen Thompson &lt;jen@techsummiteurope.com&gt;</span></div>
              <div className="flex gap-3 text-xs"><span className="text-neutral-400 w-12 shrink-0">To</span><span className="text-neutral-700">340 warm contacts <span className="text-neutral-400">(opened invite, not registered)</span></span></div>
              <div className="flex gap-3 text-xs"><span className="text-neutral-400 w-12 shrink-0">Subject</span><span className="text-neutral-900 font-medium">Last chance: Early-bird pricing ends Friday</span></div>
            </div>
            <div className="px-6 py-5 text-sm text-neutral-700 leading-relaxed space-y-3">
              <p>Hi {'[First name]'},</p>
              <p>You took a look at Tech Summit Europe 2026 a few days ago — thank you for your interest. I wanted to make sure you didn't miss out on our early-bird pricing, which <strong className="font-semibold text-neutral-900">closes this Friday</strong>.</p>
              <p>After that, ticket prices increase by 40%. Secure your spot now and join 600+ tech leaders across Europe for two days of keynotes, workshops, and networking in Berlin.</p>
              <p className="pt-1"><span className="inline-block bg-neutral-900 text-white text-xs font-semibold px-4 py-2 rounded-full cursor-default">Register at early-bird price →</span></p>
              <p className="text-neutral-500 text-xs pt-2">If you have any questions, just reply to this email.<br />— Jen &amp; the Tech Summit team</p>
            </div>
          </div>
        </div>
        <div className="px-8 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-neutral-900">Contact segment <span className="text-neutral-400 font-normal">· 340 contacts</span></h3>
          </div>
          <div className="bg-white rounded-[14px] border border-neutral-100 shadow-[0px_1px_9px_0px_rgba(0,0,0,0.05)] overflow-hidden">
            <Table<WarmContact>
              dataSource={warmContacts}
              columns={contactColumns}
              size="small"
              pagination={false}
              rowKey="email"
              footer={() => (
                <span className="text-neutral-400 text-center block text-xs">+ 334 more contacts</span>
              )}
              style={{ fontFamily: 'inherit' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
