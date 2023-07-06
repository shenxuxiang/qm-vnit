import React, { memo, useState } from 'react';
import MarkdownCode from '@/components/MarkdownCode';
import { Card, Button } from 'antd';
import { PreviewImage } from '@/lib';

import img1 from '@/assets/images/1.jpg';
import img2 from '@/assets/images/2.png';
import img3 from '@/assets/images/3.webp';
import img4 from '@/assets/images/4.jpg';
import img5 from '@/assets/images/5.jpg';
import img6 from '@/assets/images/6.jpg';
import img7 from '@/assets/images/7.webp';
import img8 from '@/assets/images/8.jpeg';
import img9 from '@/assets/images/9.webp';
import img10 from '@/assets/images/10.webp';
import img11 from '@/assets/images/11.webp';
import img12 from '@/assets/images/12.png';
import img13 from '@/assets/images/13.webp';
import img14 from '@/assets/images/14.webp';
import img15 from '@/assets/images/15.jpeg';
import img16 from '@/assets/images/16.png';
import img17 from '@/assets/images/17.webp';
import img18 from '@/assets/images/18.webp';
import img19 from '@/assets/images/19.jpg';
import img20 from '@/assets/images/20.jpg';
import img21 from '@/assets/images/21.jpg';
import img22 from '@/assets/images/22.jpg';
import img23 from '@/assets/images/23.jpg';
import img24 from '@/assets/images/24.webp';
import img25 from '@/assets/images/25.jpg';
import img26 from '@/assets/images/26.webp';
import img27 from '@/assets/images/27.jpg';
import img28 from '@/assets/images/28.webp';
import img29 from '@/assets/images/29.webp';
import img30 from '@/assets/images/30.jpg';

const imgs = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
  img21,
  img22,
  img23,
  img24,
  img25,
  img26,
  img27,
  img28,
  img29,
  img30,
];

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <Card style={{ margin: '20px 0 60px' }}>
      <p style={{ margin: '0 0 20px' }}>案例一</p>
      <div style={{ padding: '0 0 20px', background: '#fff' }}>
        <Button onClick={() => setOpen(true)}>预览</Button>
        <PreviewImage index={0} open={open} imgs={imgs} pageSize={9} onClose={() => setOpen(false)} />
      </div>
      <MarkdownCode code={code} />
    </Card>
  );
}

export default memo(Example);

const code = `
~~~js
import React, { memo, useState } from 'react';
import {  Button } from 'antd';
import { PreviewImage } from 'qm-vnit';

import img1 from "@/assets/images/1.jpg";
import img2 from "@/assets/images/2.png";
import img3 from "@/assets/images/3.webp";
import img4 from "@/assets/images/4.jpg";
import img5 from "@/assets/images/5.jpg";
import img6 from "@/assets/images/6.jpg";
import img7 from "@/assets/images/7.webp";
import img8 from "@/assets/images/8.jpeg";
import img9 from "@/assets/images/9.webp";
import img10 from "@/assets/images/10.webp";
import img11 from "@/assets/images/11.webp";
import img12 from "@/assets/images/12.png";
import img13 from "@/assets/images/13.webp";
import img14 from "@/assets/images/14.webp";
import img15 from "@/assets/images/15.jpeg";
import img16 from "@/assets/images/16.png";
import img17 from "@/assets/images/17.webp";
import img18 from "@/assets/images/18.webp";
import img19 from "@/assets/images/19.jpg";
import img20 from "@/assets/images/20.jpg";
import img21 from "@/assets/images/21.jpg";
import img22 from "@/assets/images/22.jpg";
import img23 from "@/assets/images/23.jpg";
import img24 from "@/assets/images/24.webp";
import img25 from "@/assets/images/25.jpg";
import img26 from "@/assets/images/26.webp";
import img27 from "@/assets/images/27.jpg";
import img28 from "@/assets/images/28.webp";
import img29 from "@/assets/images/29.webp";
import img30 from "@/assets/images/30.jpg";

const imgs = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
  img21, img22, img23, img24, img25, img26, img27, img28, img29, img30,
];

function Example() {
  const [ open, setOpen ] = useState(false);

  return (
    <div style={{ padding: '0 0 20px', background: '#fff' }}>
      <Button onClick={() => setOpen(true)}>预览</Button>
      <PreviewImage
        index={0}
        open={open}
        imgs={imgs}
        pageSize={9}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

export default memo(Example);
~~~
`;
