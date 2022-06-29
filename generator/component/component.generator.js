const { getGeneratedFilePath } = require('../app/app.service');
const { getTemplatePath } = require('./component.service');

const componentGenerator = (api, options) => {
  if (!options.component) return;

  // 组件的存放位置
  const generatedComponentPath = getGeneratedFilePath('component', options);

  // 组件样式表的存放位置
  const generatedStylePath = getGeneratedFilePath('style', options);

  // 模板路径
  const { componentTemplatePath, styleTemplatePath } = getTemplatePath();

  api.render({
    [generatedComponentPath]: componentTemplatePath,
    [generatedStylePath]: styleTemplatePath,
  });
};

module.exports = componentGenerator;
