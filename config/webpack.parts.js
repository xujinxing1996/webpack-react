const path = require('path');
const { WebpackPluginServe } = require('webpack-plugin-serve');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

exports.page = ({ title }) => ({
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html', title })],
});

exports.devServer = () => ({
  watch: true,
  plugins: [
    new WebpackPluginServe({
      host: 'localhost',
      port: parseInt(process.env.PORT, 10) || 8080,
      static: './dist',
      liveReload: true,
      waitForBuild: true,
      progress: false,
    }),
  ],
});

exports.extractCss = ({ options = {}, loaders = [] } = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader, options },
            'css-loader',
          ].concat(loaders),
          sideEffects: true,
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    ],
  };
};

const APP_SOURCE = path.join(process.cwd(), 'src');

exports.loadJavaScript = () => ({
  module: {
    rules: [{ test: /\.(js|jsx)$/, include: APP_SOURCE, use: 'babel-loader' }],
  },
});

exports.generateSourceMaps = ({ type }) => ({ devtool: type });

exports.clean = () => ({
  output: {
    clean: true,
  },
});

exports.minifyCSS = ({ options }) => ({
  optimization: {
    minimizer: [new CssMinimizerPlugin({ minimizerOptions: options })],
  },
});
