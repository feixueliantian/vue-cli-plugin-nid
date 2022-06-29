const {
  getGeneratedFilePath,
  getParentFilePath,
} = require('../app/app.service');
const {
  getTemplatePath,
  getComponentName,
  getComponentImportStatement,
} = require('./component.service');

const componentGenerator = (api, options) => {
  if (!options.component) return;

  // 组件的存放位置
  const generatedComponentPath = getGeneratedFilePath('component', options);

  // 组件样式表的存放位置
  const generatedStylePath = getGeneratedFilePath('style', options);

  // 模板路径
  const { componentTemplatePath, styleTemplatePath } = getTemplatePath();

  // 组件名
  const { componentName, componentNamePascalCase } = getComponentName(options);

  // 生成组件文件和组件样式文件
  api.render(
    {
      [generatedComponentPath]: componentTemplatePath,
      [generatedStylePath]: styleTemplatePath,
    },
    {
      componentName,
      componentNamePascalCase,
    },
  );

  // 如果指定了父组件，则在父组件中 import 该组件
  if (options.parent) {
    const componentImportStatement = getComponentImportStatement(options);
    const parentComponentPath = getParentFilePath('component', options);

    api.injectImports(parentComponentPath, componentImportStatement);
  }
};

module.exports = componentGenerator;
