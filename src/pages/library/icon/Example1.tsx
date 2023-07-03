import React, { memo } from 'react';
import MarkdownCode from '@/components/MarkdownCode';
import { Card } from 'antd';
import { Icon } from '@/lib';
import classes from './index.module.less';

function Example() {
  return (
    <Card style={{ margin: '20px 0 60px' }}>
      <div className={classes.box} style={{ padding: '0 0 20px', background: '#fff' }}>
        <div className={classes.item}>
          <Icon name="image" className={classes.icon} />
          image
        </div>
        <div className={classes.item}>
          <Icon name="minus-circle" className={classes.icon} />
          minus-circle
        </div>
        <div className={classes.item}>
          <Icon name="plus-circle" className={classes.icon} />
          plus-circle
        </div>
        <div className={classes.item}>
          <Icon name="close" className={classes.icon} />
          close
        </div>
        <div className={classes.item}>
          <Icon name="rotate-left" className={classes.icon} />
          rotate-left
        </div>
        <div className={classes.item}>
          <Icon name="rotate-right" className={classes.icon} />
          rotate-righ
        </div>
        <div className={classes.item}>
          <Icon name="swap-outline" className={classes.icon} />
          swap-outline
        </div>
        <div className={classes.item}>
          <Icon name="arrow-left-bold" className={classes.icon} />
          arrow-left-bold
        </div>
        <div className={classes.item}>
          <Icon name="arrow-right-bold" className={classes.icon} />
          arrow-right-bold
        </div>
      </div>
      <MarkdownCode code={code} />
    </Card>
  );
}

export default memo(Example);

const code = `
~~~js
import React, { memo, useCallback, useMemo, useState } from 'react';
import { Icon } from 'qm-vnit';

function Example() {
  return (
    <div style={{ padding: '0 0 20px', background: '#fff' }}>
      <Icon name="image" style={{ fontSize: 42 }}>
    </div>
  );
}

export default memo(Example);
~~~
`;
