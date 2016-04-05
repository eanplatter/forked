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

var gitPlus = _shelljs2.default.grep('git+', './package.json');
var regex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
var url = gitPlus.match(regex);
var meta = (0, _githubUrlParse2.default)(url[0]);

var index = meta.repo.indexOf('.git');
if (index !== -1) {
    meta.repo = meta.repo.slice(0, index);
}

console.log(meta);

// github.repos.fork({
//   user: meta.user,
//   repo: meta.repo,
// }, (err, res) => {
//   if (err) {
//     console.log('Hrmm, looks like something went wrong')
//   } else {
//     console.log('Hey it worked!')
//   }
// })