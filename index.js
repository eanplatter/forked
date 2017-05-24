#!/usr/bin/env node
import shell from 'shelljs'
import GitHubApi from 'github'
import {statSync} from 'fs'
import path from 'path'
import ncp from 'copy-paste'

const github = new GitHubApi({
    version: '3.0.0',
    protocol: 'https',
    host: 'api.github.com',
    timeout: 5000,
    headers: {
        'user-agent': 'forked'
    }
})

github.authenticate({
    type: 'oauth',
    token: process.env.FORKED_TOKEN,
})

const args = process.argv.slice(2)
if (args.indexOf('-h') !== -1 || args.indexOf('--help') !== -1) {
  console.log(`  Easy-peasy usage:
    1. Navigate to directory of dependency you want to fork:
      \`cd project/node_modules/dependencyName\`
    2. Run: \`fork\`

  Lemon-squeezy usage:
    1. From anywhere, run: \`fork path/to/dependency\`.`)
  process.exit()
}
const packageJson = shell.cat(packagePath(args[0]))

if (!packageJson) {
  throw new Error('I couldn’t find a package.json file in this directory.')
}

let parsedPackage, repositoryUrl

try {
  parsedPackage = JSON.parse(packageJson)
  repositoryUrl = parsedPackage.repository ? parsedPackage.repository.url : null
} catch (e) {
  throw new Error('Looks like package.json couldn’t be parsed.')
}

if (!repositoryUrl) {
  throw new Error('Looks like package.json doesn’t have a repository url.')
}

const tail = repositoryUrl.replace(/.*github.com./, '');
const tailParts = tail.split('/');
const meta = {
  user: tailParts[tailParts.length - 2],
  repo: tailParts[tailParts.length - 1]
};
const index = meta.repo.indexOf('.git')
if (index !== -1) {
  meta.repo = meta.repo.slice(0, index)
}

github.repos.fork({
  user: meta.user,
  repo: meta.repo,
}, (err, res) => {
  if (err) {
    console.log('Hrmm, looks like something went wrong')
  } else {
    const url = res && res.html_url ? res.html_url : '¯\\_(ツ)_/¯';
    ncp.copy(url, function () {
      console.log('  ... and use cmd + v to paste your new URL :)');
    })
    console.log(`  Done. Your fork is available at: ${url}`)
  }
})

function packagePath (dep) {
  if (!dep) { return 'package.json' }
  return path.resolve(dep, 'package.json')
}
