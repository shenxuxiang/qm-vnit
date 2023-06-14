import React from 'react';

export const TABLE_HEADER = [
  {
    dataIndex: 'key',
    title: '参数',
  },
  {
    dataIndex: 'instruct',
    title: '说明',
  },
  {
    dataIndex: 'type',
    title: '类型',
    render: (text: string) => <span style={{ color: '#f50' }}>{text}</span>,
  },
  {
    dataIndex: 'default',
    title: '默认值',
    render: (text: string) => text || '-',
  },
  {
    dataIndex: 'version',
    title: '版本',
  },
];
