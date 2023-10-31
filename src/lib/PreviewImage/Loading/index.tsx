import React, { memo, useMemo, useState, useEffect, useRef } from 'react';
import './index.less';

type LoadingProps = {
  open: boolean;
  theme?: 'light' | 'dark' | string;
  size?: 'default' | 'large' | 'small';
};

function Loading(props: LoadingProps) {
  const [visible, setVisible] = useState(false);
  const { open, theme, size = 'default' } = props;
  const loadingRef = useRef<any>();

  useEffect(() => {
    let interval: number = null!;
    if (open) {
      loadingRef.current.style.display = '';
      interval = requestAnimationFrame(() => setVisible(() => true));
    } else {
      setVisible(() => false);
      interval = window.setTimeout(() => (loadingRef.current.style.display = 'none'), 300);
    }

    return () => {
      if (interval) {
        clearTimeout(interval);
        cancelAnimationFrame(interval);
      }
    };
  }, [open]);

  const dotColor = useMemo(() => {
    switch (theme) {
      case 'light':
        return '#f2f2f2';
      case 'dark':
        return '#b3b3b3';
      default:
        return theme;
    }
  }, [theme]);

  return (
    <div
      ref={loadingRef}
      style={{ display: 'none' }}
      className={`qm-vnit-loading ${size} ${visible ? 'show' : 'hide'}`}
    >
      <div className="qm-vnit-loading-dot" style={{ background: dotColor }} />
      <div className="qm-vnit-loading-dot" style={{ background: dotColor }} />
      <div className="qm-vnit-loading-dot" style={{ background: dotColor }} />
      <div className="qm-vnit-loading-dot" style={{ background: dotColor }} />
      <div className="qm-vnit-loading-dot" style={{ background: dotColor }} />
      <div className="qm-vnit-loading-dot" style={{ background: dotColor }} />
    </div>
  );
}

export default memo(Loading);
