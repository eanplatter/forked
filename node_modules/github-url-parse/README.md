# github-url-parse 
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image] [![Coverage Status][coveralls-image]][coveralls-url]

Parse the github user, repo, branch and other things from a GitHub url.


## Install

```bash
$ npm install --save github-url-parse
```


## Usage

```javascript
var gitHubUrlParse = require('github-url-parse');

var github = gitHubUrlParse('https://github.com/stefanbuck/github-url-parse/blob/master/lib/index.js');

console.log('user:' + github.user); // stefanbuck
console.log('repo:' + github.repo); // github-url-parse
console.log('branch:' + github.branch); // master
console.log('path:' + github.path); // lib/index.js
console.log('type:' + github.type); // blob
```


## License

Copyright (c) 2014 Stefan Buck. Licensed under the MIT license.



[npm-url]: https://npmjs.org/package/github-url-parse
[npm-image]: https://badge.fury.io/js/github-url-parse.svg
[travis-url]: https://travis-ci.org/stefanbuck/github-url-parse
[travis-image]: https://travis-ci.org/stefanbuck/github-url-parse.svg?branch=master
[daviddm-url]: https://david-dm.org/stefanbuck/github-url-parse.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/stefanbuck/github-url-parse
[coveralls-url]: https://coveralls.io/r/stefanbuck/github-url-parse
[coveralls-image]: https://coveralls.io/repos/stefanbuck/github-url-parse/badge.png
