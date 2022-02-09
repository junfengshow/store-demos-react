const webpack = require('webpack');
const config = require('./webpack.config.js')
const compiler = webpack(config)

compiler.run((err, stats) => {
  console.log('编译开始')
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }
  const str = stats.toString({
    // 增加控制台颜色开关
    colors: true,
    assets: true,
    // 通过对应的 bundle 显示入口起点
    entrypoints: false,
    // 添加 --env information
    env: false,
  });
  console.log(str);
  console.log('编译完成');
})
