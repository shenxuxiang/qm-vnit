import type { PreviewImageProps } from './PreviewImage';
import type { MemoExoticComponent, FunctionComponent } from 'react';
import type { SuperPreviewImageProps } from './SuperPreviewImage';
type CompositeType = MemoExoticComponent<FunctionComponent<PreviewImageProps>> & {
    SuperPreviewImage: MemoExoticComponent<FunctionComponent<SuperPreviewImageProps>>;
};
declare const PreviewImage: CompositeType;
export default PreviewImage;
