const path = require('path');
const fs = require('fs');

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: '',
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            esModule: false,
            name: '[name].[ext]',
          },
        }],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
          'extract-loader',
          {
            loader: 'html-loader',
            options: {
              preprocessor: processHtmlLoader,
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3000,
    open: true,
    hot: true,
  },
};

/**
 * recursively replace contents
 * @param {string} content original content
 * @param {LoaderContext} loaderContext loader context
 * @param {string} resourcePath resource path
 * @return {string} replaced content
 */
function processNestedHtml(content, loaderContext, resourcePath = '') {
  let fileDir = (resourcePath === '') ?
    path.dirname(loaderContext.resourcePath) :
    path.dirname(resourcePath);

  const INCLUDE_PATTERN =
    /\<include src=\"(\.\/)?(.+)\"\/?\>(?:\<\/include\>)?/gi;

  /**
   * replace the element with target file content
   * @param {string} match the match
   * @param {string} pathRule path rule
   * @param {string} src src value
   * @return {string} replaced result
   */
  function replaceHtml(match, pathRule, src) {
    if (pathRule === './') {
      fileDir = loaderContext.context;
    }
    const filePath = path.resolve(fileDir, src);
    loaderContext.dependency(filePath);
    const html = fs.readFileSync(filePath, 'utf8');
    return processNestedHtml(html, loaderContext, filePath);
  }

  if (!INCLUDE_PATTERN.test(content)) {
    return content;
  } else {
    return content.replace(INCLUDE_PATTERN, replaceHtml);
  }
}

/**
 * entrance for preprocessor
 * @param {string} content original content
 * @param {LoaderContext} loaderContext loader context
 * @return {string} replaced content
 */
function processHtmlLoader(content, loaderContext) {
  const newContent = processNestedHtml(content, loaderContext);
  return newContent;
}
