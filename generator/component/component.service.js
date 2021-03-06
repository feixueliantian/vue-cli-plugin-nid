const path = require('path');
const {
  getGeneratedFileImportPath,
  pascalCase,
} = require('../app/app.service');

/**
 * 获取组件模板文件路径
 */
const getTemplatePath = () => {
  const componentTemplatePath = path.join('.', 'templates', 'component.ejs');
  const styleTemplatePath = path.join('.', 'templates', 'component.style.ejs');

  return { componentTemplatePath, styleTemplatePath };
};

/**
 * 获取组件名称
 */
const getComponentName = (options) => {
  const { component: componentName } = options;
  const componentNamePascalCase = pascalCase(componentName);

  return { componentName, componentNamePascalCase };
};

/**
 * 获取组件导入声明
 */
const getComponentImportStatement = (options) => {
  const { componentNamePascalCase } = getComponentName(options);
  const componentImportPath = getGeneratedFileImportPath('component', options);

  return `import ${componentNamePascalCase} from '${componentImportPath}';`;
};

/**
 * 获取组件选项
 */
const getComponentOptions = (options) => {
  let { vuex = '' } = options;

  if (vuex === true) {
    vuex = 'mapGetters,mapMutations,mapActions';
  }

  if (typeof vuex === 'string') {
    vuex = vuex.split(',').join(', ');
  }

  options.mapGetters = vuex.includes('mapGetters');
  options.mapMutations = vuex.includes('mapMutations');
  options.mapActions = vuex.includes('mapActions');

  return {
    ...options,
    vuex,
  };
};

module.exports = {
  getTemplatePath,
  getComponentName,
  getComponentImportStatement,
  getComponentOptions,
};
