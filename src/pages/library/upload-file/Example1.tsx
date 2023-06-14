import React, { memo, useCallback } from 'react';
import MarkdownCode from '@/components/MarkdownCode';
import { Card } from 'antd';
import { UploadFile } from '@/lib';

function Example() {
  const onChange = useCallback((files: any) => {
    console.log(files);
  }, []);

  const onPreview = useCallback((file: any) => {
    console.log(file);
    const url = window.URL.createObjectURL(file.originFileObj);
    window.open(url, '_blank');
    window.URL.revokeObjectURL(url);
  }, []);

  return (
    <Card style={{ margin: '20px 0 60px' }}>
      <div style={{ padding: '0 0 20px', background: '#fff' }}>
        <UploadFile
          accept="*"
          maxCount={2}
          listType="text"
          onChange={onChange}
          action="/upload/file"
          onPreview={onPreview}
        />
      </div>
      <MarkdownCode code={code} />
    </Card>
  );
}

export default memo(Example);

const code = `
~~~js
import React, { memo, useCallback } from 'react';
import { UploadFile } from 'qm-vnit';

function Example() {
  const onChange = useCallback((files: any) => {
    console.log(files);
  }, []);

  const onPreview = useCallback((file: any) => {console.log(file);
    const url = window.URL.createObjectURL(file.originFileObj);
    window.open(url, '_blank');
    window.URL.revokeObjectURL(url);
  }, []);

  return (
    <div style={{ padding: '0 0 20px', background: '#fff' }}>
      <UploadFile
        accept="*"
        maxCount={2}
        listType='text'
        onChange={onChange}
        action="/upload/file"
        onPreview={onPreview}
      />
    </div>
  );
}

export default memo(Example);
~~~
`;
