import { HttpResponse, delay } from 'msw';
import { mockHttp } from './utils';

export default mockHttp.post('/test/upload/file', async ({ request }) => {
  const format = await request.formData();
  const filename = (format.get('file') as File).name;

  await delay(1000);

  return HttpResponse.json({ code: 0, message: 'ok', data: { path: filename } });
});
