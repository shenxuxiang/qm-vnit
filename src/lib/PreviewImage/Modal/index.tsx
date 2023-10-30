import React, { memo, useEffect, useCallback, useState, useRef } from 'react';
import Portal from '@/utils/portal';
import './index.less';

function Modal(props: any) {
  const [visible, setVisible] = useState(false);
  const { open, onClose, children, mask = true, maskClosable = true } = props;
  const maskRef = useRef<any>();
  const contentRef = useRef<any>();

  useEffect(() => {
    let interval: number = null!;
    if (open) {
      document.body.style.overflow = 'none';
      maskRef.current.style.display = '';
      contentRef.current.style.display = '';
      interval = requestAnimationFrame(() => setVisible(() => true));
    } else {
      document.body.style.overflow = '';
      setVisible(() => false);
      interval = window.setTimeout(() => {
        maskRef.current.style.display = 'none';
        contentRef.current.style.display = 'none';
      }, 300);
    }

    return () => {
      if (interval) {
        clearTimeout(interval);
        cancelAnimationFrame(interval);
      }
    };
  }, [open]);

  const handleCloseModal = useCallback(() => {
    maskClosable && onClose?.();
  }, [maskClosable]);

  return (
    <Portal>
      {mask && (
        <div
          ref={maskRef}
          onClick={handleCloseModal}
          style={{ display: 'none' }}
          className={`qm-vnit-modal-mask${visible ? ' open' : ''}`}
        />
      )}
      <div ref={contentRef} style={{ display: 'none' }} className={`qm-vnit-modal-content${visible ? ' open' : ''}`}>
        {children}
      </div>
    </Portal>
  );
}

export default memo(Modal);
