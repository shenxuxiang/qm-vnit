/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";
import { fileURLToPath } from 'url';
import process from 'process';
import path from 'path';

const __dirname = fileURLToPath(new URL('./', import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  // 注意，当我们动态修改 define 时，是无法注入到 import.meta.env 中的，
  // 但是 vite 会被注入到 globalThis 这个全局对象中。
  if (process.env.TEST_ENV) env.VITE_TEST_ENV = process.env.TEST_ENV;

  const define = Object.keys(env).reduce((memo, key) => {
    memo[key] = JSON.stringify(env[key]);
    return memo;
  }, {});

  return {
    mode,
    define,
    base: env.VITE_BASE_URL,
    plugins: [ react({ jsxRuntime: 'classic' }), legacy(), svgr() ],
    publicDir: path.resolve(__dirname, 'public'),
    resolve: {
      extensions: [ '.tsx', '.ts', '.jsx', '.js' ],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          globalVars: {},
          modifyVars: {},
          additionalData: '',
          javascriptEnable: true,
        }
      },
      devSourcemap: false
    },
    clearScreen: true,
    build: {
      cssMinify: true,
      minify: 'terser',
      emptyOutDir: true,
      cssCodeSplit: true,
      copyPublicDir: true,
      sourcemap: 'hidden',
      assetsInlineLimit: 10240,
      outDir: path.resolve(__dirname, 'dist'),
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          entryFileNames: 'static/js/[name][hash].js',
          chunkFileNames: 'static/js/[name][hash].chunk.js',
          assetFileNames(chunkInfo: any) {
            const { name } = chunkInfo;
            if (/\.(jpg|jpeg|png|webp|bmp|gif|svg)$/.test(name)) {
              return 'static/image/[name].[hash][extname]';
            } else if (/\.(woff2|woff|ttf|eot)$/.test(name)) {
              return 'static/font/[name].[hash][extname]';
            } else if (/\.css$/.test(name)) {
              return 'static/css/[name].[hash].css';
            } else {
              return 'static/[ext]/[name].[hash][extname]';
            }
          },
          manualChunks: {
            'vender-react': [ 'react', 'react-dom' ],
          }
        }
      }
    },
    server: {
      strictPort: true,
      host: env.VITE_HOST,
      open: env.VITE_BASE_URL,
      port: Number(env.VITE_PORT),
      proxy: {
        "/v1.0/file/upload": {
          // 界首农业保险测试环境
          target: 'http://192.168.5.17:30042',
          changeOrigin: true,
        },
      },
      cors: true,
    },
    test: {
      testTimeout: 120000,
      reporters: 'verbose',
      environment: 'happy-dom',
      css: { include: [ /.+/ ] },
      browser: process.env.TEST_ENV === 'browser' ? {
        api: {
          strictPort: true,
          host: env.VITE_HOST,
          open: env.VITE_BASE_URL,
          port: Number(env.VITE_PORT),
        },
        enabled: true,
        name: 'chrome',
        headless: true,
        isolate: true,
        fileParallelism: false,
        provider: 'webdriverio',
      } : undefined,
      // 测试覆盖率报告设置
      coverage: {
        // 报告中是否包含所有文件（没有被测试的文件也将被包含在内）
        all: false,
        // 每次测试之前都将清楚之前的测试结果
        clean: true,
        // 是否启用测试覆盖率报告
        enabled: true,
        include: [ 'src/lib', 'src/utils' ],
        // 引擎，浏览器模式时 provider 只能使用 istanbul
        provider: process.env.TEST_ENV === 'browser' ? 'istanbul' : 'v8',
      },
      // setup 文件的路径。它们将运行在每个测试文件之前。
      setupFiles: [ 'vitest-setup.ts', 'vitest-setup-mockService.ts', 'vitest-setup-configure.ts' ],
      //  对指定的文件进行单元测试，.browser.test.tsx? 表示要在浏览器模式下进行测试的文件
      include: process.env.TEST_ENV === 'browser' ?
        [ 'test/**/*.browser.test.ts(x)?' ] :
        [ 'test/**/*.test.ts(x)?' ],
      exclude: [
        // 'test/uploadFile.browser.test.tsx',
        // 'test/uploadAudio.browser.test.tsx',
        // 'test/uploadVideo.browser.test.tsx',
        // 'test/uploadImage.browser.test.tsx',
        // 'test/superPreviewImage.browser.test.tsx',
        // 'test/previewImage.browser.test.tsx',
        // 'test/contentFormHeader.browser.test.tsx',
        // 'test/contentFormTable.browser.test.tsx',
        // 'test/Image.browser.test.tsx',
        // 'test/Icon.browser.test.tsx',
        // 浏览器模式时只测试 .browser.test.ts(x)? 结尾的文件
        process.env.TEST_ENV !== 'browser' ? 'test/**/*.browser.test.ts(x)?' : '',
      ],
    }
  };
})
