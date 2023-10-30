import _default from './PreviewImage';
import SuperPreviewImage from './SuperPreviewImage';
import type { PreviewImageProps } from './PreviewImage';
import { MemoExoticComponent, FunctionComponent } from 'react';
import type { SuperPreviewImageProps } from './SuperPreviewImage';

type CompositeType = MemoExoticComponent<FunctionComponent<PreviewImageProps>> & {
  SuperPreviewImage: MemoExoticComponent<FunctionComponent<SuperPreviewImageProps>>;
};

const PreviewImage = _default as CompositeType;
PreviewImage.SuperPreviewImage = SuperPreviewImage;

export default PreviewImage;
