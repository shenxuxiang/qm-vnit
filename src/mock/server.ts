/**
 * 在 NodeJS 端实现数据 Mock
 * 本服务只适用于单元测试（NodeJS 模拟的浏览器环境）
 */

import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
import { readTextToArrayBuffer } from './utils';

export const server = setupServer(
  http.post('/test/status/401', () => {
    return HttpResponse.json({}, { status: 401 });
  }),
  http.get('/test/code/401', () => {
    return HttpResponse.json({ code: 401 });
  }),
  http.get('/test/code/0', () => {
    return HttpResponse.json({ code: 0, data: true, message: '' });
  }),
  http.get('/test/download/file', async () => {
    const body = await readTextToArrayBuffer('hello world');
    return HttpResponse.arrayBuffer(body, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename=__default_file',
      },
    });
  }),
);
