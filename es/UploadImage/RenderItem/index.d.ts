import React from 'react';
import './index.less';
type RenderItemProps = {
    uid: string;
    url?: string;
    name: string;
    action: string;
    response?: any;
    method?: string;
    percent?: number;
    disabled?: boolean;
    rawResource?: File;
    onRemove?: (uid: string) => void;
    headers?: () => {
        [key: string]: any;
    };
    onError?: (uid: string, error: any) => void;
    onSuccess?: (uid: string, res: any) => void;
    status?: 'loading' | 'done' | 'error' | 'remove';
    onPreview?: (url: string, rawResource?: File) => void;
    renderItem?: (values: {
        url: string;
        uid: string;
        name: string;
    }) => React.ReactNode;
};
declare function RenderItem(props: RenderItemProps): React.JSX.Element;
declare const _default: React.MemoExoticComponent<typeof RenderItem>;
export default _default;
