import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import less from 'gulp-less';
import babel from 'gulp-babel';
import clean from 'gulp-clean';
import through from 'through2';
import filter from 'gulp-filter';
import postcss from 'gulp-postcss';
import { fileURLToPath } from 'url';
import cssBase64 from 'gulp-css-base64';
import child_process from 'child_process';
import buildRollup from './config/rollup.config.lib.js';

const assetInlineLimit = 10 * 1024;
const context = fileURLToPath(new URL('./', import.meta.url));

/**
 * CSS 静态资源处理
 * this.assetInlineLimit 表示对内联资源大小的限制。
 * 只处理体积大于 assetInlineLimit 的资源，通过 outputCssAssets() 输出到文件系统；
 * handle() 用来收集资源。
 */
class CssAssetsProcessor {
  constructor(assetInlineLimit = 10 * 1024) {
    // 内联文件的大小，超过的
    this.assetInlineLimit = assetInlineLimit;
    this.assets = new Set();
  }

  handle(url, base) {
    try {
      const { pathname, protocol } = new URL(path.resolve(base, url));

      const stat = fs.statSync(protocol + pathname);
      if (stat.size > this.assetInlineLimit) this.assets.add(protocol + pathname);
    } catch (err) {
      console.log(err);
    }
  }

  outputCssAssets = (callback) => {
    if (this.assets.size <= 0) return callback();

    return gulp.src([...this.assets], { base: 'src/lib', allowEmpty: true })
      .pipe(gulp.dest('es'))
      .pipe(gulp.dest('lib'));
  }
}

const cssAssetsProcessor = new CssAssetsProcessor(assetInlineLimit);

function cleanOutDir() {
  return gulp.src(
    [path.resolve(context, 'lib'), path.resolve(context, 'es')],
    { read: false, allowEmpty: true })
    .pipe(clean({ force: true }));
}

// 打包构建 ESM 模块，这里使用的 rollup 工具进行构建
async function buildEs() {
  await buildRollup();
}

// 打包构建 commonjs 模块
function buildLib () {

  // 过滤掉不匹配的文件，restore 表示存储那些被过滤的文件。
  // 使用 .pipe(filterJS.restore) 将再次将背过滤的文件添加到流中。
  const filterJS = filter((file) => file.extname === '.js', { restore: true });

  return gulp.src('es/**/*')
    .pipe(filterJS)
    .pipe(through.obj(
      function(chunk, _, callback) {
        if (/\.(png|jpg|jpeg|gif|webp|bmp|svg)\.js$/.test(chunk.path)) return callback(null, chunk);

        let contents = chunk.contents.toString();
        const match = /import {(.+)} from (['"])@ant-design\/icons\2/.exec(contents);
        if (match) {
          const result = [];
          const values = match[1];
          const matches = values.matchAll(/\b([^\s,]+)\b/g);
          for (let item of matches) result.push(item[1]);

          let context = '';
          result.forEach(item => context += `import ${item} from '@ant-design/icons/${item}';`);

          contents = contents.replace(/import .* from (['"])@ant-design\/icons\1;/, context);
          chunk.contents = Buffer.from(contents);
        }

        callback(null, chunk);
      }
    ))
    .pipe(babel({ configFile: './babel.config.lib.cjs' }))
    .pipe(filterJS.restore)
    .pipe(gulp.dest('./lib'));
}

// 执行有关生成 .d.ts 文件相关的任务
const tscTask = gulp.series(
  function () {
    return child_process.exec('npx tsc -p tsconfig.lib.json');
  },
  function () {
    return gulp.src([ 'dts/**/*.d.ts' ])
      .pipe(through.obj(
        function(chunk, _, callback) {
          const newBase = path.join(chunk.base, 'lib');
          if (chunk.path.startsWith(newBase)) chunk.base = newBase;

          return callback(null, chunk);
        }
      ))
      .pipe(gulp.dest('lib'))
      .pipe(gulp.dest('es'));
  },
  function () {
    return gulp.src(path.resolve(context, 'dts'), { read: false, allowEmpty: true })
      .pipe(clean({ force: true }));
  }
);

// 生成样式、以及相关的资源
function buildStyleSteet() {
  const assetPattern = /url\(['"]?((?:\.{1,2}|@|[a-zA-Z]*)?(?:\/[^\s\)]*)*\.(?:png|jpg|jpeg|gif|webp|bmp|svg|ttf|woff|woff2|eot)(?:\?[^\s\'")]*)?)['"]?\)/g;

  return gulp.src([ 'src/lib/**/*less' ])
    .pipe(less())
    .pipe(gulp.src([ 'src/lib/**/*.css' ]))
    .pipe(through.obj(function(chunk, _, callback) {
      // 处理 CSS 文件中通过 url(...) 引入的资源
      const contents = chunk.contents.toString();
      // 匹配内容，length <= 0 表示没有匹配到资源、
      const matches = [...contents.matchAll(assetPattern)];
      if (matches.length <= 0) return callback(null, chunk);

      let newContents = '';
      let length = matches.length;

      while (length--) {
        const item = matches[length];
        let content = item[1];

        // 处理通过路径别名引入的资源。 url(@/lib/...)
        if (content.startsWith('@/lib')) {
          content = content.replace('@/lib', 'src/lib');
          // 将路径别名转换成相对路径
          content = path.relative(chunk.dirname, path.resolve(context, content));
        }

        // 在 windows 系统中路径分隔符使用的是 '\'。
        content = content.replace(/\\/g, '/');

        // 完成内容的替换
        newContents = contents.slice(0, item.index);
        newContents += `url(${content})`;
        newContents += contents.slice(item[0].length + item.index);

        cssAssetsProcessor.handle(content, chunk.dirname);
      }

      chunk.contents = Buffer.from(newContents);

      callback(null, chunk);
    }))
    .pipe(postcss())
    .pipe(cssBase64({ maxWeightResource: assetInlineLimit }))
    .pipe(gulp.dest('es'))
    .pipe(gulp.dest('lib'));
}

export default gulp.series(cleanOutDir, buildEs, buildLib, tscTask, buildStyleSteet, cssAssetsProcessor.outputCssAssets);
