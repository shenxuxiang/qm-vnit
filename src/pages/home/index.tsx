import React, { memo } from 'react';
import classes from './index.module.less';
import vnitLogo from '@/assets/images/vnit-logo.svg';
import MarkdownCode from '@/components/MarkdownCode';

const advantage = `
  ## ✨ 特性
  - 🌈 提炼自企业级中后台产品的交互语言和视觉风格。
  >
  - 📦 开箱即用的高质量 React 组件。
  >
  - 🛡 使用 TypeScript 开发，提供完整的类型定义文件。
  >
  - 🌍 支持 antd 所有的国际化语言支持。
  >
  - 🎨 支持 andt 主题定制能力。
  >
`;

const install = `
  ## 安装
  使用 npm 或 yarn 或 pnpm 安装
  >
  我们推荐使用 npm 或 yarn 或 pnpm 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。
  ~~~bash
    yarn add qm-vnit

    npm install --save qm-vnit
  ~~~
`;

const dependence = `
  ## 依赖
  - qm-vnit 开发依赖于 antd、@ant-design、react、react-dom 这些库。
  >
  - 生产构建时需要 @babel/runtime-corejs3、以及 core-js 这些标准的 js 库来完成代码的转换。
  >
`;

const theme = `
  ## 主题设置
  qm-vnit 安全支持 antd 的主题设置功能。

  ~~~js
  // 入口文件
  import zhCN from 'antd/es/locale/zh_CN';
  import { ConfigProvider } from 'antd';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';

  dayjs.locale('zh-cn');

  const theme = {
    token: { colorPrimary: '#00b96b' }
  };

  root.render(
    <ConfigProvider theme={theme}>
      ...
    </ConfigProvider>,
  );
  ~~~
`;

const language = `
  ## 语言设置
  qm-vnit 安全支持 antd 的所有国际化语言设置。

  ~~~js
  // 入口文件
  import zhCN from 'antd/es/locale/zh_CN';
  import { ConfigProvider } from 'antd';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';

  dayjs.locale('zh-cn');

  root.render(
    <ConfigProvider locale={zhCN}>
      ...
    </ConfigProvider>,
  );
  ~~~
`;

const dynamicImport = `
  ## 按需加载
  qm-vnit 默认支持基于 ES modules 的 tree shaking。
`;

const ts = `
  ## TypeScript
  qm-vnit 使用 TypeScript 进行书写并提供了完整的定义文件。（不要引用 @types/qm-vnit)
`;

function Page() {
  return (
    <div className={classes.page}>
      <div className={classes.content}>
        <h1 className={classes.title}>qm-vnit</h1>
        <p>qm-vnit 是一款基于 antd 研发的 React 业务组件库</p>
        <div className={classes.img_icon_group}>
          <img className={classes.img_icon} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
          <span className={classes.img_icon_plus}>＋</span>
          <img
            className={classes.img_icon}
            src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
          />
          <span className={classes.img_icon_plus}>＋</span>
          <img className={classes.img_icon} src={vnitLogo} />
        </div>

        <MarkdownCode code={advantage} hasExpandButton={false} defaultExpand />
        <br />
        <MarkdownCode code={install} hasExpandButton={false} defaultExpand />
        <br />
        <MarkdownCode code={dependence} hasExpandButton={false} defaultExpand />
        <br />
        <MarkdownCode code={theme} hasExpandButton={false} defaultExpand />
        <br />
        <MarkdownCode code={language} hasExpandButton={false} defaultExpand />
        <br />
        <MarkdownCode code={dynamicImport} hasExpandButton={false} defaultExpand />
        <br />
        <MarkdownCode code={ts} hasExpandButton={false} defaultExpand />
        <div className={classes.module}>
          <h2 className={classes.subtitle}>贡献者</h2>
          <div className={classes.contribute_x}>
            <a href="https://github.com/shenxuxiang?tab=repositories" className={classes.contribute} target="_blank">
              <img
                src="https://avatars.githubusercontent.com/u/26295295?v=4"
                alt="avatar"
                className={classes.contribute_avator}
              />
            </a>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default memo(Page);
