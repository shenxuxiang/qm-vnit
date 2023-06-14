import { loadEnv, defineConfig } from 'vite';
import path from 'path';
import postcssPresetEnv from 'postcss-preset-env';
import libcss from 'vite-plugin-libcss';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const define = Object.keys(env).reduce((memo: object, key: string) => {
    memo[key] = JSON.stringify(env[key]);
    return memo;
  }, {});

  return {
    mode,
    define,
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        '@': path.resolve('src'),
      }
    },
    css: {
      poscss: {
        plugins: [ postcssPresetEnv ],
      },
      preprocessorOptions: {
        less: {
          globalVars: {},
          modifyVars: {},
          additionalData: '',
          javascriptEnable: true,
        }
      },
      devSourcemap: true,
    },
    plugins: [ libcss({}) ],
    build: {
      outDir: 'lib',
      emptyOutDir: true,
      sourcemap: 'hidden',
      copyPublicDir: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        }
      },
      cssMinify: true,
      cssCodeSplit: true,
      assetsInlineLimit: 4 * 1024,
      assetsDir: 'assets',
      lib: {
        entry: path.resolve('src/lib/index'),
        name: 'vnit',
        fileName: 'qm-vnit',
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'antd'],
        output: {
          globals: {
            'antd': 'antd',
            'react': 'react',
            'react-dom': 'react-dom',
          }
        },
      },
    },
  };
})
