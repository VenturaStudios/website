var request = require('supertest');
var sinon = require('sinon');
var expect = require('chai').expect;


//Add the tests that you want to run here.
var ClientSideLibrary = require('./integration/library');
var ApplicationTests = require('./integration/application');
var FeedbackTests = require('./integration/feedback');
var app = require('../app');

describe('Integration tests suite', function() {

  describe('Availability Tests', 
    function() {
      it('Should return the client library', function(done){
        ClientSideLibrary.getFile(done, app);
      });
    });

  describe('Demo params', 
    function() {
      it('Should return the embed', function(done){
        ApplicationTests.requestEmbed('freemium', done, app);
      });
    });

  describe('Create Feedback', 
    function() {
      it('Should create the Feedback', function(done){
        FeedbackTests.createFeedback(done, app);
      });
    });

});