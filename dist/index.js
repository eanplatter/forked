#!/usr/bin/env node
'use strict';

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _github = require('github');

var _github2 = _interopRequireDefault(_github);

var _fs = require('fs');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _copyPaste = require('copy-paste');

var _copyPaste2 = _interopRequireDefault(_copyPaste);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var github = new _github2.default({
  version: '3.0.0',
  protocol: 'https',
  host: 'api.github.com',
  timeout: 5000,
  headers: {
    'user-agent': 'forked'
  }
});

github.authenticate({
  type: 'oauth',
  token: process.env.FORKED_TOKEN
});

var args = process.argv.slice(2);
if (args.indexOf('-h') !== -1 || args.indexOf('--help') !== -1) {
  console.log('  Easy-peasy usage:\n    1. Navigate to directory of dependency you want to fork:\n      `cd project/node_modules/dependencyName`\n    2. Run: `fork`\n\n  Lemon-squeezy usage:\n    1. From anywhere, run: `fork path/to/dependency`.');
  process.exit();
}
var packageJson = _shelljs2.default.cat(packagePath(args[0]));

if (!packageJson) {
  throw new Error('I couldn’t find a package.json file in this directory.');
}

var parsedPackage = void 0,
    repositoryUrl = void 0;

try {
  parsedPackage = JSON.parse(packageJson);
  repositoryUrl = parsedPackage.repository ? parsedPackage.repository.url : null;
} catch (e) {
  throw new Error('Looks like package.json couldn’t be parsed.');
}

if (!repositoryUrl) {
  throw new Error('Looks like package.json doesn’t have a repository url.');
}

var tail = repositoryUrl.replace(/.*github.com./, '');
var tailParts = tail.split('/');
var meta = {
  user: tailParts[tailParts.length - 2],
  repo: tailParts[tailParts.length - 1]
};
var index = meta.repo.indexOf('.git');
if (index !== -1) {
  meta.repo = meta.repo.slice(0, index);
}

github.repos.fork({
  user: meta.user,
  repo: meta.repo
}, function (err, res) {
  if (err) {
    console.log('Hrmm, looks like something went wrong');
  } else {
    var url = res && res.html_url ? res.html_url : '¯\\_(ツ)_/¯';
    _copyPaste2.default.copy(url, function () {
      console.log('  ... and use cmd + v to paste your new URL :)');
    });
    console.log('  Done. Your fork is available at: ' + url);
  }
});

function packagePath(dep) {
  if (!dep) {
    return 'package.json';
  }
  return _path2.default.resolve(dep, 'package.json');
}