// Require resource's model(s).
var truckowner = require("../models/truckowner");

var index = function(req, res, next){

  truckowner.find({}, function(error, truckowners){
    res.send(truckowners);
  });
};

var show = function(req, res, next){
  truckowner.findById(req.params.id, function(error, truckowners){
    if (error) res.json({message: 'Could not find truckowner because ' + error});
    res.send(truckowners);
  });
};

module.exports = {
  index: index,
  show:  show
};
