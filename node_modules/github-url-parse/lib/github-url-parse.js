/*
 * github-url-parse
 * https://github.com/stefanbuck/github-url-parse
 *
 * Copyright (c) 2014 Stefan Buck
 * Licensed under the MIT license.
 */

'use strict';

var url = require('url');

var GITHUBCOM = 'github.com';

module.exports = function(githubURL) {

  var o = url.parse( githubURL );
  if (o.host !== GITHUBCOM) {
    return null;
  }

  var paths = url.parse(o).path.split('/').filter(Boolean);
  var result = {};

  var keys = ['user', 'repo', 'type', 'branch'];

  paths.forEach(function(item, index) {
    var k = keys[index];
    if (k) {
      result[k] = item;
    }
  });

  if (paths.length > keys.length) {
    result.path = paths.slice(keys.length).join('/');
  }

  return result;
};
