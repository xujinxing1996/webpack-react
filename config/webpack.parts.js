const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const clearConsole = require('react-dev-utils/clearConsole');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const chalk = require('chalk');

exports.devServer = () => ({
  port: 8080,
  https: false,
  historyApiFallback: true,
  client: {
    logging: 'none',
    overlay: false,
  },
});

exports.loadJavaScript = () => ({
  module: {
    rules: [
      {
        test: /\.mjs$/,
        exclude: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
});

exports.loadCSS = (loader = '') => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          loader,
          'css-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     sourceMap: true,
          //     config: {
          //       path: 'postcss.config.js',
          //     },
          //   },
          // },
          // {
          //   loader: 'less-loader',
          //   options: {
          //     javascriptEnabled: true,
          //     sourceMap: true,
          //   },
          // },
        ],
        sideEffects: true,
      },
    ],
  },
});

exports.extractCss = () => {
  return {
    loader: MiniCssExtractPlugin.loader,
    plugin: new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
    }),
  };
};

exports.loadFont = () => ({
  module: {
    rules: [
      {
        test: /\.(woff|eot|ttf)\??.*$/,
        use: 'file-loader?limit=5000&name=font/font.[name].[ext]',
      },
    ],
  },
});

exports.loadImg = () => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: 'url-loader?limit=5000&name=images/[name].[ext]',
      },
    ],
  },
});

exports.page = ({ title }) => ({
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html', title })],
});

exports.progressBar = () => ({
  plugins: [
    new ProgressBarPlugin({
      format:
        '  编译中 [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed 秒)',
      summary: false,
      customSummary(second) {
        console.log(
          chalk.white.bgGreen('编译完成') +
            ` 耗时 ${second.replace('s', '')} 秒`
        );
      },
      callback() {
        clearConsole();
        console.log(`开发服务器地址：\n`);
        console.log(
          `> 本地: ` + chalk.cyan.underline(`http://localhost:8080/`)
        );
      },
    }),
  ],
});

exports.errorOverlay = () => ({
  plugins: [new ErrorOverlayPlugin()],
});

exports.generateSourceMaps = ({ type }) => ({ devtool: type });
