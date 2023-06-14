import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MarkdownProps = {
  children: any;
};

function Markdown(props: MarkdownProps) {
  const { children } = props;

  return <ReactMarkdown children={children} remarkPlugins={[remarkGfm]} />;
}

export default memo(Markdown);
