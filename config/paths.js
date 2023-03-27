const fs = require('fs');
const path = require('path');
const config = require('./getConfig');

const appDirectory = fs.realpathSync(process.cwd());

// path.resolve('/foo/bar', './baz');
// Returns: '/foo/bar/baz'

// path.resolve('/foo/bar', '/tmp/file/');
// Returns: '/tmp/file'

// path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// If the current working directory is /home/myself/node,
// this returns '/home/myself/node/wwwroot/static_files/gif/image.gif'
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find((extension) =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp(config.buildDir),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, config.entry),
  appPackageJson: resolveApp('package.json'),
  appPublic: resolveApp('public'),
  appSrc: resolveApp('src'),
  resolveApp,
};
