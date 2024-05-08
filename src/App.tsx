import { unstable_HistoryRouter as Router } from 'react-router-dom';
import React, { useEffect } from 'react';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import history from '@/utils/history';
import Routers from '@/routers';
import 'dayjs/locale/zh-cn';

export default function App() {
  useEffect(() => {
    let serviceWorker: any;

    // 启动 mock service worker
    async function mocking() {
      const { worker: serviceWorker } = await import('./mock/browser');

      return serviceWorker.start({
        // 对于未处理的请求，不打印任何内容
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          // mockServiceWorker.js 文件的访问路径
          url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
        },
      });
    }

    if (!import.meta.env.prod && import.meta.env.VITE_ENABLE_MOCKING === 'true') mocking();

    // 在项目卸载之前关闭数据 mock。否则会一直开启，并拦截所有的请求。
    return () => serviceWorker?.stop?.();
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <Router history={history as any} basename={import.meta.env.BASE_URL}>
        <Routers />
      </Router>
    </ConfigProvider>
  );
}
