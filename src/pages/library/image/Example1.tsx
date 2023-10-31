import Template from '@/components/ExampleTemplate';
import classes from './index.module.less';
import React, { memo } from 'react';
import { Image as Img } from '@/lib';
import img1 from '@/assets/images/1.jpg';
import img2 from '@/assets/images/2.png';
import img3 from '@/assets/images/3.webp';

function Example() {
  return (
    <Template markdown={code} title="案例一">
      <Img src={img1} className={classes.img} />
      <Img src={img2} className={classes.img} />
      <Img src={img3} className={classes.img} />
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
import img1 from '@/assets/images/1.jpg';
import img2 from '@/assets/images/2.png';
import img3 from '@/assets/images/3.webp';
import defaultImg from '@/assets/default.svg';

function Example() {
  return (
    <Template markdown={code} title="案例一">
      <Img src={img1} className={classes.img}/>
      <Img src={img2} className={classes.img}/>
      <Img src={img3} className={classes.img}/>
    </Template>
  );
}

export default memo(Example);
~~~
`;
