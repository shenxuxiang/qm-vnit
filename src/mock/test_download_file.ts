import { HttpResponse } from 'msw';
import { mockHttp, readTextToArrayBuffer } from './utils';

export default mockHttp.post('/test/download/file', async () => {
  const body = await readTextToArrayBuffer('hello world');

  return HttpResponse.arrayBuffer(body, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename=__default_file',
    },
  }) as any;
});
