var InstaFeedback,
    sinon = require('sinon'),
    assert = require('assert'),
    expect = require('chai').expect,
    jsdom = require('mocha-jsdom'),
    $,
    client;

//Set the test enviroment
process.env.NODE_ENV = 'test'

describe('The instafeedback library', function () {
  jsdom();

  describe('iframe', function () {
    before(function(){ 
      $ = require('jquery');
      document.body.innerHTML = "<div>hola</div>";

      InstaFeedback = require('../../../library/app/main');

      var client = new InstaFeedback({
          sendto : 'demo@email.com',
          language : 'EN',
          fields : ['email', 'comment'],
          hidden : false
      });
    });

    it ('should append an iframe', function () {
      expect($('iframe').attr('id')).equal("instafeedbackiframe");
    });
  });
});