'use strict';

var githubUrlParse = require('../lib/github-url-parse.js');
var assert = require('should');

describe('githubUrlParse', function () {

  it('with google.com', function () {
    assert.equal(githubUrlParse('http://google.com', null));
  });

  it('with github.com', function () {
    assert.notEqual(githubUrlParse('http://github.com', null));
  });

  it('with username', function () {
    githubUrlParse('http://github.com/stefanbuck').should.eql({
      user:'stefanbuck'
    });
  });

  it('with repo', function () {
    githubUrlParse('http://github.com/stefanbuck/github-url-parse').should.eql({
      user:'stefanbuck',
      repo: 'github-url-parse'
    });
  });

  it('with type', function () {
    githubUrlParse('http://github.com/stefanbuck/github-url-parse/tree').should.eql({
      user:'stefanbuck',
      repo: 'github-url-parse',
      type: 'tree'
    });
  });

  it('with branch', function () {
    githubUrlParse('http://github.com/stefanbuck/github-url-parse/tree/master').should.eql({
      user:'stefanbuck',
      repo: 'github-url-parse',
      branch: 'master',
      type: 'tree'
    });
  });

  it('with path', function () {
    githubUrlParse('http://github.com/stefanbuck/github-url-parse/tree/master/lib/utils').should.eql({
      user:'stefanbuck',
      repo: 'github-url-parse',
      branch: 'master',
      path: 'lib/utils',
      type: 'tree'
    });
  });

  it('with file file', function () {
    githubUrlParse('https://github.com/stefanbuck/github-url-parse/blob/master/lib/index.js').should.eql({
      user:'stefanbuck',
      repo: 'github-url-parse',
      branch: 'master',
      path: 'lib/index.js',
      type: 'blob'
    });
  });
});
