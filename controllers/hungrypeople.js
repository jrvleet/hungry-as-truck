// Require resource's model(s).
var hungryperson = require("../models/hungryperson");

var index = function(req, res, next){

  hungryperson.find({}, function(error, hungrypeople){
    res.send(hungrypeople);
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
  req.record.set(req.body);
  req.record.save(function (err,record) {
    res.send(record);
  });
};

var destroy = function(req, res) {
  req.record.remove(function(err, record) {
    res.send(record);
  });
};

var show = function(req, res, next){
  hungryperson.findById(req.params.id, function(error, hungryperson){
    if (error) res.json({message: 'Could not find hungryperson because ' + error});
    res.send(hungryperson);
  });
};

module.exports = {
  index: index,
  show:  show,
  delete: destroy
};
