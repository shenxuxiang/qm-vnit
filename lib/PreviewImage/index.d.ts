import React from 'react';
import './index.less';
type IProps = {
    onClose: () => void;
    open: boolean;
    imgs: string[];
    index?: number;
    pageSize?: number;
    previewImgs?: string[];
    hasPerformance?: boolean;
};
/**
 * 图片预览功能组件
 * @param { open }           是否展示组件
 * @param { imgs }           图片列表
 * @param { index }          默认展示第几个图片，默认第一个
 * @param { onClose }        关闭组件的方法
 * @param { pageSize }       指定缩略图展示列表一页展示多少张图片
 * @param { previewImgs }    缩略图展示列表
 * @param { hasPerformance } 是否启动IMG性能优化方案
 */
declare function PreviewImage(props: IProps): React.JSX.Element | null;
declare const _default: React.MemoExoticComponent<typeof PreviewImage>;
export default _default;
