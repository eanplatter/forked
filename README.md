<p align="center">
  <img alt="enclave" src="http://i1264.photobucket.com/albums/jj488/eanplatter1/Screen%20Shot%202016-04-05%20at%2012.06.30%20AM_zpssrlsfz3e.png" width="546">
</p>

<p align="center">
  Fork all of the things.
</p>

# What is this?
Couldn't sleep, saw a tweet: 
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/kentcdodds">@kentcdodds</a> Now wouldn&#39;t it be cool, if you could go into a repo in your node_modules and run `npm fork` and it would fork it on github.</p>&mdash; Merrick Christensen (@iammerrick) <a href="https://twitter.com/iammerrick/status/717194650629476353">April 5, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Made it so.

# Getting Started

First, you need an access token from github so forked can log in. You can find instructions for that [here](https://help.github.com/articles/creating-an-access-token-for-command-line-use/)

Then add it to your `.bashrc` file, or whatever you use to manage your env variables:
```
export FORKED_TOKEN='PUT_YOUR_ACCESS_TOKEN_HERE'
```

Then install the module:
```
$ npm i -g forked
```

Dive into some random node module:
```
$ cd node_modules/react
```

Run the command:
```
$ fork
```

If it worked, you should be able to see the fork on GitHub.

Currently doesn't work on some repositories. Had some weird redirect issues and such, but about 80% of the repos I tried worked, so that's nice. If you find a bug please document it in the issues. :)
