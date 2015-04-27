var sinon = require('sinon'),
    assert = require('assert'),
    expect = require('chai').expect;
var feedbackService = require('../../../server/services/feedback');
var feedbackObject = require('../../fixtures/feedbackData');


describe('Feedback service', function () {

  var feedbackCreated;

  before(function(done){
    feedbackService.createFeedback('freemium', feedbackObject)
      .then(function(response){
        feedbackCreated = response;
        expect(feedbackCreated.code).to.exist();
        done();
      })
      .catch(function(err){
        console.log(err)
        done(err);
      })
    });
});