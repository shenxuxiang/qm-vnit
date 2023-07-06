import React, { memo, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula, coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import classes from './index.module.less';

const theme = {
  light: coldarkCold,
  dark: dracula,
};

type MarkdownProps = {
  code: any;
  mode?: 'light' | 'dark';
  defaultExpand?: boolean;
  hasExpandButton?: boolean;
};

function Markdown(props: MarkdownProps) {
  const { code, mode = 'light', defaultExpand = false, hasExpandButton = true } = props;
  const [expand, setExpand] = useState(defaultExpand);

  const handleClickExpand = () => {
    setExpand((expand) => !expand);
  };

  const components = useMemo(() => {
    return {
      // eslint-disable-next-line
      code(values: any) {
        const { node, inline, className, children, ...props } = values;
        const match = /language-(\w+)/.exec(className || '');
        return !inline && match ? (
          <SyntaxHighlighter
            {...props}
            PreTag="div"
            style={theme[mode]}
            language={match[1]}
            children={String(children).replace(/\n$/, '')}
          />
        ) : (
          <code {...props} className={className}>
            {children}
          </code>
        );
      },
    };
  }, [mode]);

  return (
    <div className={classes.x}>
      {expand && <ReactMarkdown children={code} remarkPlugins={[remarkGfm]} components={components} />}
      {hasExpandButton && (
        <p className={classes.expand_button}>
          <Button type="link" onClick={handleClickExpand}>
            {expand ? '收起' : '展开'} code{' '}
            <DownOutlined className={`${classes.icon}${expand ? ' ' + classes.expand : ''}`} />
          </Button>
        </p>
      )}
    </div>
  );
}

export default memo(Markdown);
