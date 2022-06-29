const componentGenerator = (api, options) => {
  if (!options.component) return;

  api.render({
    // 生成文件的位置：cli项目里面对应的文件
    'src/components/demo.vue': './templates/component.ejs',
  });
};

module.exports = componentGenerator;
