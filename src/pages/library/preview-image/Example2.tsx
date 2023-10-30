import Template from '@/components/ExampleTemplate';
import React, { memo, useState } from 'react';
import { PreviewImage } from '@/lib';
import { Button } from 'antd';
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

const { SuperPreviewImage } = PreviewImage;

// 模拟高清图 url 列表
const imgs = [
  { url: img1, hdUrl: img11 },
  { url: img2, hdUrl: img12 },
  { url: img3, hdUrl: img13 },
  { url: img4, hdUrl: img14 },
  { url: img5, hdUrl: img15 },
  { url: img6, hdUrl: img16 },
  { url: img7, hdUrl: img17 },
  { url: img8, hdUrl: img18 },
  { url: img9, hdUrl: img19 },
  { url: img10, hdUrl: img20 },
];

function Example() {
  const [open, setOpen] = useState(false);

  const handleClose = (index: number) => {
    console.log(index);
    setOpen(false);
  };

  return (
    <Template markdown={code} title="案例二">
      <Button onClick={() => setOpen(true)}>高清图预览</Button>
      <p>开发者在调试时可以将 network 中的网络速度调整为 Fast 3G 来查看demo</p>
      <SuperPreviewImage index={0} open={open} imgs={imgs} pageSize={9} onClose={handleClose} />
    </Template>
  );
}

export default memo(Example);

const code = `
~~~tsx
import Template from '@/components/ExampleTemplate';
import React, { memo, useState } from 'react';
import { PreviewImage } from '@/lib';
import { Button } from 'antd';
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

const { SuperPreviewImage } = PreviewImage;

// 模拟高清图 url 列表
const imgs = [
  { url: img1, hdUrl: img11 },
  { url: img2, hdUrl: img12 },
  { url: img3, hdUrl: img13 },
  { url: img4, hdUrl: img14 },
  { url: img5, hdUrl: img15 },
  { url: img6, hdUrl: img16 },
  { url: img7, hdUrl: img17 },
  { url: img8, hdUrl: img18 },
  { url: img9, hdUrl: img19 },
  { url: img10, hdUrl: img20 },
];

function Example() {
  const [open, setOpen] = useState(false);

  const handleClose = (index: number) => {
    console.log(index);
    setOpen(false);
  }

  return (
    <Template markdown={code} title="案例二">
      <Button onClick={() => setOpen(true)}>高清图预览</Button>
      <p>开发者在调试时可以将 network 中的网络速度调整为 Fast 3G 来查看demo</p>
      <SuperPreviewImage
        index={0}
        open={open}
        imgs={imgs}
        pageSize={9}
        onClose={handleClose}
      />
    </Template>
  );
}

export default memo(Example);
~~~
`;
