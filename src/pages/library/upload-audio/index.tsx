import { Table } from 'antd';
import Example1 from './Example1';
import React, { memo } from 'react';
import MarkdownCode from '@/components/MarkdownCode';
import { TABLE_HEADER } from '@/pages/library/constants';

const header = `
  ## UploadAudio 音频上传控件
  音频上传控件，支持同时上传多个音频，支持预览
`;

const usage = `
  ### 何时使用
  可单独使用，也可以嵌套在 FormItem 表单控件中使用（无需再次封装）
`;

const notes = `
  ### 开发者注意事项
  对于一般无需用户登录凭证的可以直接使用，如需登陆凭证可以通过 headers 传递给组件
`;

function Page() {
  return (
    <section style={{ padding: '20px 20px 20px 60px' }}>
      <MarkdownCode code={header} hasExpandButton={false} defaultExpand />
      <br />
      <MarkdownCode code={usage} hasExpandButton={false} defaultExpand />
      <br />
      <MarkdownCode code={notes} hasExpandButton={false} defaultExpand />
      <br />
      <MarkdownCode code="### 代码演示" hasExpandButton={false} defaultExpand />

      <Example1 />

      <h1>API</h1>
      <Table bordered columns={TABLE_HEADER} rowKey="key" dataSource={properties} pagination={false} />
    </section>
  );
}

export default memo(Page);

const properties = [
  {
    key: 'action',
    instruct: '上传的路径',
    type: 'string',
  },
  {
    key: 'accept',
    instruct: '指定上传的文件类型',
    type: 'audio/*',
  },
  {
    key: 'headers',
    instruct: '上传时携带的请求头',
    type: 'object',
  },
  {
    key: 'maxCount',
    instruct: '最多可以上传多少个图片，0 表示不限制',
    type: 'number',
    default: '0',
  },
  {
    key: 'maxSize',
    instruct: '限制图片的大小，0 表示不限制',
    type: 'number',
    default: '0',
  },
  {
    key: 'multiple',
    instruct: '是否支持多张图片上传',
    type: 'boolean',
    default: 'true',
  },
  {
    key: 'value',
    instruct: '组件的值，控制组件回显',
    type: 'UploadFile[]',
  },
  {
    key: 'onChange',
    instruct: '可控，value 变化的回调函数',
    type: '(fileList: UploadFile[]) => void',
  },
  {
    key: 'disabled',
    instruct: '是否禁用',
    type: 'boolean',
    default: 'true',
  },
];
