import React from 'react';
import { UploadFile } from 'antd';
type UploadImageProps = {
    action: string;
    accept?: string;
    maxSize?: number;
    maxCount?: number;
    multiple?: boolean;
    disabled?: boolean;
    value?: UploadFile[];
    uploadButtonText?: string;
    headers?: {
        [propName: string]: string;
    };
    onChange?: (fileList: UploadFile[]) => void;
    onPreview?: (file: UploadFile) => void;
    listType?: 'text' | 'picture' | 'picture-card' | 'picture-circle';
};
/**
 * 图片上传组件
 * @param action           上传的路径
 * @param accept           指定上传的文件类型
 * @param headers          上传时携带的请求头
 * @param maxCount         最多可以上传多少个图片，0 表示不限制
 * @param multiple         是否支持多张图片上传
 * @param maxSize          限制图片的大小，0 表示不限制
 * @param value            可控，组件回显，也可用 Form 表单控件
 * @param onChange         可控，value 变化的回调函数，也可用 Form 表单控件
 * @param disabled         是否禁用该功能
 * @param uploadButtonText 上传按钮的文案
 * @param listType         上传列表的内建样式，支持四种基本样式 text, picture, picture-card 和 picture-circle
 * @param onPreview        预览功能
 */
declare function UploadImage(props: UploadImageProps): React.JSX.Element;
declare const _default: React.MemoExoticComponent<typeof UploadImage>;
export default _default;
