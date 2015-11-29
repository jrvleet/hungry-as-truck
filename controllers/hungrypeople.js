// Require resource's model(s).
var hungryperson = require("../models/hungryperson");

var index = function(req, res, next){
  hungryperson.find({}, function(err, hungrypeople){
    if (err) {
      res.send(err);
    }
    res.send(hungrypeople);
  });
};

var show = function(req, res, next){
  hungryperson.findById(req.params.id, function(error, hungryperson){
    if (error) res.json({message: 'Could not find hungryperson because ' + error});
    res.send(hungryperson);
  });
};

var create = function(req, res) {
  hungryperson.create(req.body, function(err, record){
    if (err){
      res.send(err);
    }
    res.send(record);
  });
};

var update = function(req, res) {
  hungryperson.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, record){
    if(err) {
      res.send(err);
    };
    res.send(record);
  });
};

var destroy = function(req, res) {
  hungryperson.findByIdAndRemove(req.params.id, function(err, record){
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
