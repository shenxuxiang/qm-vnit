import React, { memo, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
// import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
// @ts-ignore
import coyWithoutShadows from 'react-syntax-highlighter/dist/esm/styles/prism/coy-without-shadows';
import remarkGfm from 'remark-gfm';
import { Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import classes from './index.module.less';
// import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
// import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
// import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';

// SyntaxHighlighter.registerLanguage('js', javascript);
// SyntaxHighlighter.registerLanguage('jsx', jsx);
// SyntaxHighlighter.registerLanguage('tsx', tsx);

const theme = {
  dark: darcula,
  light: coyWithoutShadows,
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
        const { className, children, ...rest } = values;
        const match = /language-(\w+)/.exec(className || '');

        return match ? (
          <SyntaxHighlighter {...rest} PreTag="div" showLineNumbers style={theme[mode]} language={match[1]}>
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        ) : (
          <code {...rest} className={className}>
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
