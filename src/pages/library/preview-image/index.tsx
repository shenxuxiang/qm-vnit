import { Table } from 'antd';
import Example1 from './Example1';
import Example2 from './Example2';
import React, { memo } from 'react';
import MarkdownCode from '@/components/MarkdownCode';
import { TABLE_HEADER } from '@/pages/library/constants';

const header = `
  ## PreviewImage 图片预览
  支持多张图片翻页预览的功能，并支持放大、镜像、旋转 等功能。
`;

const usage = `
  ### 何时使用
  再任何你需要预览图片的地方都可以使用
`;

const notes = `
  ### 开发者注意事项
  支持一般模式的图片预览，这里的一般模式值得是图片大小不超过 200M。对于超过限制的，我们提供了另一套高清渲染逻辑。

  对于高清渲染逻辑来说，开发者需要使用 SuperPreviewImage 组件，

  当用户进行操作时及时响应用户操作，待高清图展示完成后再切换成高清图
`;

const updateText = `
  ### 更新内容
  * 修复原先预览图片拖拽后，切换一下张图片时，图片没有复位的问题；
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
      <Example2 />

      <h1>PreviewImage API</h1>
      <Table bordered columns={TABLE_HEADER} rowKey="key" dataSource={properties} pagination={false} />
      <h1>SuperPreviewImage API</h1>
      <Table bordered columns={TABLE_HEADER} rowKey="key" dataSource={superProperties} pagination={false} />

      <br />
      <MarkdownCode code={updateText} hasExpandButton={false} defaultExpand />
    </section>
  );
}

export default memo(Page);

const properties = [
  {
    key: 'open',
    instruct: '是否展示组件',
    type: 'boolean',
    default: 'false',
  },
  {
    key: 'imgs',
    instruct:
      '预览的图片列表，如果预览的图片特别的大加载缓慢的话，我们提供了缩略图的展示方案，只需要开发者将缩略图通过 previewImgs 传递给组件。',
    type: 'string[]',
  },
  {
    key: 'index',
    instruct: '默认展示第几个图片，默认第一个',
    type: 'number',
    default: '0',
  },
  {
    key: 'onClose',
    instruct: '关闭组件的回调方法',
    type: '(index: number) => void',
  },
  {
    key: 'pageSize',
    instruct: '指定缩略图展示列表一页可以展示多少张图片',
    type: 'number',
    default: '9',
  },
];

const superProperties = [
  {
    key: 'open',
    instruct: '是否展示组件',
    type: 'boolean',
    default: 'false',
  },
  {
    key: 'imgs',
    instruct: '预览超大图的列表，hdUrl 表示大图的链接，url 表示小图的链接',
    type: '{ url: string; hdUrl: string }[]',
  },
  {
    key: 'index',
    instruct: '默认展示第几个图片，默认第一个',
    type: 'number',
    default: '0',
  },
  {
    key: 'onClose',
    instruct: '关闭组件的回调方法',
    type: '(index: number) => void',
  },
  {
    key: 'pageSize',
    instruct: '指定缩略图展示列表一页可以展示多少张图片',
    type: 'number',
    default: '9',
  },
];
