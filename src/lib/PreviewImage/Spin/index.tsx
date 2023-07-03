import React, { memo, useMemo, useState, useLayoutEffect } from 'react';
import './index.less';

interface IProps {
  children?: React.ReactNode;
  delay?: number;
  spinning: boolean;
}

function Spin(props: IProps) {
  const { children, delay, spinning } = props;
  const [isClosed, setCloseSpin] = useState(spinning);

  useLayoutEffect(() => {
    // eslint-disable-next-line
    if (delay == null) {
      setCloseSpin(() => !spinning);
      return;
    }
    setTimeout(() => setCloseSpin(() => !spinning), delay);
  }, [spinning]);

  const renderDot = useMemo(
    () => (
      <div className="qm-vnit-ait-spin">
        <div className="qm-vnit-ait-spin-dot">
          <div className="qm-vnit-ait-spin-dot-item" />
          <div className="qm-vnit-ait-spin-dot-item" />
          <div className="qm-vnit-ait-spin-dot-item" />
          <div className="qm-vnit-ait-spin-dot-item" />
        </div>
      </div>
    ),
    [],
  );

  // eslint-disable-next-line
  if (children == null) return isClosed ? null : renderDot;

  return (
    <div className="qm-vnit-ait-spin-box">
      <div className={`qm-vnit-ait-spin-spinning${isClosed ? ' hide' : ''}`}>
        <div className="qm-vnit-ait-spin-spinning-center">{renderDot}</div>
      </div>

      <div className={`qm-vnit-ait-spin-container${isClosed ? '' : ' qm-vnit-ait-spin-mask'}`}>{children}</div>
    </div>
  );
}

export default memo(Spin);
