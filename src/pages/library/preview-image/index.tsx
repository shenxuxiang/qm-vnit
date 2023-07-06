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
  支持一般模式的图片预览，这里的一般模式值得是图片大小不超过 50M。对于超过限制的，我们提供了另一套高清渲染逻辑。

  对于高清渲染逻辑来说，开发者需要提供一个高清图的列表（imgs）、一个缩略图的列表（previewImgs），

  当用户进行操作时及时响应用户操作，待高清图展示完成后再切换成高清图
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

      <h1>API</h1>
      <Table bordered columns={TABLE_HEADER} rowKey="key" dataSource={properties} pagination={false} />

      <MarkdownCode code={code} defaultExpand />
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
    type: '() => void',
  },
  {
    key: 'pageSize',
    instruct: '指定缩略图展示列表一页可以展示多少张图片',
    type: 'number',
    default: '9',
  },
  {
    key: 'previewImgs',
    instruct:
      '缩略图展示列表，注意 previewImgs 作为缩略图列表（非高清图）用在下方的缩略图展示列表。并且，当高清图没有加载完成时，预览区域展示的是其对应的缩略图',
    type: 'string[]',
  },
  {
    key: 'hasPerformance',
    instruct: '是否启动性能优化方案，当提供 previewImgs 时需要将其设置为 true',
    type: 'boolean',
    default: 'false',
  },
];

const code = `
~~~jsx
// 注意这里我将 open 添加到依赖项，其目的是为了防止初始化时 imageURL 没有取到值时，在 open 变化时重新取值。
useEffect(() => {
  const hd = HDPictureListRef.current[currentIndex];
  // 如果高清图不存在，则不执行后续的逻辑
  if (!hd) return;
  // 如果当前 IMG 节点上展示的图像就是目标图像，也同样不执行后续逻辑
  if (imgRef.current?.src?.endsWith(hd)) return;

  // 是否执行 IMG 优化，优化方案则是先加载缩略图，等高清图加载完成后再添加到 IMG 节点展示。
  // 否则就是直接展示高清图。
  if (!hasPerformance) {
    setState({ imageURL: hd });
    return;
  }

  // 优化方案：先展示缩略图（thumbnailListRef.current[currentIndex]）。当高清图（hd）加载完成后再切换。
  // 这样的做法就是为了避免用户切换图片后（由于图片太大，或者网络不好时资源加载缓慢）而预览区域不发生变化，而给用户带来不好的体验效果。
  setState({ spinning: true, imageURL: thumbnailListRef.current[currentIndex] });

  const img = new Image();
  img.src = hd;
  img.onload = () => setState({ spinning: false, imageURL: hd });

  return () => {
    if (img) img.onload = null;
  }
}, [open, currentIndex]);
~~~
`;
