const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

exports.devServer = function() {
	return {
		devServer: {
	    hot: true,
	    publicPath: '/',
	    stats: 'errors-only',
      historyApiFallback: true,
	  },
	  plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
	};
};

exports.lintJavaScript = function({ include, exclude, options }) {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          include,
          exclude,
          enforce: 'pre',

          loader: 'eslint-loader',
          options,
        },
      ],
    },
  };
};

exports.loadJavaScript = function({ include, exclude }) {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          include,
          exclude,
          loader: 'babel-loader?cacheDirectory',
        },
      ],
    },
  };
};

exports.loadImages = function({ include, exclude, options } = {}) {
  return {
    module: {
      rules: [
        {
          test: /\.(png|jpg|svg|gif)$/,
          include,
          exclude,

          use: {
            loader: 'url-loader',
            options,
          },
        },
      ],
    },
  };
};

exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        // Capture eot, ttf, woff, and woff2
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        include,
        exclude,

        use: {
          loader: 'file-loader',
          options,
        },
      },
    ],
  },
});


exports.loadCSS = function({ include, exclude } = {}) {
  return {
    module: {
      rules: [
        {
          test: /\.sass$/,
          include,
          exclude,

          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
  };
};

exports.extractCSS = function({ include, exclude, use }) {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    filename: '[name].[contenthash:8].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.sass$/,
          include,
          exclude,

          use: plugin.extract({
            use,
            fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [ plugin ],
  };
};

exports.autoprefix = function() {
  return {
    loader: 'postcss-loader',
    options: {
      plugins: () => ([
        require('autoprefixer'),
      ]),
    },
  };
};

exports.extractBundles = function(bundles) {
  return {
    plugins: bundles.map((bundle) => (
      new webpack.optimize.CommonsChunkPlugin(bundle)
    )),
  };
};

exports.clean = function(path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path]),
    ],
  };
};

exports.minifyJavaScript = function() {
  return {
    plugins: [
      new BabiliPlugin(),
    ],
  };
};

exports.setFreeVariable = function(key, value) {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env),
    ],
  };
};

exports.purifyCSS = ({ paths }) => ({
  plugins: [
    new PurifyCSSPlugin({ paths }),
  ],
});