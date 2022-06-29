const path = require('path');
const { last } = require('lodash');

const getGeneratedFilePath = (fileType, options) => {
  /**
   * 1. --component comment
   *    -> src/comment/comment.vue
   *
   * 2. --component comment-index
   *    -> src/comment/index/comment-index.vue
   *
   * 3. --component comment-list --path comment/index/components
   *    -> src/comment/index/components/comment-list.vue
   */

  let typeOption = fileType;

  if (fileType === 'style') {
    typeOption = 'component';
  }

  const { [typeOption]: fileName, path: filePath } = options;

  let fileFullName;

  switch (fileType) {
    case 'component':
      fileFullName = `${fileName}.vue`;
      break;
    case 'style':
      fileFullName = path.join('styles', `${fileName}.css`);
      break;
  }

  const fileNameArray = fileName.split('-');
  const isMultiWordsFile = fileNameArray.length > 1;

  // 文件存放位置
  let fileFullPath = [];

  if (filePath) {
    // 3
    const filePathArray = filePath.split('/');
    fileFullPath = ['src', ...filePathArray, fileFullName];
  } else if (isMultiWordsFile) {
    // 2
    fileFullPath = ['src', ...fileNameArray, fileFullName];
  } else {
    // 1
    fileFullPath = ['src', fileName, fileFullName];
  }

  return path.join(...fileFullPath);
};

/**
 * 获取父辈文件路径
 */
const getParentFilePath = (fileType, options) => {
  // --parent comment/index/comment-index
  const { parent } = options;
  let fileExtension = '';

  switch (fileType) {
    case 'component':
      fileExtension = '.vue';
      break;
  }

  let parentFilePath = [];

  const parentArray = parent.split('/');
  // 返回数组最后一项
  const parentFileName = last(parentArray) + fileExtension;

  if (parentArray.length > 1) {
    parentArray.pop();
    parentFilePath = ['src', ...parentArray, parentFileName];
  } else {
    parentFilePath = ['src', parent, parentFileName];
  }

  return path.join(...parentFilePath);
};

/**
 * 获取父辈名字
 */
const getParentName = (options) => {
  // --parent comment/index/comment-index
  return last(options.parent.split('/'));
};

module.exports = { getGeneratedFilePath, getParentFilePath, getParentName };
