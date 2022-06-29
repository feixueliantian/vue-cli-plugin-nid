const appGenerator = require('./app/app.generator');
const componentGenerator = require('./component/component.generator');
const componentGeneratorHook = require('./component/component.generator.hook');

module.exports = (api, options) => {
  console.log(options);

  // 修改 package.json 文件，添加 scripts 命令
  appGenerator(api, options);

  // 生成组件文件和组件样式文件，如果指定了父组件，在父组件中引入子组件
  componentGenerator(api, options);
};

module.exports.hooks = (api, options) => {
  // 如果指定了父组件，在父组件中注册并使用子组件
  componentGeneratorHook(api, options);
};
