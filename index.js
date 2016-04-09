#!/usr/bin/env node
import shell from 'shelljs'
import GitHubApi from 'github'
import parser from 'github-url-parse'
import {statSync} from 'fs'
import path from 'path'

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
    1. Navigate to directory of dependency you want to fork.
    2. run \`fork\`

  Lemon-squeezy usage:
    1. From your project’s root directory, run \`fork dependencyName\`.`)
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

const meta = parser(repositoryUrl)

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
    console.log('Hey it worked!')
  }
})

function packagePath (dep) {
  if (!dep) { return 'package.json' }
  return path.resolve(dep, 'package.json')
}
