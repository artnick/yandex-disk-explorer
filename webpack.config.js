const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
}

const commonConfig = merge([
  {
    entry: {
      app: PATHS.src
    },
    output: {
      filename: '[name].js',
      path: PATHS.build,
      publicPath: '/'
    },
    context: PATHS.src,

    plugins: [
      new HtmlWebpackPlugin({
        title: 'YDisk Explorer',
        template: 'index.ejs'
      }),
    ],
  },
  parts.lintJavaScript({ include: PATHS.app }),
  parts.loadJavaScript({ include: PATHS.src }),
  parts.loadImages(),
  parts.loadFonts({
    options: {
      name: '[name].[ext]',
    },
  }),
]);

const productionConfig = merge([
  {
    output: {
      chunkFilename: '[name].[chunkhash:8].js',
      filename: '[name].[chunkhash:8].js',
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
    ],
  },
  parts.clean(PATHS.build),
  parts.minifyJavaScript(),
  parts.extractBundles([
    {
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      ),
    },
    {
      name: 'manifest',
      minChunks: Infinity,
    },
  ]),
  parts.extractCSS({
    use: ['css-loader', parts.autoprefix(), 'sass-loader'],
  }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
  }),
  parts.setFreeVariable(
    'process.env.NODE_ENV',
    'production'
  ),
]);

const developmentConfig = merge([
  {
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      PATHS.src
    ],
    devtool: 'inline-source-map',
    plugins: [
      new webpack.NamedModulesPlugin(),
    ],
  },
  parts.devServer(),
  parts.loadCSS(),
]);
 
module.exports = function(env) {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }
  return merge(commonConfig, developmentConfig);
};