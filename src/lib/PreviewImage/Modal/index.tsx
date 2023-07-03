import React, { memo, useEffect, useCallback, useState, useRef } from 'react';
import Portal from '@/utils/portal';
import './index.less';

function Modal(props: any) {
  const [visible, setVisible] = useState(false);
  const { open, onClose, children, mask = true, maskClosable = true } = props;
  const maskRef = useRef<any>();
  const contentRef = useRef<any>();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'none';
      maskRef.current.style.display = '';
      contentRef.current.style.display = '';
      setTimeout(() => setVisible(() => true), 20);
    } else {
      document.body.style.overflow = '';
      setVisible(() => false);
      setTimeout(() => {
        maskRef.current.style.display = 'none';
        contentRef.current.style.display = 'none';
      }, 300);
    }
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
