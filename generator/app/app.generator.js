const appGenerator = (api, options) => {
  // api 是 generator 提供的 api
  // 修改 package.json 文件
  api.extendPackage({
    scripts: {
      'generate:component': 'vue invoke vue-cli-plugin-nid --component',
      'generate:store': 'vue invoke vue-cli-plugin-nid --store',
      gc: 'vue invoke vue-cli-plugin-nid --component',
      gs: 'vue invoke vue-cli-plugin-nid --store',
    },
  });
};

module.exports = appGenerator;
