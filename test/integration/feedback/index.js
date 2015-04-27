var request = require('supertest');
var expect = require('chai').expect;
var feedbackData = require('../../fixtures/feedbackData');

var code; 

function createFeedback(done, app){
 
  request(app)
    .post('/feedback/freemium')
    .expect(200)
    .send(feedbackData)
    .expect(200)
    .end(function(err, res){
      if (err) throw err;
      expect(res.body.data.uuid).to.exist();
      done();
    });
}

module.exports =  {
  createFeedback : createFeedback
}
