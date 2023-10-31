import React, { memo } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import LazyLoader from '@/components/LazyLoader';
import Library from '@/pages/library';

export const menuItems = [
  {
    type: 'group',
    label: '表格相关',
    children: [
      { key: 'content-form-header', label: 'ContentFormHeader 表单查询' },
      { key: 'content-form-table', label: 'ContentFormTable 表格页面' },
    ],
  },
  { type: 'divider' },
  {
    type: 'group',
    label: '图像展示',
    children: [
      { key: 'icon', label: 'Icon 图标' },
      { key: 'image', label: 'Image 图像' },
      { key: 'preview-image', label: 'PreviewImage 图片预览' },
    ],
  },
  { type: 'divider' },
  {
    type: 'group',
    label: '上传功能',
    children: [
      { key: 'upload-video', label: 'UploadVideo 视频上传' },
      { key: 'upload-audio', label: 'UploadAudio 音频上传' },
      { key: 'upload-image', label: 'UploadImage 图片上传' },
      { key: 'upload-file', label: 'UploadFile 文件上传' },
    ],
  },
  { type: 'divider' },
  {
    type: 'group',
    label: '数据选项',
    children: [{ key: 'model-tree', label: 'ModelTree 模型树' }],
  },
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
              element: <Navigate to="/library/content-form-header" />,
            },
            {
              path: `/library/content-form-header`,
              element: React.createElement(LazyLoader(() => import('../pages/library/content-form-header'))),
            },
            {
              path: `/library/content-form-table`,
              element: React.createElement(LazyLoader(() => import('../pages/library/content-form-table'))),
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
            {
              path: `/library/image`,
              element: React.createElement(LazyLoader(() => import('../pages/library/image'))),
            },
          ],
        },
      ],
    },
  ]);
}

export default memo(Router);
