import React from 'react';
import './index.less';
export type SuperPreviewImageProps = {
    open: boolean;
    imgs: {
        url: string;
        hdUrl: string;
    }[];
    index?: number;
    pageSize?: number;
    previewImgs?: string[];
    hasPerformance?: boolean;
    onClose: (indictor: number) => void;
};
/**
 * 图片预览功能组件
 * @param { open }           是否展示组件
 * @param { imgs }           图片列表
 * @param { index }          默认展示第几个图片，默认第一个
 * @param { onClose }        关闭组件的方法
 * @param { pageSize }       指定缩略图展示列表一页展示多少张图片
 */
declare function SuperPreviewImage(props: SuperPreviewImageProps): React.JSX.Element | null;
declare const _default: React.MemoExoticComponent<typeof SuperPreviewImage>;
export default _default;
