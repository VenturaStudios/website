#Skills

Skills UI prototype repository

##Installation

You will need `node` installed on your machine, as well some global packages from npm.

```
npm install -g bower
npm install -g grunt-cli
```

Install it locally

```
npm install
bower install
```

You can launch it with `grunt` doing `grunt serve`, it will listen at port `3000`.

The `grunt` task will compile your `react` modules with `browserify`, it will also compile all the `sass` files into `css`.

Once done, you can launch the standalone node server with `node app`. 

Also i recomend using `pm2` for launching your app safely.

```
npm install -g pm2
```


See [pm2 documentation](https://www.npmjs.com/package/pm2)

```
pm2 start app
pm2 stop app
```

## UI Framework

Bundled with [Browserify](http://browserify.org/), it uses [React](https://facebook.github.io/react/) and [FluxJS](http://facebook.github.io/react/blog/2014/05/06/flux.html).

See more modules used in the `package.json`.

## Common Errors.

`watch ENOSPC`
This is due to the limit of files watched on linux, change the max limit: 

```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```
