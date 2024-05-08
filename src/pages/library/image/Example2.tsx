import Template from '@/components/ExampleTemplate';
import Imgs from '@/assets/default.svg?react';
import classes from './index.module.less';
import React, { memo } from 'react';

function Example() {
  return (
    <Template title="案例二（img 惰性加载完成之前所展示的内容）">
      <Imgs className={classes.img} />
    </Template>
  );
}

export default memo(Example);
