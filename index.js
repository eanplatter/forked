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
        'user-agent': 'My-Cool-GitHub-App' // GitHub is happy with a unique user agent
    }
})

github.authenticate({
    type: 'oauth',
    token: process.env.FORKED_TOKEN,
})

const rawUrl = shell.grep('"url": "', './package.json')
const regex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)
const url = rawUrl.match(regex)
const meta = parser(url[0])

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
