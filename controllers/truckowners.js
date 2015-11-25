// Require resource's model(s).
var truckowner = require("../models/truckowner");

var index = function(req, res, next){

  truckowner.find({}, function(error, truckowners){
    res.render('truckowners/index', {truckowners: truckowners});
  });
};

var show = function(req, res, next){
  truckowner.findById(req.params.id, function(error, truckowner){
    if (error) res.json({message: 'Could not find truckowner because ' + error});
    res.render('truckowners/show', {truckowner: truckowner});
  });
};

module.exports = {
  index: index,
  show:  show
};
