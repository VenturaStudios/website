var request = require('supertest');
var expect = require('chai').expect;

function requestEmbed(clientId, done, app){
  
  request(app)
    .get('/embed/'+ clientId )
    .expect(200)
    .end(function(err, res){
      if (err) throw err;
      done();
    });
}

function requestFullApp(clientId, done, app){
  
  request(app)
    .get('/application/'+ clientId )
    .expect(200)
    .end(function(err, res){
      if (err) throw err;
      done();
    });
}

module.exports =  {
  requestEmbed : requestEmbed,
  requestFullApp : requestFullApp
}