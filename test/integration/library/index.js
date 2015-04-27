var request = require('supertest');
var expect = require('chai').expect;

function getFile(done, app){
  
  request(app)
    .get('/instafeedback.min.js')
    .expect(200)
    .end(function(err, res){
      if (err) throw err;
      done();
    });
}

module.exports =  {
  getFile : getFile
}