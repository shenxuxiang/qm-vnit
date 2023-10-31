import React from 'react';
import type { FileList } from '@/lib/UploadImage';
export type { FileList } from '@/lib/UploadImage';
import './index.less';
type UploadVideoProps = {
    action: string;
    accept?: string;
    method?: string;
    value?: FileList;
    maxSize?: number;
    maxCount?: number;
    multiple?: boolean;
    disabled?: boolean;
    onError?: (error: any) => void;
    headers?: () => {
        [key: string]: any;
    };
    onChange?: (fileList: FileList) => void;
};
declare function UploadVideo(props: UploadVideoProps): React.JSX.Element;
declare const _default: React.MemoExoticComponent<typeof UploadVideo>;
export default _default;
