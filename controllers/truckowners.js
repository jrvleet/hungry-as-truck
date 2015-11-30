// Require resource's model(s).
var truckowner = require("../models/truckowner");

var index = function(req, res, next){
  truckowner.find({}, function(err, record){
    if (err) {
      res.send(err);
    }
    res.send(record);
  });
};

var show = function(req, res, next){
  truckowner.findById(req.params.id, function(err, truckowner){
    if (err) res.json({message: 'Could not find truckowner because ' + err});
    res.send(truckowner);
  });
};

var create = function(req, res) {
  truckowner.create(req.body, function(err, record){
    if (err){
      res.send(err);
    }
    res.send(record);
  });
};

var update = function(req, res) {
  truckowner.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, record){
    if(record.trucks.length > 0){
      record.trucks.forEach(function(truck) {
        if(truck.name === req.body.name) {
          truck.name = req.body.name;
          truck.location = req.body.location;
        }
      });
    }
    if(err){
      res.send(err);
    }
    else {
      record.trucks.push(req.body);
    }
    record.save();
    res.send(record);
  });
};

var destroy = function(req, res) {
  truckowner.findByIdAndRemove(req.params.id, function(err, record){
    if(err){
      res.send(err);
    };
    res.send(record.name + " has been deleted!");
  });
};


module.exports = {
  index: index,
  show:  show,
  create: create,
  update: update,
  destroy: destroy
};
