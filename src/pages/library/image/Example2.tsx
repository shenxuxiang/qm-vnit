import Template from '@/components/ExampleTemplate';
import classes from './index.module.less';
import React, { memo } from 'react';
import { Image as Img } from '@/lib';

import defaultImg from '@/assets/default.svg';

function Example() {
  return (
    <Template markdown={code} title="案例二（图片未加载完成之前展示的内容）">
      <Img src={defaultImg} className={classes.img} />
    </Template>
  );
}

export default memo(Example);

const code = `
~~~tsx
import Template from '@/components/ExampleTemplate';
import classes from './index.module.less';
import React, { memo } from 'react';
import { Image as Img } from '@/lib';

import defaultImg from '@/assets/default.svg';

function Example() {
  return (
    <Template markdown={code} title="案例二（图片未加载完成之前展示的内容）">
      <Img src={defaultImg} className={classes.img}/>
    </Template>
  );
}

export default memo(Example);
~~~
`;
