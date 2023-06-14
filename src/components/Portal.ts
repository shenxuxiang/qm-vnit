import React from 'react';
import { memo, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function createElement() {
  return document.createElement('div');
}

type ReactPortalProps = {
  className?: string;
  children: React.ReactNode;
};

function ReactPortal(props: ReactPortalProps): React.ReactPortal {
  const { className, children } = props;
  const [state] = useState(createElement);
  useEffect(() => {
    if (className) state.className = className;
    document.body.appendChild(state);

    return () => {
      document.body.removeChild(state);
    };
  }, []);

  return createPortal(children, state);
}

export default memo(ReactPortal);
