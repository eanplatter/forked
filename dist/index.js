#!/usr/bin/env node
'use strict';

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _github = require('github');

var _github2 = _interopRequireDefault(_github);

var _githubUrlParse = require('github-url-parse');

var _githubUrlParse2 = _interopRequireDefault(_githubUrlParse);

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

var packageJson = _shelljs2.default.cat('package.json');

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

var meta = (0, _githubUrlParse2.default)(repositoryUrl);

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
    console.log('Hey it worked!');
  }
});