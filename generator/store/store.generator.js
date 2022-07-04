const { getStoreTemplatePath } = require('./store.service');

const storeGenerator = (api, options) => {
  if (!options.store) return;

  const getStoreTemplatePath = getStoreTemplatePath();
};

module.exports = storeGenerator;
