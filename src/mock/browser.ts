/**
 * 开发阶段，用于模拟后端接口
 * 单元测试，用于模拟后端接口（注意，这里只适用于浏览器模式。对于 NodeJS 模拟的浏览器环境请使用 ./server.ts）
 * 在开发阶段、单元测试时与本地启动的服务保持相同的源，所以在接口调试时不存在跨域的问题
 */

import { setupWorker } from 'msw/browser';
import test_upload_file from './test_upload_file';
import test_download_file from './test_download_file';
import test_contentFormTable_list from './test_content-form-table_list';

export const worker = setupWorker(test_contentFormTable_list(), test_download_file(), test_upload_file());
