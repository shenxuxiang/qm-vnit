import { Card } from 'antd';
import React, { memo } from 'react';
import MarkdownCode from '@/components/MarkdownCode';

type TemplateProps = {
  bodyStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  children: React.ReactNode;
  title: React.ReactNode;
  markdown?: any;
};

function Template(props: TemplateProps) {
  const { children, title, markdown, style, bodyStyle } = props;
  return (
    <Card style={{ margin: '20px 0 60px', ...style }}>
      <p style={{ margin: '0 0 20px', fontWeight: 'bold', fontSize: 15 }}>{title}</p>

      <div style={{ padding: '20px', background: '#f8f8f8', ...bodyStyle }}>{children}</div>
      {markdown ? <MarkdownCode code={markdown} /> : null}
    </Card>
  );
}

export default memo(Template);
