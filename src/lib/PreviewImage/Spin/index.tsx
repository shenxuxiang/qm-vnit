import React, { memo, useMemo, useState, useLayoutEffect } from 'react';
import styles from './index.module.less';

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
      <div className={styles.aitSpin}>
        <div className={styles.aitSpinDot}>
          <div className={styles.aitSpinDotItem} />
          <div className={styles.aitSpinDotItem} />
          <div className={styles.aitSpinDotItem} />
          <div className={styles.aitSpinDotItem} />
        </div>
      </div>
    ),
    [],
  );

  // eslint-disable-next-line
  if (children == null) return isClosed ? null : renderDot;

  return (
    <div className={styles.aitSpinBox}>
      <div className={`${styles.aitSpinSpinning}${isClosed ? ` ${styles.hide}` : ''}`}>
        <div className={styles.aitSpinSpinningCenter}>{renderDot}</div>
      </div>

      <div className={`${styles.aitSpinContainer}${isClosed ? '' : ` ${styles.aitSpinMask}`}`}>{children}</div>
    </div>
  );
}

export default memo(Spin);
