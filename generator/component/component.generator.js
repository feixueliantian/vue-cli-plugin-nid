const { getGeneratedFilePath } = require('../app/app.service');

const componentGenerator = (api, options) => {
  if (!options.component) return;

  const generatedComponentPath = getGeneratedFilePath('component', options);
  console.log(generatedComponentPath);
};

module.exports = componentGenerator;
