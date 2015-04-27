"use strict";
var uid = require('uid');
var _ = require('lodash');

function wrap(response){
  if(_.isArray(response)){
    return new WrappedResponseList(response);
  }else if(_.isObject(response)){
    return new WrappedResponseObject(response);
  }
}

function WrappedResponseObject(response){
  this.id = uid(10);
  this.data = response;
  this.version = 'v1';
  this.date = new Date();
}

function WrappedResponseList(response){
  this.id = uid(10);
  this.length = response.length;
  this.data = response;
  this.version = 'v1';
  this.date = new Date();
}

module.exports = wrap