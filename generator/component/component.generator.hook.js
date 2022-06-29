const { EOL } = require('os');
const fs = require('fs');
const {
  getParentFilePath,
  getProjectFileContent,
  insertFileContent,
  getParentName,
} = require('../app/app.service');
const { getComponentName } = require('./component.service');

const componentGeneratorHook = (api, options) => {
  api.afterInvoke(() => {
    if (!options.component || !options.parent) return;

    const parentComponentPath = getParentFilePath('component', options);
    let parentFileContent = getProjectFileContent(parentComponentPath, api);

    // 在父组件的 components 属性中注册子组件
    const findComponentsOptions = 'components: {';
    const { componentNamePascalCase } = getComponentName(options);
    const insertComponentsOptionsContent = `${EOL}    ${componentNamePascalCase}`;

    parentFileContent = insertFileContent({
      fileContent: parentFileContent,
      find: findComponentsOptions,
      insert: insertComponentsOptionsContent,
    });

    // 在父组件的模板里面使用子组件
    const parentComponentName = getParentName(options);
    const findWrapperElement = `<div class="${parentComponentName}">`;
    const insertWrapperElementContent = `${EOL}    <${componentNamePascalCase} />`;

    parentFileContent = insertFileContent({
      fileContent: parentFileContent,
      find: findWrapperElement,
      insert: insertWrapperElementContent,
    });

    // 向父组件中覆盖写入内容
    fs.writeFileSync(
      api.resolve(parentComponentPath),
      parentFileContent.join(EOL),
      {
        encoding: 'utf-8',
      },
    );
  });
};

module.exports = componentGeneratorHook;
