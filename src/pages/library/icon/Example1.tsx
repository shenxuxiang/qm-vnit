import Template from '@/components/ExampleTemplate';
import classes from './index.module.less';
import React, { memo } from 'react';
import { Icon } from '@/lib';

function Example() {
  return (
    <Template markdown={code} title="案例">
      <div className={classes.box}>
        <div className={classes.item}>
          <Icon name="image" className={classes.icon} />
          image
        </div>
        <div className={classes.item}>
          <Icon name="backtop" className={classes.icon} />
          backtop
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
        <div className={classes.item}>
          <Icon name="download" className={classes.icon} />
          download
        </div>
        <div className={classes.item}>
          <Icon name="icon-comment" className={classes.icon} />
          icon-comment
        </div>
        <div className={classes.item}>
          <Icon name="share" className={classes.icon} />
          share
        </div>
        <div className={classes.item}>
          <Icon name="selected" className={classes.icon} />
          selected
        </div>
        <div className={classes.item}>
          <Icon name="Pause" className={classes.icon} />
          Pause
        </div>
        <div className={classes.item}>
          <Icon name="play1" className={classes.icon} />
          play1
        </div>
      </div>
    </Template>
  );
}

export default memo(Example);

const code = `
~~~tsx
import Template from '@/components/ExampleTemplate';
import classes from './index.module.less';
import React, { memo } from 'react';
import { Icon } from '@/lib';

function Example() {
  return (
    <Template markdown={code} title="案例">
      <div className={classes.box}>
        <div className={classes.item}>
          <Icon name="image" className={classes.icon} />
          image
        </div>
        <div className={classes.item}>
          <Icon name="backtop" className={classes.icon} />
          backtop
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
        <div className={classes.item}>
          <Icon name="download" className={classes.icon} />
          download
        </div>
        <div className={classes.item}>
          <Icon name="icon-comment" className={classes.icon} />
          icon-comment
        </div>
        <div className={classes.item}>
          <Icon name="share" className={classes.icon} />
          share
        </div>
        <div className={classes.item}>
          <Icon name="selected" className={classes.icon} />
          selected
        </div>
        <div className={classes.item}>
          <Icon name="Pause" className={classes.icon} />
          Pause
        </div>
        <div className={classes.item}>
          <Icon name="play1" className={classes.icon} />
          play1
        </div>
      </div>
    </Template>
  );
}

export default memo(Example);
~~~
`;
