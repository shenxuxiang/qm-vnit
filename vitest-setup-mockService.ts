import { beforeAll, afterAll } from 'vitest';

let mockServiceWorker: any = null;
let mockServiceServer: any = null;

async function browserMocking() {
  const { worker: mockServiceWorker } = await import('./src/mock/browser');
  return mockServiceWorker.start({
    // 对于未处理的请求，不打印任何内容
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      // mockServiceWorker.js 文件的访问路径
      url: `${import.meta.env.VITE_BASE_URL}mockServiceWorker.js`,
    },
  });
};

async function nodejsMocking() {
  const { server: mockServiceServer } = await import('./src/mock/server');
  mockServiceServer.listen();
}

beforeAll(async () => {
  // @ts-ignore
  if (globalThis.VITE_TEST_ENV === 'browser') await browserMocking();
  // @ts-ignore
  if (globalThis.VITE_TEST_ENV === 'nodejs') await nodejsMocking();
});

afterAll(() => {
  mockServiceWorker?.stop();
  mockServiceServer?.close();
});
