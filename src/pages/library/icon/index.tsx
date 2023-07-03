import React, { memo } from 'react';
import classes from '../index.module.less';
import { Table } from 'antd';
import Example1 from './Example1';
import { TABLE_HEADER } from '@/pages/library/constants';

function Page() {
  return (
    <section className={classes.module}>
      <h1 className={classes.module_title}>Icon 图标</h1>

      <h1 className={classes.module_notice_title}>何时使用</h1>
      <p className={classes.module_subtitle}>你可以在任何希望插入图标的地方插入</p>

      <h1 className={classes.module_notice_title}>开发者注意事项</h1>
      <p className={classes.module_subtitle}>
        开发者可以给组件传递除 name、className、style、onClick 之外的其他任意属性，任意属性应该以 "data-" 作为前缀。
      </p>

      <h1 className={classes.module_notice_title}>代码演示</h1>

      <Example1 />

      <h1>API</h1>
      <Table bordered columns={TABLE_HEADER} rowKey="key" dataSource={properties} pagination={false} />
    </section>
  );
}

export default memo(Page);

const properties = [
  {
    key: 'name',
    instruct: '图标的名称',
    type: 'string',
  },
  {
    key: 'className',
    instruct: '图标的类名',
    type: 'string',
  },
  {
    key: 'style',
    instruct: '图标的样式',
    type: 'React.CSSProperties',
  },
  {
    key: 'onClick',
    instruct: '绑定的点击事件',
    type: '(event: any) => void',
  },
  {
    key: '其他',
    instruct: '你还可以绑定其他任意的属性，建议使用 "data-" 前缀，这样不会破坏 HTML 结构属性',
    type: 'any',
  },
];
