var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    _ = require('lodash'),
    env = process.env.NODE_ENV || 'development';

var basePaths = {
  development: {
    api : 'http://api.mygosun.link:80/dev/v0'
  },

  localhost: {
    api : 'http://api.mygosun.link:80/dev/v0'
  },

  test: {
    api : 'http://api.mygosun.link:80/dev/v0'
  },  

  production: {
    api : 'http://api.mygosun.link:80/dev/v0'
  }
};

var paths = function(basePath){
  var tmpPaths = {
    plans : 'plans',
    activities : 'activities',
    providers: 'providers',
    packs : 'packs',
    authToken : 'auth/token',
    confirmPlan : 'plans/%CODE%/confirm?auth_token=%AUTH%'
  };

  var returnedPaths = {};

  _.keys(tmpPaths).map(function(key){
    returnedPaths[key] = basePath + '/' + tmpPaths[key] 
  })

  return returnedPaths;
}

module.exports = function() {
  var basePath = basePaths[env].api;
  return paths(basePath);
}
