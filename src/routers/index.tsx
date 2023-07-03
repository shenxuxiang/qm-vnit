import React, { memo } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import LazyLoader from '@/components/LazyLoader';
import Library from '@/pages/library';

export const menuItems = [
  { key: 'content-form-head', label: 'ContentFormHead 表单查询' },
  { key: 'content-form-page', label: 'ContentFormPage 表格页面' },
  { key: 'model-tree', label: 'ModelTree 模型树' },
  { key: 'preview-image', label: 'PreviewImage 图片预览' },
  { key: 'upload-file', label: 'UploadFile 文件上传' },
  { key: 'upload-video', label: 'UploadVideo 视频上传' },
  { key: 'upload-audio', label: 'UploadAudio 音频上传' },
  { key: 'upload-image', label: 'UploadImage 图片上传' },
  { key: 'icon', label: 'Icon 图标' },
];

function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/home" />,
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/home',
          element: React.createElement(LazyLoader(() => import(`@/pages/home`))),
        },
        {
          path: '/library',
          element: <Library />,
          children: [
            {
              path: `/library/`,
              element: <Navigate to="/library/content-form-head" />,
            },
            {
              path: `/library/content-form-head`,
              element: React.createElement(LazyLoader(() => import('../pages/library/content-form-head'))),
            },
            {
              path: `/library/content-form-page`,
              element: React.createElement(LazyLoader(() => import('../pages/library/content-form-page'))),
            },
            {
              path: `/library/model-tree`,
              element: React.createElement(LazyLoader(() => import('../pages/library/model-tree'))),
            },
            {
              path: `/library/preview-image`,
              element: React.createElement(LazyLoader(() => import('../pages/library/preview-image'))),
            },
            {
              path: `/library/upload-file`,
              element: React.createElement(LazyLoader(() => import('../pages/library/upload-file'))),
            },
            {
              path: `/library/upload-video`,
              element: React.createElement(LazyLoader(() => import('../pages/library/upload-video'))),
            },
            {
              path: `/library/upload-audio`,
              element: React.createElement(LazyLoader(() => import('../pages/library/upload-audio'))),
            },
            {
              path: `/library/upload-image`,
              element: React.createElement(LazyLoader(() => import('../pages/library/upload-image'))),
            },
            {
              path: `/library/icon`,
              element: React.createElement(LazyLoader(() => import('../pages/library/icon'))),
            },
          ],
        },
      ],
    },
  ]);
}

export default memo(Router);
