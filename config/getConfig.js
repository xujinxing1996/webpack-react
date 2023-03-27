const path = require('path');
const fs = require('fs');

// 默认配置
const defaultConfig = {
    port: 3100,
    host: '0.0.0.0',
    https: false,
    buildDir: 'dist',
    publicPath: '/',
    sourcemap: false,
    entry: 'src/index',
    disabledBundleSize: false,
};

// 用户自定义配置路径
const configPath = path.resolve(process.cwd(), 'jxx-scripts.config.js');
// 用户自定义配置对象
let userConfig = {};

if (fs.existsSync(configPath)) {
    userConfig = require(configPath);
}

module.exports = Object.assign(defaultConfig, userConfig);
