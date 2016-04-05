#!/usr/bin/env node
import shell from 'shelljs'
import GitHubApi from 'github'
import parser from 'github-url-parse'

const github = new GitHubApi({
    // required
    version: '3.0.0',
    // optional
    debug: true,
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
console.log(shell.pwd())
const gitPlus = shell.grep('git+', './package.json')
const regex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)
const url = gitPlus.match(regex)
const meta = parser(url[0])

const index = meta.repo.indexOf('.git')
if (index !== -1) {
  meta.repo = meta.repo.slice(0, index)
}

github.repos.fork({
  user: meta.user,
  repo: meta.repo,
}, (err, res) => {
  if (err) {
    console.log('Hrmm, looks like something didn\'t work', err)
  } else {
    console.log('Hey it worked!', res)
  }
})
