import React from 'react';
import './index.less';
export type FileList = {
    uid: string;
    name: string;
    url?: string;
    response?: any;
    percent?: number;
    rowSource?: File;
    status?: 'loading' | 'done' | 'error' | 'remove';
}[];
type UploadImageProps = {
    action: string;
    accept?: string;
    method?: string;
    value?: FileList;
    maxSize?: number;
    maxCount?: number;
    multiple?: boolean;
    disabled?: boolean;
    children?: React.ReactNode;
    onError?: (Error: any) => void;
    headers?: () => {
        [key: string]: any;
    };
    onChange?: (fileList: FileList) => void;
    onPreview?: (url: string, rawResource?: File) => void;
    renderItem?: (values: {
        url: string;
        uid: string;
        name: string;
    }) => React.ReactNode;
};
declare function UploadImage(props: UploadImageProps): React.JSX.Element;
declare const _default: React.MemoExoticComponent<typeof UploadImage>;
export default _default;
