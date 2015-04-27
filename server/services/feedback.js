/* Service for creating the Feedbacks */
var _ = require('lodash');
var q = require('q');
var moment = require('moment');

/***
 Create feedback
 - If clientId is freemium, just send a mail
 - If clientId is paid account, store the data and notify the user.
 **/
function createFeedback(clientId, planObject){
  
  console.log('Creating new feedback');

  var dfd = q.defer();

  if(clientId === 'freemium'){
    //TODO: send mail
    dfd.resolve(demoResponse);
  }else{
    //TODO: store
  }

  return dfd.promise;
}

module.exports = {
  createFeedback : createFeedback
}