import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

export const columns = [
  {
    dataIndex: 'name',
    title: '姓名',
    formType: 'input',
  },
  {
    dataIndex: 'birthTime',
    title: '出生日期',
    formType: 'datePicker',
    properties: { picker: 'year' },
    dataFormat(value: Dayjs) {
      return {
        birthTime: value.format('YYYY'),
      }
    },
    sorter: true,
  },
  {
    dataIndex: 'nation',
    title: '国籍',
    formType: 'select',
    options: [
      { value: 'china', label: '中国' },
      { value: 'franch', label: '法国' },
      { value: 'english', label: '英国' },
      { value: 'american', label: '美国' },
    ]
  },
  {
    dataIndex: 'status',
    title: '状态',
    formType: 'select',
    options: [
      { value: '1', label: '在职' },
      { value: '0', label: '离职' },
    ]
  },
];

export const columns2 = [
  {
    dataIndex: 'name',
    title: '姓名',
    formType: 'input',
    initialValue: 'xiaoming',
  },
  {
    dataIndex: 'birthTime',
    title: '出生日期',
    formType: 'datePicker',
    properties: { picker: 'year' },
    dataFormat(value: Dayjs) {
      return {
        birthTime: value.format('YYYY'),
      }
    },
    sorter: true,
    initialValue: dayjs('1991'),
  },
  {
    dataIndex: 'nation',
    title: '国籍',
    formType: 'select',
    options: [
      { value: 'china', label: '中国' },
      { value: 'franch', label: '法国' },
      { value: 'english', label: '英国' },
      { value: 'american', label: '美国' },
    ]
  },
  {
    dataIndex: 'status',
    title: '状态',
    formType: 'select',
    options: [
      { value: '1', label: '在职' },
      { value: '0', label: '离职' },
    ]
  },
];


export const treeData = [
  {
    id: '1-1',
    name: '1-1',
    children: [
      {
        id: '1-1-1',
        parentId: '1-1',
        name: '1-1-1',
        children: [
          {
            id: '1-1-1-1',
            parentId: '1-1-1',
            name: '1-1-1-1',
          },
          {
            id: '1-1-1-2',
            parentId: '1-1-1',
            name: '1-1-1-2',
          },
        ],
      },
      {
        id: '1-1-2',
        parentId: '1-1',
        name: '1-1-2',
      },
      {
        id: '1-1-3',
        parentId: '1-1',
        name: '1-1-3',
      },
    ],
  },
  {
    id: '1-2',
    name: '1-2',
    children: [
      {
        id: '1-2-1',
        parentId: '1-2',
        name: '1-2-1',
      },
      {
        id: '1-2-2',
        parentId: '1-2',
        name: '1-2-2',
        disabled: true,
        children: [
          {
            id: '1-2-2-1',
            parentId: '1-2-2',
            name: '1-2-2-1',
            disabled: true,
          },
          {
            id: '1-2-2-2',
            parentId: '1-2-2',
            name: '1-2-2-2',
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    id: '1-3',
    name: '1-3',
  },
  {
    id: '1-4',
    name: '1-4',
  },
];
