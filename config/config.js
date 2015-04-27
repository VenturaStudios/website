var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'skills'
    },
    port: 3000,
    public: 'app',
    demos: 'demos',
    accessLog: rootPath + '/logs/access.log',
    customLog: rootPath + '/logs/skills.log'
  },

  localhost: {
    root: rootPath,
    app: {
      name: 'skills'
    },
    port: 3000,
    public: 'app',
    demos: 'demos',
    accessLog: rootPath + '/logs/access.log',
    customLog: rootPath + '/logs/skills.log'
  },

  test: {
    root: rootPath,
    app: {
      name: 'skills'
    },
    port: 3000,
    public: 'app',
    demos: 'demos',
    accessLog: rootPath + '/logs/access.log',
    customLog: rootPath + '/logs/skills.log'
    
  },

  production: {
    root: rootPath,
    app: {
      name: 'skills'
    },
    port: 3000,
    public: 'dist',
    demos : 'demos',
    accessLog: rootPath + '/logs/access.log',
    customLog: rootPath + '/logs/skills.log'
  }
};

module.exports = config[env];
