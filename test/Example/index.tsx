import React, { memo } from 'react';
import './index.less';

export default function Demo() {
  return (
    <div
      className="demo-content"
      onMouseEnter={() => console.log('mouse enter')}
      onMouseLeave={() => console.log('mouse leave')}
      onMouseMove={() => console.log('mouse move')}
    >
      hello world
      <div className="demo-mask-box">
        <div className="demo-mask" role="button" aria-label="mask">mask</div>
      </div>
    </div>
  );
}
