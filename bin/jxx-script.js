#!/usr/bin/env node

process.on('unhandledRejection', (err) => {
    throw err;
});

const execa = require('execa');

// node jxx-script start => slice(2) => start
const args = process.argv.slice(2);

const scriptIndex = args.findIndex((arg) => arg === 'build' || arg === 'start');

const script = scriptIndex === -1 ? '' : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

if (['build', 'start'].includes(script)) {
    const result = execa.sync(
        'node',
        nodeArgs.concat(require.resolve('../scripts/' + script)).concat(args.slice(scriptIndex + 1)),
        { stdio: 'inherit' },
    );
    process.exit(result.exitCode);
} else {
    console.log('无效脚本 "' + script + '".');
}
