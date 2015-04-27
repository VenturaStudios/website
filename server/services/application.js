/* Service for returning the correct mygosun application form */
var _ = require('lodash');
var fs = require('fs');
var q = require('q');
var config = require('../../config/config');
//var demoActivities = require('../mock/activities.data');
//var demoProvider = require('../mock/provider.data');

/***
 Check if the clientId is a correct one
 - If clientId is freemium, let it go
 - If clientId is paid account, log the access or do something more
 **/
function validParams(req, res, next){
  console.log(req.params)

  if(!req.params.clientId){
    return res.send(404);
  }else if(req.params.clientId !== 'freemium'){
    //TODO: log access on user account
    //TODO: check the service usage ?
  }else{
    console.log('Free user, lets go');
    return next();
  }
}

/**
  Return Embed compiled HTML
  - Compile the templates with the desired settings
**/
function getButton(req, res){
  var fileUrl = config.public + '/button.html';
  
  obtainData(req)
    .then(function(information){
      return compileFile(fileUrl, information);
    })
    .then(function(fileData){
      res.send(fileData);
    })
    .catch(function(err){
      console.log(err);
      res.send(500);
    });
}

/**
  Return Button compiled HTML
  - Compile the templates with the desired settings
**/
function getForm(req, res){
  var fileUrl = config.public + '/form.html';
  
  obtainData(req)
    .then(function(information){
      return compileFile(fileUrl, information);
    })
    .then(function(fileData){
      res.send(fileData);
    })
    .catch(function(err){
      console.log(err);
      res.send(500);
    });
}

function getFullApp(req, res){
  var fileUrl = config.public + '/fullapp.html';

  obtainData(req)
    .then(function(information){
      return compileFile(fileUrl, information);
    })
    .then(function(fileData){
      res.send(fileData);
    })
    .catch(function(err){
      console.log(err);
      res.send(500);
    });

}

//Gets the data for compilation
function obtainData(req){
  var dfd = q.defer();

  if(!req.params.providerSlug || req.params.providerSlug === 'demo'){
    
    //Send demo data if !providerSlug or providerSlug === demo
    var information = {
      activities : demoActivities,
      provider : demoProvider,
      __packSlug : req.params.packSlug,
      __providerSlug : req.params.providerSlug
    }
    
    dfd.resolve(information);
  }else{
    //Get from the api
    mygosunAPI.getPack(req.params.providerSlug, req.params.packSlug)
      .then(function(information){

        information.__providerSlug = req.params.providerSlug;
        information.__packSlug = req.params.packSlug;
        
        dfd.resolve(information);
      })
      .catch(dfd.reject)
  }

  return dfd.promise;
}

//Compiles the application files to include the pack data
function compileFile(fileUrl, packData){
  var dfd = q.defer();

  fs.readFile(fileUrl, function(err, file){
    if(err){
      dfd.reject(err);
    }else{
      file = _.template(file, {
        SCRIPT_SERVER : "window.PACK_INFO = " + JSON.stringify(packData) + ""
      });
      
      dfd.resolve(file);
    }
  });

  return dfd.promise;
}

module.exports = {
  getButton : getButton,
  getForm : getForm,
  validParams : validParams
}